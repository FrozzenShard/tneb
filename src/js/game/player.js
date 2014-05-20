(function(){
    var root = this;
    var Character = require('./systems/battle/character.js');
    function Player(Game){
        this.character = new Character(null,Game);
    }
    
    if(typeof module !== 'undefined' && module.exports){
        module.exports = Player;
    }else{
        root.Player = Player;
    }
}());