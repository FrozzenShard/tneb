(function(){
    var root = this;
    var $ = require('jQuery');
    var backbone = require('backbone');
    var _ = require('underscore');
    var config = require('./etc/config.js');
    var Character = require('./systems/battle/character.js');
    var Battle = require('./systems/battle/battle.js');
    var modApi = require('./systems/mod/modapi.js');
    var hook = require('./systems/battle/hook.js');
    var Create = require('./create.js');
    var Location = require('./systems/map/location.js');
    var events = require('./systems/map/events.js');
    //var User = require('./user.js);
    
    var Game = {};
    Game.systems = {};
    Game.timer = {
        elapsed : 1,
        lastTime : 1
    };
    Game.global = {
        _ : _,
        backbone : backbone,
        modApi : modApi
    };
    Game.global.events = {};
    _.extend(Game.global.events,hook);
    Game.init = function(){
        Game.activePlayer = new Character({},this);
        Game.timer.lastTime = Date.now();
        Game.loop();
        Game.systems.battle = Battle(this);
        Game.create = Create(this);
    };
    
    Game.update = function(){
        _.each(Game.systems,function(v,k){
            v.update();
        });
    };
    Game.render = function(){
        _.each(Game.systems,function(v,k){
            v.render(Game.activePlayer);
        });
    };
    Game.loop = function(){
        Game.timer.elapsed = (Date.now() - Game.timer.lastTime) / 1000;
        Game.update();
        Game.render();
        //Game.render();
        Game.timeout = setTimeout(Game.loop,1000/config.fps);
        Game.timer.lastTime = Date.now();
    };
    Game.global.version = "0.0.2";
    if(typeof module !== 'undefined' && module.exports){
        module.exports = Game;
        root.Game = Game;
    }else{
        root.Game = Game;
    }
}());