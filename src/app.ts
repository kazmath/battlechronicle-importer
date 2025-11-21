import {
    BCChar,
    BCCharacterKey,
    BCCharSkill,
    BCRelic,
    BCWeaponKey,
    IArtifact,
    ICharacter,
    IGOOD,
    ISubstat,
    IWeapon,
    SlotKey,
    StatKey,
} from "./types";
import { ArtifactSetKey } from "./types/ArtifactSetKey";
import { BCConstellation } from "./types/BattleChronicleTypes";
import { CharacterKey } from "./types/CharacterKey";
import { WeaponKey } from "./types/WeaponKey";

declare var bootstrap: any;
let dragTimer: number;

main();

function main() {
    getBackground();

    $("#inputarea").on("input", validateInput);
    $("#inputfile").on("change", handleFile);
    $("#inputarea-outer").on("dragover", handleDragOver);
    $("#inputarea-outer").on("dragleave", handleDragLeave);
    $("#inputarea-outer").on("drop", handleFile);

    $("#outputarea").on("click", function (this: HTMLTextAreaElement) {
        copyOutput();
    });

    validateInput();
    $("#convert-btn").on("click", startConversion);

    injectVersion();

    // $("#copy-btn").on("click", copyOutput);
}

function handleDragOver(e: JQuery.DragOverEvent) {
    e.preventDefault();
    let dt = e.originalEvent?.dataTransfer;
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

function handleFile(e: JQuery.DropEvent | JQuery.ChangeEvent) {
    e.preventDefault();
    $("#dropzone").hide();
    $("#input-loading").show();

    let target;
    if (e.originalEvent != undefined && "dataTransfer" in e.originalEvent) {
        target = e.originalEvent?.dataTransfer;
    } else {
        target = (e as JQuery.ChangeEvent).target;
    }
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
                event?.target?.result?.toString()
            );
            const inputAreaElem = $("#inputarea");
            inputAreaElem.val(formattedString);
            inputAreaElem.scrollTop(0);
            inputAreaElem.scrollLeft(0);

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

function handleDragLeave(e: JQuery.DragLeaveEvent) {
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
}

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

function startConversion() {
    const inputAreaElem = $("#inputarea");
    const input = inputAreaElem.val();
    const outputAreaElem = $("#outputarea");

    try {
        if (input == undefined) {
            throw new Error("Empty input.");
        }
        inputAreaElem.val(formatJson(input.toString()));
        inputAreaElem.scrollTop(0);
        inputAreaElem.scrollLeft(0);

        const output = convertInput(input);
        outputAreaElem.val(formatJson(output));
        outputAreaElem.scrollTop(0);
        outputAreaElem.scrollLeft(0);

        outputAreaElem.removeAttr("disabled");
        outputAreaElem.css("cursor", "auto");
        // $("#copy-btn").removeAttr("disabled");
        // $("#copy-btn-outer").css("cursor", "auto");
    } catch (error) {
        alert(error);
    }
}

function formatJson(input: string | object | undefined): string {
    if (input == undefined) {
        throw new Error("Empty input.");
    }

    let inputObj;
    if (typeof input === "string") {
        inputObj = JSON.parse(input);
    } else {
        inputObj = input;
    }
    return JSON.stringify(inputObj, null, 4);
}

function validateInput() {
    const content: string | undefined = (
        $("#inputarea") as JQuery<HTMLTextAreaElement>
    ).val();
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
    if (content == null) return;
    navigator.clipboard.writeText(content.toString());

    const toastLiveExample = document.getElementById("copiedToast");

    const toastBootstrap =
        bootstrap.Toast.getOrCreateInstance(toastLiveExample);

    toastBootstrap.show();
}

function convertInput(input: string | number | string[]): IGOOD {
    const parsedInput = JSON.parse(input.toString());

    if (
        typeof parsedInput != "object" ||
        parsedInput.message != "OK" ||
        typeof parsedInput.data != "object" ||
        !Array.isArray(parsedInput.data.list) ||
        parsedInput.data.list.length == 0
    ) {
        throw new Error("Invalid JSON input");
    }

    let charListTemp: any;
    let skillListsTemp: any;
    let relicListsTemp: any;
    let consListsTemp: any;

    if ("name" in parsedInput.data.list[0]) {
        charListTemp = parsedInput.data.list!;
        skillListsTemp = null;
    } else if ("base" in parsedInput.data.list[0]) {
        charListTemp = [] as BCChar[];
        skillListsTemp = {} as { [key: number]: BCCharSkill[] };
        relicListsTemp = {} as { [key: number]: BCRelic[] };
        consListsTemp = {} as { [key: number]: BCConstellation[] };

        for (const character of parsedInput.data.list!) {
            charListTemp.push(character.base as BCChar);

            skillListsTemp[character.base.id as number] =
                character.skills as BCCharSkill[];

            relicListsTemp[character.base.id as number] =
                character.relics as BCRelic[];

            consListsTemp[character.base.id as number] =
                character.constellations as BCConstellation[];
        }
    } else {
        throw new Error("Invalid Format");
    }

    const charList: BCChar[] = charListTemp;
    const skillListsIndexed: { [key: number]: BCCharSkill[] } | null =
        skillListsTemp;
    const relicListsIndexed: { [key: number]: BCRelic[] } | null =
        relicListsTemp;
    const consListsIndexed: {
        [key: number]: BCConstellation[];
    } | null = consListsTemp;

    let output: IGOOD = {
        format: "GOOD",
        version: 2,
        source: "BattleChronicleImporter",
        characters: [],
        weapons: [],
    };

    const BCStatDict: { [id: number]: StatKey } = {
        2: "hp", // HP
        3: "hp_", // HP%
        5: "atk", // ATK
        6: "atk_", // ATK%
        8: "def", // DEF
        9: "def_", // DEF%
        20: "critRate_", // CRIT Rate
        22: "critDMG_", // CRIT DMG
        23: "enerRech_", // ER
        26: "heal_", // Healing Bonus
        28: "eleMas", // EM
        30: "physical_dmg_", // Physical DMG Bonus
        40: "pyro_dmg_", // Pyro DMG Bonus
        41: "electro_dmg_", // Electro DMG Bonus
        42: "hydro_dmg_", // Hydro DMG Bonus
        43: "dendro_dmg_", // Dendro DMG Bonus
        44: "anemo_dmg_", // Anemo DMG Bonus
        45: "geo_dmg_", // Geo DMG Bonus
        46: "cryo_dmg_", // Cryo DMG Bonus
    };
    const BCSlotDict: { [id: number]: SlotKey } = {
        1: "flower",
        2: "plume",
        3: "sands",
        4: "goblet",
        5: "circlet",
    };

    for (const char of charList) {
        const character = char;
        const characterKey = normalizeBCKey(character.name) as CharacterKey;

        const constellationNum = character.actived_constellation_num;

        const weapon = character.weapon;
        const weaponKey = normalizeBCKey(weapon.name) as WeaponKey;

        let talents = {
            auto: 1,
            skill: 1,
            burst: 1,
        };

        if (skillListsIndexed != null && character.id in skillListsIndexed) {
            let characterSkills = skillListsIndexed[character.id];

            talents = {
                auto: characterSkills[0].level,
                skill: characterSkills[1].level,
                burst: characterSkills[2].level,
            };

            if (consListsIndexed != null && character.id in consListsIndexed) {
                let characterConstellations = consListsIndexed[character.id];

                if (constellationNum >= 3) {
                    const C3 = characterConstellations.find(
                        (constellation) => constellation.pos === 3
                    )!;
                    const C3targetedSkill = C3.effect.match(
                        /<color=#[0-9a-fA-F]+>([^<]+)<\/color>/
                    )![1];

                    const indexToChange = characterSkills.findIndex(
                        (skill) => skill.name === C3targetedSkill
                    );

                    switch (indexToChange) {
                        case 0:
                            talents.auto -= 3;
                            break;
                        case 1:
                            talents.skill -= 3;
                            break;
                        case 2:
                            talents.burst -= 3;
                            break;
                        default:
                            console.error(
                                "Error: Constellation 3 does not correspond to any talent"
                            );
                            break;
                    }
                }

                if (constellationNum >= 5) {
                    const C5 = characterConstellations.find(
                        (constellation) => constellation.pos === 5
                    )!;
                    const C5targetedSkill = C5.effect.match(
                        /<color=#[0-9a-fA-F]+>([^<]+)<\/color>/
                    )![1];

                    const indexToChange = characterSkills.findIndex(
                        (skill) => skill.name === C5targetedSkill
                    );

                    switch (indexToChange) {
                        case 0:
                            talents.auto -= 3;
                            break;
                        case 1:
                            talents.skill -= 3;
                            break;
                        case 2:
                            talents.burst -= 3;
                            break;
                        default:
                            console.error(
                                "Error: Constellation 5 does not correspond to any talent"
                            );
                            break;
                    }
                }
            }
        }

        const characterObj: ICharacter = {
            key: characterKey,
            level: character.level,
            ascension: deduceAscension(character.level),
            constellation: constellationNum,
            talent: talents,
        };
        output.characters!.push(characterObj);

        const weaponObj: IWeapon = {
            key: weaponKey,
            level: weapon.level,
            ascension: deduceAscension(weapon.level),
            location: characterKey,
            lock: true,
            refinement: weapon.affix_level,
        };
        output.weapons!.push(weaponObj);

        if (relicListsIndexed != null && character.id in relicListsIndexed) {
            let characterRelics = relicListsIndexed[character.id];

            let artifactList: IArtifact[] = [];

            for (const relic of characterRelics) {
                artifactList.push({
                    level: relic.level,
                    location: characterKey,
                    lock: true,
                    rarity: relic.rarity,
                    setKey: normalizeBCKey(relic.set.name) as ArtifactSetKey,
                    mainStatKey: BCStatDict[relic.main_property.property_type],
                    slotKey: BCSlotDict[relic.pos],
                    substats: relic.sub_property_list.map(
                        (value, index, array) => {
                            const substat: ISubstat = {
                                key: BCStatDict[value.property_type],
                                value: +value.value.replace(/[^0-9\.]/g, ""),
                            };
                            return substat;
                        }
                    ),
                });
            }

            if ("artifacts" in output === false) {
                output.artifacts = [];
            }

            output.artifacts!.push(...artifactList);
        }
    }

    return output;
}

function normalizeBCKey(name: string): string {
    return name
        .split(/[^a-zA-Z0-9']/)
        .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join("")
        .replace(/[^A-Za-z]/g, "");
}

function deduceAscension(level: number): number {
    // Assumes immediate at least +1 level up after ascension
    // e.g.: 80/80 is asc5, but 80/90 is still asc5 until at least 81/90

    if (level <= 20) {
        return 0;
    }
    if (level <= 40) {
        return 1;
    }
    if (level <= 50) {
        return 2;
    }
    if (level <= 60) {
        return 3;
    }
    if (level <= 70) {
        return 4;
    }
    if (level <= 80) {
        return 5;
    }
    if (level <= 90) {
        return 6;
    }
    throw new Error(`Invalid level (${level}).`);
}

function injectVersion() {
    const href = location.href;
    $.getJSON(
        `${href.substring(0, href.lastIndexOf("/"))}/package.json`,
        function (data) {
            // Inject the version from package.json into the page
            $("#package-version").html(`v${data.version}`);
        }
    ).fail(function () {
        console.error("Error loading package.json");
    });
}
