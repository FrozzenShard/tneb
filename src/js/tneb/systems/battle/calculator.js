(function () {
    var root = this;
    var _ = require('underscore');
    var constants = require('tneb/etc/constants.js');
    var config = require('tneb/etc/config.js');
    
    
    /*
    * Create a new calculator
    * @param {Character} [user] to reference
    */
    function Calculator(user) {
        this.user = user;
    }
    
    /*
    * Reduce value by Armor
    * @param {Number} val The value to reduce
    * @param {Object} [source] The character doing damage. Will take into account its penetration stats.
    * @param {Object} [pen] Object containing extra penetration information
    * @param {Number} [pen.percent.armor | pen.flat.armor] The actual penetration numbers 
    * @return {Number} The new reduced value, will never be less than 0.
    */
    Calculator.prototype.reduceByArmor = function (val, source, pen) {
        var percentApen = 0,
            flatApen = 0,
            armor = this.user.stats.armor.getTotal(),
            total = val;
        if (pen) {
            if(pen.percent) percentApen += pen.percent.armor || 0;
            if(pen.flat) flatApen += pen.flat.armor || 0;
        }
        if (source) {
            percentApen += source.stats.penetration.percent.armor.getTotal();
            flatApen += source.stats.penetration.flat.armor.getTotal();
        }
        armor -= armor * (percentApen * 0.01);
        armor -= flatApen;
        if(armor < 0) armor = 0;
        total -= total * ( (armor * config.battle.armorMultiplier) * 0.01 );
        return (total < 0 ? 0 : total);
    };
    
    /*
    * Reduce value by Magic Resistance
    * @param {Number} val The value to reduce
    * @param {Object} [source] The character doing damage. Will take into account its penetration stats.
    * @param {Object} [pen] Object containing extra penetration information
    * @param {Number} [pen.percent.magic | pen.flat.magic] The actual penetration numbers 
    * @return {Number} The new reduced value, will never be less than 0.
    */
    Calculator.prototype.reduceByMagicResistance = function (val, source, pen) {
        var percentMpen = 0,
            flatMpen = 0,
            magicRes = this.user.stats.magicRes.getTotal(),
            total = val;
        if (source) {
            percentMpen += source.stats.penetration.percent.magic.getTotal();
            flatMpen += source.stats.penetration.flat.magic.getTotal();
        }
        if (pen) {
            if(pen.percent) percentMpen += pen.percent.magic || 0;
            if(pen.flat) flatMpen += pen.flat.magic || 0;
        }
        magicRes -= magicRes * (percentMpen * 0.01);
        magicRes -= flatMpen;
        if(magicRes < 0) magicRes = 0;
        total -= total * ((magicRes * config.battle.magicResMultiplier)* 0.01);
        return (total < 0 ? 0 : total);
    };
    
    /*
    * Reduce value by Elemental  Resistance
    * @param {String} el The element
    * @param {Number} val The value to reduce
    * @param {Object} [source] The character doing damage. Will take into account its penetration stats.
    * @param {Object} [pen] Object containing extra penetration information
    * @param {Number} [pen.percent.element | pen.flat.element] The actual penetration numbers 
    * @return {Number} The new reduced value, will never be less than 0.
    */
    Calculator.prototype.reduceByElementalResistance = function (el, val, source, pen) {
        var percentResPen = 0,
            flatResPen = 0,
            res = this.user.stats.resistances[el].getTotal(),
            total = val;
        if (source) {
            percentResPen += source.stats.penetration.percent[el].getTotal();
            flatResPen += source.stats.penetration.flat[el].getTotal();
        }
        if (pen) {
            if(pen.percent) percentResPen = pen.percent[el] || 0;
            if(pen.flat) flatResPen = pen.flat[el] || 0;
        }
        res -= res * (percentResPen * 0.01);
        res -= flatResPen;
        if(res < 0) res = 0;
        total -= total * ((res * config.battle.elementalResMultiplier) * 0.01);
        return (total < 0 ? 0 : total);
    };
    if(typeof module !== 'undefined' && module.exports){
        module.exports = Calculator;
        root.Calculator = Calculator;
    }else{
        root.Calculator = Calculator;
    }

}());