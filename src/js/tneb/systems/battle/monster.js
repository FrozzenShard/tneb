(function(){
    var root = this;
    var Character = require('./character.js');
    
    function Monster(){
        Character.apply(this,arguments);
    }
    
    Monster.prototype = Character.prototype;
    if(typeof module !== 'undefined' && module.exports){
        module.exports = Monster;
        root.Monster = Monster;
    }else{
        root.Monster = Monster;
    }
}());