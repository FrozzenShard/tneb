(function () {
    var root = this;
    var constants = {};
    constants.damageTypes = {
        physical: 'physical',
        magical: 'magical',
        pure: 'pure',
        hpRemoval: 'hpRemoval',
        manaRemoval: 'manaRemoval'
    };
    constants.elements = {
        neutral: 'neutral',
        fire: 'fire',
        ice: 'ice',
        water: 'water',
        elec: 'electric',
        light: 'light',
        dark: 'dark',
        earth: 'earth',
        wind: 'wind'
    };

    constants.stats = {
        fireRes: "Fire Res",
        iceRes: "Ice Res",
        elecRes: "Elec Res",
        waterRes: "Water Res",
        earthRes: "Earth Res",
        windRes: "Wind Res",
        lightRes: "Light Res",
        darkRes: "Dark Res",
        exp : "Exp",
        str: "Str",
        dex: "Dex",
        int: "Int",
        luk: "Luk",
        magicalPower : "Magical Power",
        physicalPower : "Physical Power",
        health: "Health",
        mana: "Mana",
        healthRegen: "Health Regen",
        manaRegen: "Mana Regen",
        speed: "Speed",
        speedGain: "Speed Gain",
        penetration: {
            percent: {
                armor: "Percent Armor Penetration",
                magic: "Percent Magic Penetration",
                fire: "Percent Fire Penetration",
                ice: "Percent Ice Penetration",
                water:"Percent Water Penetration",
                elec: "Percent Electrical Penetration",
                earth: "Percent Earth Penetration",
                wind: "Percent Wind Penetration",
                light: "Percent Light Penetration",
                dark: "Percent Dark Penetration"
            },
            flat: {
                armor: "Flat Armor Penetration",
                magic: "Flat Magic Penetration",
                fire: "Flat Fire Penetration",
                ice: "Flat Ice Penetration",
                water:"Flat Water Penetration",
                elec: "Flat Electrical Penetration",
                earth: "Flat Earth Penetration",
                wind: "Flat Wind Penetration",
                light: "Flat Light Penetration",
                dark: "Flat Dark Penetration"
            }
        }
    };

    if(typeof module !== 'undefined' && module.exports){
        module.exports = constants;
        root.constants = constants;
    }else{
        root.constants = constants;
    }
}());