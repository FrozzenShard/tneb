(function(){
    var root = this;
    var create;
    var Character = require('tneb/systems/battle/character.js');
    var Enemy = require('tneb/systems/battle/enemy.js');
    function Create(){
        if(create) return create;
        create = {};
        create.Enemy = function(name){
            var ret = new Enemy({name : name});
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