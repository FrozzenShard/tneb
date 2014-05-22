/*global describe, it*/
var events = require('tneb/systems/map/events.js'),
    Location = require('tneb/systems/map/location.js'),
    Create = require('tneb/create.js'),
    Character = require('tneb/systems/battle/character.js'),
    Enemy = require('tneb/systems/battle/enemy.js'),
    Mocks = require('./helpers/mocks.js');

var mocha = require('mocha'),
    chai = require('chai'),
    expect = chai.expect;
var noop = function(){};

describe("events", function(){
    var ev = events.Events;
    describe("core",function(){
        it("Should register the SpawnEvent", function(){
            ev.registerEvent("SpawnEvent",events.SpawnEvent);
            expect(ev.registeredEvents.SpawnEvent).to.not.equal(undefined);
        });
        it("Should overide the SpawnEvent", function(){
            ev.registerEvent("SpawnEvent",noop,true);
            expect(ev.registeredEvents.SpawnEvent.callback).to.equal(noop);
            expect(ev._oldEvents.SpawnEvent).to.not.equal(undefined);
        });
    });
    
    describe("SpawnEvent", function(){
        var se = events.SpawnEvent;
        var gamemock = {
            activePlayer : undefined,
            create : Create()
        };
        gamemock.global = {
            events :{
                trigger : noop
            }
        };
        gamemock.systems = {
            battle : {
                start : noop,
                active : false
            }
        };
        
        it("Should create a 'Enemy' and return it", function(){
            var ret = se(gamemock,"Bob");
            expect(ret).to.be.an.instanceOf(Enemy);
        });
    });
    
});