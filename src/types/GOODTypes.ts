// TODO
// Convert GOOD format v2 to v3
// What changed in version 3:
// - Adds new fields to IArtifact to represent new in-game properties, store initial rolls for reroll information, and help differentiate between 3 and 4-line starts for 5* artifacts. All other fields remain the same. V3 is backwards compatible with V2.
// - New fields for IArtifact: totalRolls, astralMark, elixirCrafted, unactivatedSubstats
// - New field for ISubstat: initialValue

import {
    ArtifactSetKey,
    CharacterKey,
    MaterialKey,
    SlotKey,
    StatKey,
    WeaponKey,
} from "./GOODKeyTypes.js";

export interface IGOOD {
    format: "GOOD"; // A way for people to recognize this format.
    version: 2; // GOOD API version.
    source: "BattleChronicleImporter"; // The app that generates this data.
    characters?: ICharacter[];
    artifacts?: IArtifact[];
    weapons?: IWeapon[];
    materials?: {
        [key in MaterialKey]: number;
    };
}

export interface IArtifact {
    setKey: ArtifactSetKey; //e.g. "GladiatorsFinale"
    slotKey: SlotKey; //e.g. "plume"
    level: number; //0-20 inclusive
    rarity: number; //1-5 inclusive
    mainStatKey: StatKey;
    location: CharacterKey | ""; //where "" means not equipped.
    lock: boolean; //Whether the artifact is locked in game.
    substats: ISubstat[];
}

export interface ISubstat {
    key: StatKey; //e.g. "critDMG_"
    value: number; //e.g. 19.4
}

export interface IWeapon {
    key: WeaponKey; //"CrescentPike"
    level: number; //1-90 inclusive
    ascension: number; //0-6 inclusive. need to disambiguate 80/90 or 80/80
    refinement: number; //1-5 inclusive
    location: CharacterKey | ""; //where "" means not equipped.
    lock: boolean; //Whether the weapon is locked in game.
}

export interface ICharacter {
    key: CharacterKey; //e.g. "Rosaria"
    level: number; //1-90 inclusive
    constellation: number; //0-6 inclusive
    ascension: number; //0-6 inclusive. need to disambiguate 80/90 or 80/80
    talent: {
        //does not include boost from constellations. 1-15 inclusive
        auto: number;
        skill: number;
        burst: number;
    };
}
