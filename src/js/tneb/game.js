(function(){
    var root = this;
    var $ = require('jQuery');
    var _ = require('underscore');
    var config = require('tneb/etc/config.js');
    var Character = require('tneb/systems/battle/character.js');
    var Battle = require('tneb/systems/battle/battle.js');
    var modApi = require('tneb/systems/mod/modapi.js');
    var hook = require('tneb/systems/battle/hook.js');
    var Create = require('tneb/create.js');
    var Place = require('tneb/systems/map/place.js');
    var events = require('tneb/systems/map/events.js');
    var Player = require('tneb/controllers/player.js');
    var EnemyController = require('tneb/controllers/enemyController.js');
    var logger = require('tneb/logger');

    var Game = {};
    Game.systems = {};
    Game.timer = {
        elapsed : 1,
        lastTime : 1,
        timeout : -1
    };
    Game.global = {};
    Game.global.events = {};
    _.extend(Game.global.events,hook);
    Game.controllers = {
        enemy : new EnemyController(Game,true,new Character(null,"Raccoon")),
        player : new Player(Game,true,new Character({speedGain:500}))
    };
    Game.init = function(){
        Game.timer.lastTime = Date.now();
        Game.loop();
        Game.systems.battle = new Battle(this);
        Game.create = Create(this);
        Game.systems.battle.start(
            this.controllers.player.character, 
            this.controllers.enemy.character);
    };
    
    Game.update = function(){
        _.each(this.systems, function(val,key){
            if(val) val.update();
        });
        _.each(this.controllers, function(val,key){
            if(val) val.update();
        });
    };
    Game.render = function(){
        _.each(this.systems, function(val,key){
            if(val) val.render();
        });
        _.each(this.controllers, function(val,key){
            if(val) val.render();
        });
    };
    Game.loop = function(){
        Game.timer.elapsed = (Date.now() - Game.timer.lastTime) / 1000;
        Game.update();
        Game.render();
        Game.timer.lastTime = Date.now();
        Game.timer.timeout = setTimeout(Game.loop,1000/config.fps);
    };
    Game.init();
    Game.version = "0.0.2";
    if(typeof module !== 'undefined' && module.exports){
        module.exports = Game;
        root.Game = Game;
    }else{
        root.Game = Game;
    }
}());