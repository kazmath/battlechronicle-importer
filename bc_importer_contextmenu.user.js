// ==UserScript==
// @name         Import from Battle Chronicle (Context Menu)
// @namespace    https://github.com/kazmath/
// @updateURL    https://github.com/kazmath/battlechronicle-importer/raw/main/bc_importer_contextmenu.user.js
// @downloadURL  https://github.com/kazmath/battlechronicle-importer/raw/main/bc_importer_contextmenu.user.js
// @version      1.4
// @description  A script to import the characters, weapons and artifacts visible from battle chronicle and copy to the clipboard. For joint usage with https://kazmath.github.io/battlechronicle-importer/.
// @author       KazMath
// @match        https://act.hoyolab.com/*
// @icon         https://www.google.com/s2/favicons?domain=https://act.hoyolab.com/app/community-game-records-sea/index.html
// @grant        none
// @run-at       context-menu
// ==/UserScript==

"use strict";

let json_cache;

if (document.querySelectorAll(".account-block").length <= 0) {
    alert("Page still loading, wait a few seconds and try again.");
    return;
}

document.querySelector("html").style.cursor = "wait";
main()
    .catch((e) => {
        alert(e);
    })
    .finally(() => {
        document.querySelector("html").style.cursor = "";
    });

async function main() {
    if (json_cache) {
        copyToClipboard(json_cache);
        return;
    }

    const apiURL =
        "https://sg-public-api.hoyolab.com/event/game_record/genshin/api/character/list";

    const uid = document
        .querySelectorAll("p.uid")[0]
        .innerText.replace(/UID/, "");

    let server;
    // normalize to 10-long and take region (first 2 chars)
    switch(uid.padStart(10, "0").substring(0, 2)){
        case "01":
        case "02":
        case "03":
        case "05":
            throw new Error("Chinese servers are not supported");
        case "06":
            server = "os_usa";
            break;
        case "07":
            server = "os_euro";
            break;
        case "08":
        case "18":
            server = "os_asia";
            break;
        case "09":
            server = "os_cht";
            break;
        default:
            // unreachable under normal conditions
            throw new Error("Invalid UID");
    }

    const lastRequestDate = localStorage.getItem(
        "__bc-to-good_userscript_ratelimit__"
    );
    if (
        lastRequestDate != null &&
        Number.isFinite(+lastRequestDate) &&
        Date.now() - +lastRequestDate <= 30 * 1000
    ) {
        // 30s rate limiter (do not remove unless you want to potentially be banned)
        throw new Error(
            "Rate limited, wait 30s before executing this action again."
        );
    }

    return fetch(apiURL, {
        method: "POST",
        body: JSON.stringify({
            server: server,
            role_id: uid,
        }),
        headers: {
            Accept: "application/json",
            "x-rpc-language": "en-us",
            "x-rpc-lang": "en-us",
        },
        credentials: "include",
        referrer: "https://act.hoyolab.com/",
    })
        .then((e) => e.json())
        .then((e) => {
            const id_list = e.data.list.map((value) => {
                return value.id;
            });

            return fetch(
                "https://sg-public-api.hoyolab.com/event/game_record/genshin/api/character/detail",
                {
                    method: "POST",
                    body: JSON.stringify({
                        server: server,
                        role_id: uid,
                        character_ids: id_list,
                    }),
                    headers: {
                        Accept: "application/json",
                        "x-rpc-language": "en-us",
                        "x-rpc-lang": "en-us",
                    },
                    credentials: "include",
                    referrer: "https://act.hoyolab.com/",
                }
            );
        })
        .then((e) => e.json())
        .then((e) => {
            localStorage.setItem(
                "__bc-to-good_userscript_ratelimit__",
                Date.now()
            );
            setTimeout(() => {
                localStorage.removeItem("__bc-to-good_userscript_ratelimit__");
                console.log("30s passed, no longer rate limited");
            }, 30 * 1000);

            const jsonString = JSON.stringify(e).trim();
            json_cache = jsonString;
            copyToClipboard(jsonString);
        })
        .catch((e) => {
            throw new Error(e);
        });
}

function copyToClipboard(jsonString) {
    return navigator.clipboard
        .writeText(jsonString)
        .then((_) => alert("Output copied to clipboard"))
        .catch((_) => {
            alert("Failed to copy to clipboard. Try again in a few seconds.");
        });
}

// function saveFile(filename, data) {
//     const blob = new Blob([data], {
//         type: "application/json",
//     });
//     const elem = window.document.createElement("a");
//     elem.href = window.URL.createObjectURL(blob);
//     elem.download = filename;
//     document.body.appendChild(elem);
//     elem.click();
//     document.body.removeChild(elem);
// }
