/*global describe, it*/
var Character = require('tneb/systems/battle/character.js'),
    constants = require('tneb/etc/constants.js');

var mocha = require('mocha'),
    chai = require('chai'),
    expect = chai.expect;
var noop = function () {};
var GameMock = {
    global : {
        events : {
            trigger : noop
        }
    }
};

describe("character", function () {
    var defaults = Character.prototype.getDefaultStats();
    it("Should create a new character with overridden defaults", function () {
        var c = new Character({
                str: 999
            },"Name",{Game : GameMock});
        expect(c.stats.str.baseValue()).to.equal(999);
        expect(c.stats.dex.baseValue()).to.equal(defaults.dex);
    });
    
    it("Should deal physical damage", function(){
        var stats = {
            health: 200,
            armor: 30
        };
        var char = new Character(stats,"Name",{Game : GameMock});
        var target = new Character(stats,"Name",{Game : GameMock});
        var startingHealth = char.stats.health.baseValue();
        var d = char.applyDamage({
            skill : null,
            user : char,
            target : target
        },{
            type : constants.damageTypes.physical,
            beforeRes : 50
        });
        expect(Math.floor(char.stats.health.baseValue())).to.be.equal(Math.floor(startingHealth-d));
    });
    
    it("Should deal magical damage", function(){
        var stats = {
            health: 200,
            armor: 30,
            magicRes: 30
        };
        var char = new Character(stats,"Name",{Game : GameMock});
        var target = new Character(stats,"Name",{Game : GameMock});
        var startingHealth = char.stats.health.baseValue();
        var d = char.applyDamage({
            skill : null,
            user : char,
            target : target
        },{
            type : constants.damageTypes.magical,
            beforeRes : 50
        });
        expect(Math.floor(char.stats.health.baseValue())).to.be.equal(Math.floor(startingHealth-d));
    });
    
});