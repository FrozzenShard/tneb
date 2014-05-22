(function(){
    var root = this;
    var $ = require('jQuery');
    var backbone = require('backbone');
    var _ = require('underscore');
    var config = require('tneb/etc/config.js');
    var Character = require('tneb/systems/battle/character.js');
    var Battle = require('tneb/systems/battle/battle.js');
    var modApi = require('tneb/systems/mod/modapi.js');
    var hook = require('tneb/systems/battle/hook.js');
    var Create = require('tneb/create.js');
    var Location = require('tneb/systems/map/location.js');
    var events = require('tneb/systems/map/events.js');
    var Player = require('tneb/player.js');
    
    var Game = {};
    Game.systems = {};
    Game.timer = {
        elapsed : 1,
        lastTime : 1
    };
    Game.global = {};
    Game.global.events = {};
    _.extend(Game.global.events,hook);
    Game.init = function(){
        Game.activePlayer = new Player(this);
        Game.timer.lastTime = Date.now();
        Game.loop();
        Game.systems.battle = new Battle(this);
        Game.create = Create(this);
    };
    
    Game.update = function(){
        _.each(Game.systems,function(v,k){
            v.update();
        });
        this.activePlayer.update();
    };
    Game.render = function(){
        _.each(Game.systems,function(v,k){
            v.render(Game.activePlayer);
        });
        this.activePlayer.render();
    };
    Game.loop = function(){
        Game.timer.elapsed = (Date.now() - Game.timer.lastTime) / 1000;
        Game.update();
        Game.render();
        //Game.render();
        Game.timeout = setTimeout(Game.loop,1000/config.fps);
        Game.timer.lastTime = Date.now();
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