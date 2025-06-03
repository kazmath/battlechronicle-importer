// import { SlotKey, StatKey } from "./index";

type BCElement =
    | "Anemo"
    | "Geo"
    | "Electro"
    | "Dendro"
    | "Hydro"
    | "Pyro"
    | "Cryo";

export type BCWeaponKey = string;

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

type BCMainStatType =
    | 1 // Base HP (Unused)
    | 2 // HP
    | 3 // HP%
    | 4 // Base ATK (Unused)
    | 5 // ATK
    | 6 // ATK%
    | 7 // Base DEF (Unused)
    | 8 // DEF
    | 9 // DEF%
    | 20 // CRIT Rate
    | 22 // CRIT DMG
    | 23 // ER
    | 26 // Healing Bonus
    | 27 // Incoming Healing Bonus (Unused)
    | 28 // EM
    | 29 // Physical RES (Unused)
    | 30 // Physical DMG Bonus
    | 40 // Pyro DMG Bonus
    | 41 // Electro DMG Bonus
    | 42 // Hydro DMG Bonus
    | 43 // Dendro DMG Bonus
    | 44 // Anemo DMG Bonus
    | 45 // Geo DMG Bonus
    | 46 // Cryo DMG Bonus
    | 50 // Pyro RES (Unused)
    | 51 // Electro RES (Unused)
    | 52 // Hydro RES (Unused)
    | 53 // Dendro RES (Unused)
    | 54 // Anemo RES (Unused)
    | 55 // Geo RES (Unused)
    | 56 // Cryo RES (Unused)
    | 80 // CD Reduction (Unused)
    | 81 // Shield Strength (Unused)
    | 2000 // Max HP (Unused)
    | 2001 // ATK (Unused)
    | 2002 // DEF (Unused)
    | 999999; // Max Stamina (Unused)

type BCSlotType =
    | "Flower of Life"
    | "Plume of Death"
    | "Sands of Eon"
    | "Goblet of Eonothem"
    | "Circlet of Logos";

type BCSlotID = 1 | 2 | 3 | 4 | 5;

export type BCCharacterKey = string;

export interface BCChar {
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

export interface BCCharSkill {
    character_id: number;

    skill_id: number;
    skill_type: 1 | 2; // Active/Passive
    level: number; // 1-13 inclusive
    desc: string;
    skill_affix_list: any;
    icon: string;
    is_unlock: boolean;
    name: string;
}

export interface BCRelic {
    character_id: number;

    id: number;
    name: string;
    icon: string;
    pos: BCSlotID;
    rarity: 1 | 2 | 3 | 4 | 5;
    level: number; // 0-20 inclusive
    set: {
        id: number;
        name: string;
        affixes: any;
    };
    pos_name: BCSlotType;
    main_property: {
        property_type: BCMainStatType;
        value: string;
        times: number;
    };
    sub_property_list: [
        {
            property_type: BCMainStatType;
            value: string;
            times: number;
        }
    ];
}
