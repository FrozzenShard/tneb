(function () {
    var root = this;
    var _ = require('underscore');
    var utils = require('tneb/utils.js');
    var constants = require('tneb/etc/constants.js');
    var config = require('tneb/etc/config.js');
    var Calculator = require('./calculator.js');
    var Stat = require('./stat.js');

    function Character(data,name,controller) {
        var stats = Character.prototype.getDefaultStats();
        this.calculator = new Calculator(this);
        this.canAction = true;
        if (_.isObject(data)) {
            utils.objOverride(stats, data);
        }
        this.name = name;
        this.controller = controller;
        this.convertToStatObj(stats);
        this.stats = stats;
        this.equipped = {
            head: null,
            top: null,
            leftHand: null,
            rightHand: null,
            feet: null,
            bottom: null,
            accessory: null
        };
        this.inventory = [];
        this.skills = [];
        this.battleRating = 0;
    }
    
    Character.prototype.convertToStatObj = function(stats){
        stats.health = new Stat(constants.stats.health, stats.health, stats.health,0);
        stats.level = new Stat(constants.stats.level, stats.level, config.maxLevel);
        stats.armor = new Stat(constants.stats.armor,stats.armor);
        stats.magicRes = new Stat(constants.stats.magicRes,stats.magicRes);
        stats.mana = new Stat(constants.stats.mana, stats.mana, stats.mana, 0);
        stats.healthRegen = new Stat(constants.stats.healthRegen, stats.healthRegen);
        stats.manaRegen = new Stat(constants.stats.manaRegen, stats.manaRegen);
        stats.physicalPower = new Stat(constants.stats.physicalPower, stats.physicalPower);
        stats.magicalPower = new Stat(constants.stats.magicalPower, stats.magicalPower);
        stats.exp = new Stat(constants.stats.exp, 25,100,0);
        
        stats.str = new Stat(constants.stats.str, stats.str);
        stats.int = new Stat(constants.stats.int, stats.int);
        stats.dex = new Stat(constants.stats.dex, stats.dex);
        stats.luk = new Stat(constants.stats.luk, stats.luk);
        
        stats.resistances.fire = new Stat(constants.stats.fireRes, stats.resistances.fire);
        stats.resistances.ice = new Stat(constants.stats.iceRes, stats.resistances.ice);
        stats.resistances.elec = new Stat(constants.stats.elecRes, stats.resistances.elec);
        stats.resistances.water = new Stat(constants.stats.waterRes, stats.resistances.water);
        stats.resistances.earth = new Stat(constants.stats.earthRes, stats.resistances.earth);
        stats.resistances.wind = new Stat(constants.stats.windRes, stats.resistances.wind);
        stats.resistances.light = new Stat(constants.stats.lightRes, stats.resistances.light);
        stats.resistances.dark = new Stat(constants.stats.darkRes, stats.resistances.dark);
        
        stats.speedGain = new Stat(constants.stats.speedGain, stats.speedGain);
        stats.speed = new Stat(constants.stats.speed, stats.speed, config.battle.maxSpeed);
        
        stats.penetration.flat.fire = new Stat(constants.stats.penetration.flat.fire, stats.penetration.flat.fire);
        stats.penetration.flat.ice = new Stat(constants.stats.penetration.flat.ice, stats.penetration.flat.ice);
        stats.penetration.flat.elec = new Stat(constants.stats.penetration.flat.elec, stats.penetration.flat.elec);
        stats.penetration.flat.water = new Stat(constants.stats.penetration.flat.water, stats.penetration.flat.water);
        stats.penetration.flat.earth = new Stat(constants.stats.penetration.flat.earth, stats.penetration.flat.earth);
        stats.penetration.flat.wind = new Stat(constants.stats.penetration.flat.wind, stats.penetration.flat.wind);
        stats.penetration.flat.light = new Stat(constants.stats.penetration.flat.light, stats.penetration.flat.light);
        stats.penetration.flat.dark = new Stat(constants.stats.penetration.flat.dark, stats.penetration.flat.dark);
        stats.penetration.flat.armor = new Stat(constants.stats.penetration.flat.armor, stats.penetration.flat.armor);
        stats.penetration.flat.magic = new Stat(constants.stats.penetration.flat.magic, stats.penetration.flat.magic);
        
        stats.penetration.percent.fire = new Stat(constants.stats.penetration.percent.fire, stats.penetration.percent.fire);
        stats.penetration.percent.ice = new Stat(constants.stats.penetration.percent.ice, stats.penetration.percent.ice);
        stats.penetration.percent.elec = new Stat(constants.stats.penetration.percent.elec, stats.penetration.percent.elec);
        stats.penetration.percent.water = new Stat(constants.stats.penetration.percent.water, stats.penetration.percent.water);
        stats.penetration.percent.earth = new Stat(constants.stats.penetration.percent.earth, stats.penetration.percent.earth);
        stats.penetration.percent.wind = new Stat(constants.stats.penetration.percent.wind, stats.penetration.percent.wind);
        stats.penetration.percent.light = new Stat(constants.stats.penetration.percent.light, stats.penetration.percent.light);
        stats.penetration.percent.dark = new Stat(constants.stats.penetration.percent.dark, stats.penetration.percent.dark);
        stats.penetration.percent.armor = new Stat(constants.stats.penetration.percent.armor, stats.penetration.percent.armor);
        stats.penetration.percent.magic = new Stat(constants.stats.penetration.percent.magic, stats.penetration.percent.magic);
        

    };

    Character.prototype.doAction = function (target) {
        if(this.canAction){
            this.controller.doAction(target);
        }
    };

    Character.prototype.useSkill = function (skill, target) {
        if (!skill.cost(this, target)) return false;
        this.controller.Game.global.events.trigger('system:battle:cast:skill', skill, this, target);
        skill.use(this, target);
    };

    Character.prototype.basicAttack = function () {
        if (this.basicAttackSkill) return this.basicAttackSkill;
        var damage;
        var skill = {
            name: 'Basic Attack'
        };
        damage = {
            type: constants.damageTypes.physical,
            beforeRes: 0
        };
        skill.use = function (user, target) {
            damage.beforeRes = user.stats.physicalPower.getTotal() + (user.stats.str.getTotal() * 0.65);
            return target.applyDamage({
                skill: this,
                user: user,
                target: target
            }, damage);
        };
        skill.cost = function () {
            return true;
        };
        this.basicAttackSkill = skill;
        return skill;
    };

    // damage = {type : physical, el : fire, beforeRes : 10, afterRes : 10, callback : f(dealt,battleIngo,damge)}
    //source = {skill : skill, user : user, target : target}

    /**
     * Applys damage to the character(itself not the supplied source)
     * @param {Object} source Contains refrences to the damage source.
     * @param {Object} source.skill The skill being used
     * @param {Character} source.user The user or owner
     * @param {Character} source.target The target
     * @param {Object} damage The damage object
     * @param {String} damage.type The type of damage
     * @param [String] damage.element The element of the damage
     * @param {function|number} damage.beforeRes The damage before resistences are applied
     * @param {function|number} damage.afterRes The damage after resistances are applied
     * @param [function] damage.callback A callback that is invoked after damage is calculated but before its applied.
     * @return {Number} The damage dealth
     */
    Character.prototype.applyDamage = function (source, damage) {
        var i,
            d,
            el,
            total = 0;
        el = damage.element || constants.elements.neutral;
        if (!damage.pure && damage.type === constants.damageTypes.physical) {
            if (el === constants.elements.neutral) {
                total = this.calculator.reduceByArmor(damage.beforeRes, source.user, damage.penObj);
            } else {
                total = this.calculator.reduceByElementalResistance(
                    el,
                    this.calculator.calculateArmorReduction(damage.beforeRes, damage.penObj),
                    source.user,
                    damage.penObj
                );
            }
        } else if (!damage.pure && damage.type === constants.damageTypes.magical) {
            if (el === constants.elements.neutral) {
                total = this.calculator.reduceByMagicResistance(damage.beforeRes, source.user, damage);
            } else {
                total = this.calculator.reduceByElementalResistance(
                    el,
                    this.calculator.reduceByMagicResistance(damage.beforeRes, source.user, damage.penObj),
                    source.user,
                    damage.penObj
                );
            }
        } else {
            total += damage.beforeRes;
        }
        total += damage.afterRes ? damage.afterRes(source) : 0;
        this.takeDamage(total, damage.type, el, damage.isPure);
        if (damage.callback) damage.callback(total, damage, source);
        return total;
    };

    Character.prototype.takeDamage = function (val, type, el, pure) {
        this.changeHealth(-val);
        this.controller.Game.global.events.trigger('system:battle:takenDamage:', val, type, el, pure);
    };

    Character.prototype.changeHealth = function (val) {
        this.stats.health.change(val);
        if (this.stats.health.baseValue() < 1) {
            this.controller.Game.global.events.trigger('system:character:death', this);
        }
    };

    Character.prototype.getDefaultStats = function () {
        var max = 5;
        var sRand = _.random(0, max);
        var iRand = _.random(0, max);
        var lRand = _.random(0, max);
        var dRand = _.random(0, max);
        return {
            level: 1,
            health: 20,
            mana: 6,
            str: 5,
            int: 5,
            dex: 5,
            luk: 5,
            armor: 1,
            physicalPower: 0,
            magicalPower: 0,
            magicRes: 0.2,
            speed: 500,
            speedGain: 10,
            healthRegen: 0.2, // Internally represented as per second but displayed as per 5 to the player
            manaRegen: 0.125,

            resistances : {
                fire: 0,
                ice: 0,
                water: 0,
                elec: 0,
                earth: 0,
                wind: 0,
                light: 0,
                dark: 0,
            },

            penetration: {
                percent: {
                    armor: 0,
                    magic: 0,
                    fire: 0,
                    ice: 0,
                    water: 0,
                    elec: 0,
                    earth: 0,
                    wind: 0,
                    light: 0,
                    dark: 0
                },
                flat: {
                    armor: 0,
                    magic: 0,
                    fire: 0,
                    ice: 0,
                    water: 0,
                    elec: 0,
                    earth: 0,
                    wind: 0,
                    light: 0,
                    dark: 0
                }
            }
        };
    };

    if(typeof module !== 'undefined' && module.exports){
        module.exports = Character;
        root.Character = Character;
    }else{
        root.Character = Character;
    }
}());