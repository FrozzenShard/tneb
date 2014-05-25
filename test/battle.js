/*global describe, it*/
var events = require('tneb/systems/map/events.js'),
    Place = require('tneb/systems/map/place.js'),
    Create = require('tneb/create.js'),
    Character = require('tneb/systems/battle/character.js'),
    Battle = require('tneb/systems/battle/battle.js'),
    Enemy = require('tneb/systems/battle/enemy.js'),
    constants = require('tneb/etc/constants.js'),
    Mocks = require('./helpers/mocks.js'),
    Hook = require('tneb/systems/battle/hook.js'),
    _ = require('underscore');

var mocha = require('mocha'),
    chai = require('chai'),
    expect = chai.expect;

describe("Battle", function(){
    it("Should fail to start a battle", function(){
        var GameMock = Mocks.GameMock();
        var b = new Battle(GameMock);
        var result = b.start();
        expect(result).to.equal(false);
    });
    
    it("Should start a battle and update", function(){
        var GameMock = Mocks.GameMock();
        var fa = new Character(null,GameMock);
        var fb = new Character(null,GameMock);
        var startingSpeed = fa.stats.speed.baseValue();
        var b = new Battle(GameMock);
        var result = b.start(fa,fb);
        GameMock.timer.elapsed = 1;
        expect(result).to.equal(true);
        expect(fa.stats.speed.baseValue()).to.be.above(startingSpeed);
    });
    
    it("Should simulate an entire battle where fighterA wins", function(){
        var GameMock = Mocks.GameMock();
        _.extend(GameMock.global.events, Hook);
        var fa = new Character({str : 50000, health : 10000}, GameMock);
        var fb = new Character({str : 1, health : 50, armor : 0}, GameMock);
        var b = new Battle(GameMock);
        var count = 0;
        b.start(fa,fb);
        while(b.active){
            if(count > 0) {
                console.log("BREAKING WTF", b.active);
                break;
            }
            b.update();
            count++;
        }
        expect(b.active).to.equal(false);
        
    });
    
});


