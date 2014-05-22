(function(){
    var root = this;
    var Character = require('./character.js');
    
    function Enemy(){
        Character.apply(this,arguments);
    }
    
    Enemy.prototype = Character.prototype;
    if(typeof module !== 'undefined' && module.exports){
        module.exports = Enemy;
        
        root.Enemy = Enemy;
    }else{
        root.Enemy = Enemy;
    }
}());