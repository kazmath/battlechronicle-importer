// import { SlotKey, StatKey } from "./index";

import {
    BCElement,
    BCMainStatType,
    BCSlotType,
    BCWeaponType,
} from "./BattleChronicleKeyTypes.js";

export type BCWeaponKey = string;
export type BCCharacterKey = string;

export interface BCWeapon {
    id: number;

    icon: string;
    type: BCWeaponType;
    rarity: number; // 1-5 inclusive. stars
    level: number; // 1-90 inclusive
    affix_level: 1; // 1-5 inclusive. refinement
    name: BCWeaponKey;
}

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
    pos: 1 | 2 | 3 | 4 | 5;
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
        },
    ];
}

export interface BCConstellation {
    id: number;

    name: string;
    icon: string;
    effect: string;
    is_actived: boolean;
    pos: 1 | 2 | 3 | 4 | 5 | 6;
}
