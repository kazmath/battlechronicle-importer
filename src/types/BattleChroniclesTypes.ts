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
