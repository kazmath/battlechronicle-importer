// TODO: Add enka import functionality
// TODO: Add character visualizer (involves adding imported characters to localStorage)

import { startConversion } from "./convert.js";
import { $, formatJson } from "./utils.js";

declare var bootstrap: any;
let dragTimer: number;

main();

function main() {
    getBackground();

    $("#inputarea").on("input", validateInput);
    // $("#inputfile").on("change", handleFile);
    $("#inputarea-outer").on("dragover", handleDragOver);
    $("#inputarea-outer").on("dragleave", handleDragLeave);
    $("#inputarea-outer").on("drop", handleFile);

    $("#outputarea").on("click", copyOutput);

    validateInput();
    $("#convert-btn").on("click", startConversion);

    injectVersion();

    // $("#copy-btn").on("click", copyOutput);
}

function handleDragOver(e: DragEvent) {
    e.preventDefault();
    let dt = e.dataTransfer;
    if (
        dt?.types &&
        (dt.types.indexOf
            ? dt.types.indexOf("Files") != -1
            : (dt.types as any).contains("Files"))
    ) {
        $("#dropzone").show();
        window.clearTimeout(dragTimer);
    }
}

function handleFile(e: DragEvent) {
    e.preventDefault();
    $("#dropzone").hide();
    $("#input-loading").show();

    let target;
    if (e != undefined && "dataTransfer" in e) {
        // DragEvent
        target = e?.dataTransfer;
    }
    //  else {
    //     // Event
    //     target = e.target;
    // }
    const file = target?.files[0];

    if (file?.type !== "application/json" || file?.type === undefined) {
        alert(`Wrong file type: ${file?.type}`);
        $("#input-loading").hide();
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        try {
            const formattedString = formatJson(
                event?.target?.result?.toString(),
            );
            const inputAreaElem = $("#inputarea");
            inputAreaElem.val(formattedString);
            inputAreaElem.first.scroll({ left: 0, top: 0 });

            validateInput();
        } catch (error) {
            alert(error);
        }
        $("#input-loading").hide();
        //holder.style.background = 'url(' + event.target.result + ') no-repeat center';
    };
    console.log(file);
    reader.readAsText(file!);
}

function handleDragLeave(e: DragEvent) {
    dragTimer = window.setTimeout(() => {
        $("#dropzone").hide();
    }, 45);
}

function getBackground() {
    const url = new URL("https://hyvgnshimg-proxy.deno.dev/");
    url.searchParams.set("language", getBackgroundLocale());
    Object.assign(document.body.style, {
        backgroundColor: "black",
        backgroundImage: `url("${url}")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backdropFilter: "blur(0.8vh)",
    });

    function getBackgroundLocale(): string {
        const supportedLocales = [
            "de-de", // German
            "en-us", // English
            "es-es", // Spanish
            "fr-fr", // French
            "id-id", // Indonesian
            "it-it", // Italian
            "ja-jp", // Japanese
            "ko-kr", // Korean
            "pt-pt", // Portuguese
            "ru-ru", // Russian
            "th-th", // Thai
            "tr-tr", // Turkish
            "vi-vn", // Vietnamese
            "zh-cn", // Chinese (Simplified)
            "zh-tw", // Chinese (Traditional)
        ];

        const languageOnly = (locale: string) => locale.split("-")[0];
        const supportedLanguages = supportedLocales.map(languageOnly);

        return (
            navigator.languages
                .map((it) => it.toLowerCase())
                .find((it) => supportedLanguages.includes(languageOnly(it))) ??
            "en-us"
        );
    }
}

function validateInput() {
    const content: string | undefined = $("#inputarea").val();
    $("#inputfile").val("");
    $("#outputarea").val("");

    $("#outputarea").attr("disabled", "");
    $("#outputarea").css("cursor", "not-allowed");
    // $("#copy-btn").attr("disabled", "");
    // $("#copy-btn-outer").css("cursor", "not-allowed");

    $("#inputfile").removeAttr("hidden");
    try {
        if (content == undefined || content.length <= 0) {
            throw new Error("Empty input.");
        }
        $("#inputfile").attr("hidden", "");
        JSON.parse(content);
        $("#convert-btn").removeAttr("disabled");
    } catch (e) {
        $("#convert-btn").attr("disabled", "");
    }
}

function copyOutput() {
    const content = $<HTMLTextAreaElement>("#outputarea").val();
    if (content == null || content == "") return;
    navigator.clipboard.writeText(content.toString());

    const toastLiveExample = document.getElementById("copiedToast");

    const toastBootstrap =
        bootstrap.Toast.getOrCreateInstance(toastLiveExample);

    toastBootstrap.show();
}

function injectVersion() {
    const href = location.href;
    fetch(`${href.substring(0, href.lastIndexOf("/"))}/package.json`)
        .then((it) => it.json())
        .then((it) => {
            $("#package-version").html(`v${it.version}`);
        })
        .catch((e) => {
            console.error("Error: Couldn't load package.json: ", e);
        });
}
