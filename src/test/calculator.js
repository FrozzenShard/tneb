/*global describe, it*/
var events = require('../js/game/systems/map/events.js'),
    Location = require('../js/game/systems/map/location.js'),
    Create = require('../js/game/create.js'),
    Character = require('../js/game/systems/battle/character.js'),
    Monster = require('../js/game/systems/battle/monster.js'),
    constants = require('../js/game/etc/constants.js'),
    config = require('../js/game/etc/config.js');

var mocha = require('mocha'),
    chai = require('chai'),
    expect = chai.expect;
var noop = function () {};

describe("calculator", function () {
    var c = new Character({
        armor: 100,
        magicRes: 100,
        resistances: {
            fire: 100
        }
    });
    console.log(c.stats.armor.getTotal());
    describe("Armor Reduction", function () {
        it("Should reduce the compute the armor reduction values correctly", function () {
            var damage = 50;
            var expectedResult = damage - (damage *( (c.stats.armor.getTotal() * config.battle.armorMultiplier)*0.01 ));
            var val = c.calculator.reduceByArmor(50);
            expect(val).to.equal(expectedResult);//48
        });
        it("Should increase the damage with armor pen", function () {
            var damage = 50;
            var expectedResult = damage - (damage *( ( (c.stats.armor.getTotal() * 0.5) * config.battle.armorMultiplier)*0.01 ));
            var val = c.calculator.reduceByArmor(50,c,{percent : {armor : 50}});
            expect(val).to.equal(expectedResult);
            
            expectedResult = damage - (damage *( ( (c.stats.armor.getTotal() - 10) * config.battle.armorMultiplier)*0.01 ));
            val = c.calculator.reduceByArmor(50,c,{flat : {armor : 10}});
            expect(Math.floor(val)).to.equal(Math.floor(expectedResult));
        });
        it("Should return 0 if the armor reduction is below 0", function(){
            c.stats.armor.baseValue(9999);
            var val = c.calculator.reduceByArmor(1);
            expect(val).to.equal(0);
        });
    });

    describe("Magic Reduction", function () {
        it("Should reduce the compute the magic resistance reduction values correctly", function () {
            var damage = 50;
            var expectedResult = damage - (damage *( (c.stats.magicRes.getTotal() * config.battle.magicResMultiplier)*0.01 ));
            var val = c.calculator.reduceByMagicResistance(damage);
            expect(val).to.equal(expectedResult);
        });
        it("Should increase the damage with magic pen", function () {
            var damage = 50;
            var expectedResult = damage - (damage *(  ( (c.stats.magicRes.getTotal() * 0.5 ) * config.battle.magicResMultiplier)*0.01 ));
            var val = c.calculator.reduceByMagicResistance(damage,c,{percent : {magic : 50}});
            expect(val).to.equal(expectedResult);
            
            expectedResult = damage - (damage *(  ( (c.stats.magicRes.getTotal() - 10) * config.battle.magicResMultiplier)*0.01 ));
            val = c.calculator.reduceByMagicResistance(damage,c,{flat : {magic : 10}});
            expect(val).to.equal(expectedResult);
        });
        it("Should return 0 if the magic reduction is below 0", function(){
            c.stats.magicRes.baseValue(9999);
            var val = c.calculator.reduceByMagicResistance(1);
            expect(val).to.equal(0);
        });
    });

    describe("Elemental Reduction", function () {
        it("Should reduce the compute the elemental reduction values correctly", function () {
            var damage = 50;
            var expectedResult = damage - (damage *( (c.stats.resistances.fire.getTotal() * config.battle.elementalResMultiplier)*0.01 ));
            var val = c.calculator.reduceByElementalResistance(constants.elements.fire, 50);
            expect(Math.floor(val)).to.equal(Math.floor(expectedResult));
        });
        it("Should increase the damage with elmental pen", function () {
            var damage = 50;
            var expectedResult = damage - (damage *( ( (c.stats.resistances.fire.getTotal() * 0.5) * config.battle.elementalResMultiplier)*0.01 ));
            var val = c.calculator.reduceByElementalResistance(constants.elements.fire,50,c,{percent : {fire : 50}});
            expect(Math.floor(val)).to.equal(Math.floor(expectedResult));
            
            expectedResult = damage - (damage *( ( (c.stats.resistances.fire.getTotal() - 10) * config.battle.elementalResMultiplier)*0.01 ));
            val = c.calculator.reduceByElementalResistance(constants.elements.fire,50,c,{flat : {fire : 10}});
            expect(Math.floor(val)).to.equal(Math.floor(expectedResult));
        });
        it("Should return 0 if the elemental reduction is below 0", function(){
            c.stats.resistances.fire.baseValue(9999);
            var val = c.calculator.reduceByElementalResistance(constants.elements.fire,1);
            expect(val).to.equal(0);
        });
        
    });

});


