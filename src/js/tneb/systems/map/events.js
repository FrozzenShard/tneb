(function(){
    var root = this;
    var ex = {};
    var _ = require('underscore');
    var utils = require('tneb/utils.js');
    var events = {};
    events.registeredEvents = {};
    events._oldEvents = {};
    events.registerEvent = function(name,cb,override){
        var ret;
        if(this.registeredEvents[name] && !override){
            return "Event already registred!";
        }
        if(override && this.registeredEvents[name]){
            events._oldEvents[name] = events._oldEvents[name] || [];
            events._oldEvents[name].push(this.registeredEvents[name]);
        }
        ret = this.registeredEvents[name] = {
            name : name,
            callback : cb
        };
        return ret;
    };
    
    function SpawnEvent(Game,enemy){
        var m = Game.create.Enemy("Dickhead");
        if(Game.systems.battle.active) return false;
        Game.systems.battle.start(Game.activePlayer,m);
        Game.global.events.trigger("system:event:"+this.toString());
        return m;
    }
    SpawnEvent.prototype.toString = function(){return "SpawnEvent";};
    ex = {
        Events : events,
        SpawnEvent : SpawnEvent
    };
    if(typeof module !== 'undefined' && module.exports){
        module.exports = ex;
        root.GameEvents = ex;
    }else{
        root.GameEvents = ex;
    }
}());