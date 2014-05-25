(function(){
    var root = this;
    var utils = require('tneb/utils.js');
    
    /*
    * All events for locaction come in the array format of : [Event,TimesCanHappen,Weight]
    * Search : A 2darray of all possible events.
    * Event : {
    *   name : SpawnEvent
    *   noticeText : You have encountered a {{char.name}}! Prepare for battle!!,
    *   data : [] For system/predefined events. Will be supplied to as the arguments
    *   }
    */
    function Location(data){
        this.searchEvents = [[{
            name : "SpawnEvent",
            data : ["Derpy"]
        }, 0, 1]];
        this.searchWeights = this.getSearchWeights();
    }
    
    Location.prototype.search = function(events){
        var i = utils.weightedRandom(this.searchWeights);
        var e = this.searchEvents[i];
        var theEvent = events.registeredEvents[e.name];
        if(theEvent){
            theEvent.callback.apply(theEvent,e.data);
        }
    };
    
    Location.prototype.getSearchWeights = function(){
        return this.searchEvents.map(function(e){
            return e[2];
        });
    };
    
    if(typeof module !== 'undefined' && module.exports){
        module.exports = Location;
        root.Place = Location;
    }else{
        root.Place = Location;
    }
}());