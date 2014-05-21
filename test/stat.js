/*global describe, it*/
var Character = require('tneb/systems/battle/character.js'),
    Stat = require('tneb/systems/battle/stat.js'),
    constants = require('tneb/etc/constants.js');

var mocha = require('mocha'),
    chai = require('chai'),
    expect = chai.expect;

describe("Stat Initilization, Max,Min and Change methods", function(){
    it("Should create a new stat object with a base value of 12", function(){
        var stat = new Stat("str",12);
        expect(stat.baseValue()).to.equal(12);
    });
    
    it("Should add the modifiers to the stat and return modifier object", function(){
        var stat = new Stat("HP", 100);
        var m = stat.addModifer("flat",15);
        expect(m).to.not.equal(undefined);
        expect(stat.modifiers.length).to.equal(1);
    });
    
    it("Should handle min/max functions correctly", function(){
        var stat = new Stat("BOBOBOBOBOBON FIRE", 1000);
        stat.max(100);
        expect(stat.isMax()).to.equal(true);
        expect(stat.baseValue()).to.equal(100);
        stat.max(null,true);
        stat.baseValue(0,true);
        stat.baseValue(1000);
        expect(stat.baseValue()).to.equal(1000);
        
        stat.min(-10);
        stat.baseValue(-100,true);
        expect(stat.isMin()).to.equal(true);
    });
    
    it("Should clamp the stat values", function(){
        var stat = new Stat("health",100,100,0);
        stat.decrease(1000);
        expect(stat.baseValue()).to.equal(0);
        stat.increase(1000);
        expect(stat.baseValue()).to.equal(100);
    });
    
    it("Should return the new base stat value upon increasing and decreasing", function(){
        var stat = new Stat("str",50);
        var ret = stat.decrease(10);
        expect(ret).to.equal(40);
        ret = stat.increase(20);
        expect(ret).to.equal(60);
    });
    
    it("Should change the values correctly", function(){
        var stat = new Stat("Pie", 100);
        stat.change(10);
        expect(stat.baseValue()).to.equal(110);
        stat.change(-10);
        expect(stat.baseValue()).to.equal(100);
    });
});

describe("Stat modification and operators", function(){
    it("Should calculate all the stat modifiers correctly", function(){
        var stat = new Stat("str", 100);
        stat.addModifer("flat",40);
        stat.addModifer("flat",40);
        stat.addModifer("percent",100);
        stat.addModifer("percent",100);
        expect(stat.getTotal()).to.equal(540);
    });
    it("Should add and subtract the stats correctly, also works with regular numbers", function(){
        var statA = new Stat("Zzztop", 100);
        var statB = new Stat("BOOMOOMOOM", 10);
        expect(statA.add(statB)).to.equal(110);
        expect(statA.subtract(statB)).to.equal(90);
    });
    it("Should multiply and divide the stats correctly, also works with regular numbers", function(){
        var statA = new Stat("Zzztop", 100);
        var statB = new Stat("BOOMOOMOOM", 10);
        expect(statA.multiply(statB)).to.equal(1000);
        expect(statA.divide(statB)).to.equal(10);
    });
});

