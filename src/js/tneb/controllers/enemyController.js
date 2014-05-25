(function(){
    var root = this;
    var Character = require('tneb/systems/battle/character.js');
    var $ = require('jQuery');
    var _ = require('underscore');
    var UIBattleStats = require('tneb/ui/uiBattleStats.js');
    function EnemyController(Game){
        this.name = "Racoon";
        this.character = new Character(null, this.name, this);
        this.character.isAi = false;
        this.ui = new UIBattleStats(this, this.character, document.getElementById("enemy-battle-stats"));
        this.Game = Game;
        this.lastFrame = {};
        this.character.stats.speed.baseValue(0,true);
    }
    
    EnemyController.prototype.update = function(){
        this.character.stats.health.increase(this.character.stats.healthRegen.baseValue() * this.Game.timer.elapsed);
        this.character.stats.mana.increase(this.character.stats.manaRegen.baseValue() * this.Game.timer.elapsed);
    };
    
    EnemyController.prototype.render = function(){
        this.ui.render();
    };

    EnemyController.prototype.doAction = function(target){
        this.character.useSkill(
            this.character.basicAttack(),
            target);
        this.character.stats.speed.baseValue(0,true);
    };
    
    if(typeof module !== 'undefined' && module.exports){
        module.exports = EnemyController;
    }else{
        root.EnemyController = EnemyController;
    }

}());