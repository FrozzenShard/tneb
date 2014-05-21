(function(){
    var root = this;
    var create;
    var Character = require('tneb/systems/battle/character.js');
    var Monster = require('tneb/systems/battle/monster.js');
    function Create(){
        if(create) return create;
        create = {};
        create.Monster = function(name){
            var ret = new Monster({name : name});
            return ret;
        };
        return create;
    }
    if(typeof module !== 'undefined' && module.exports){
        module.exports = Create;
        root.Create = Create;
    }else{
        root.Create = Create;
    }
}());