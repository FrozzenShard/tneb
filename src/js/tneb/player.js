(function(){
    var root = this;
    var Character = require('tneb/systems/battle/character.js');
    var $ = require('jQuery');
    function Player(Game){
        this.character = new Character(null,Game);
        this.ui = {};
        this.Game = Game;
        this.initUi();
        this.character.stats.health.baseValue(0,true);
        this.cache = {};
    }
    
    Player.prototype.initUi = function(){
        var base;
        this.ui.battleDisplay = {};
        this.ui.battleDisplay.base = $('.party-slot');
        this.ui.battleDisplay.name = this.ui.battleDisplay.base.find('.name');
        
        base = this.ui.battleDisplay.base.find('.health-display');
        this.ui.battleDisplay.healthDisplay = {
            base : base,
            name : base.find('.name'),
            bar : base.find('.bar')
        };
    };
    
    Player.prototype.update = function(){
        if(!this.character.stats.health.isMax()){
            this.character.stats.health.increase(this.character.stats.healthRegen.getTotal()*this.Game.timer.elapsed);
        }
    };
    
    Player.prototype.render = function(){
        if(!this.character.stats.health.isMax()){
            this.ui.battleDisplay.healthDisplay.bar.width( (this.character.stats.health.baseValue() / this.character.stats.health.max()) * 100 + "%");
        }
        //this.ui.battleDisplay.healthDisplay.bar.width( (this.character.stats.health.baseValue() / this.character.stats.health.max()) * 100 + "%");
    };
    
    if(typeof module !== 'undefined' && module.exports){
        module.exports = Player;
    }else{
        root.Player = Player;
    }
}());