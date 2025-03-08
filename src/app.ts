import {
    IArtifact,
    ICharacter,
    IGOOD,
    ISubstat,
    IWeapon,
    SlotKey,
    StatKey,
} from "./types";
import { CharacterKey } from "./types/CharacterKey";
import { WeaponKey } from "./types/WeaponKey";
declare var bootstrap: any;

$("#inputarea").on("input", validateInput);
$("#outputarea").on("click", function (this: HTMLTextAreaElement) {
    this.select();
    copyOutput();
});

validateInput();
$("#convert-btn").on("click", main);

// $("#copy-btn").on("click", copyOutput);

function main() {
    const input = $("#inputarea").val();
    // todo: implement
    try {
        if (input == undefined) {
            throw new Error("Empty input.");
        }
        const output = convertInput(input);
        $("#outputarea").val(JSON.stringify(output, null, 4));

        $("#outputarea").removeAttr("disabled");
        $("#outputarea").css("cursor", "auto");
        // $("#copy-btn").removeAttr("disabled");
        // $("#copy-btn-outer").css("cursor", "auto");
    } catch (error) {
        alert(error);
    }
}

function validateInput() {
    const content: string | undefined =
        $<HTMLTextAreaElement>("#inputarea").val();
    $("#outputarea").val("");

    $("#outputarea").attr("disabled", "");
    $("#outputarea").css("cursor", "not-allowed");
    // $("#copy-btn").attr("disabled", "");
    // $("#copy-btn-outer").css("cursor", "not-allowed");
    try {
        if (content == undefined) {
            throw new Error("Empty input.");
        }
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

type BCElement =
    | "Anemo"
    | "Geo"
    | "Electro"
    | "Dendro"
    | "Hydro"
    | "Pyro"
    | "Cryo";

type BCWeaponKey = string;

interface BCWeapon {
    id: number;
    icon: string;
    type: BCWeaponType;
    rarity: number; // 1-5 inclusive. stars
    level: number; // 1-90 inclusive
    affix_level: 1; // 1-5 inclusive. refinement
    name: BCWeaponKey;
}

type BCWeaponType =
    | 1 // Sword
    | 10 // Catalyst
    | 11 // Claymore
    | 12 // Bow
    | 13; // Polearm

type BCCharacterKey = string;

interface BCChar {
    id: number;
    icon: string;
    name: BCCharacterKey;
    element: BCElement;
    fetter: number;
    level: number; // 1-90 inclusive
    rarity: 4 | 5;
    actived_constellation_num: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    image: string;
    is_chosen: boolean;
    side_icon: string;
    weapon_type: BCWeaponType;
    weapon: BCWeapon;
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

    const charList: BCChar[] = parsedInput.data.list!;

    let output: IGOOD = {
        format: "GOOD",
        version: 2,
        source: "BattleChroniclesConverter",
        characters: [],
        weapons: [],
    };

    for (const char of charList) {
        const character = char;
        const characterKey = normalizeBCKey(character.name) as CharacterKey;

        const weapon = character.weapon;
        const weaponKey = normalizeBCKey(weapon.name) as WeaponKey;

        const characterObj: ICharacter = {
            key: characterKey,
            level: character.level,
            ascension: deduceAscension(character.level),
            constellation: character.actived_constellation_num,
            talent: {
                // Cannot get this info from battle chronicles
                auto: 1,
                skill: 1,
                burst: 1,
            },
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
    }

    return output;
}

function normalizeBCKey(name: BCCharacterKey | BCWeaponKey) {
    return name
        .split(" ")
        .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join("")
        .replace(/[^A-Za-z]/, "");
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
