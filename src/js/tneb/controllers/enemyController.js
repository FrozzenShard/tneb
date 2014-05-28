(function(){
    var root = this;
    var Character = require('tneb/systems/battle/character.js');
    var $ = require('jQuery');
    var _ = require('underscore');
    var UIBattleStats = require('tneb/ui/uiBattleStats.js');
    function EnemyController(Game, initUi, character){
        if(character) {
            this.character = character;
            this.character.controller = this;
            this.character.stats.speed.baseValue(0,true);
        }
        this.active = true;
        if(initUi && character) this.initUi();
        this.Game = Game;
        this.lastFrame = {};
    }

    EnemyController.prototype.initUi = function(){
        this.ui = new UIBattleStats(this,
            this.character,
            document.getElementById("enemy-battle-stats"));
    };
    
    EnemyController.prototype.update = function(){
        if(!this.active) return;
        this.character.stats.health.increase(
            this.character.stats.healthRegen.baseValue() *
            this.Game.timer.elapsed);

        this.character.stats.mana.increase(
            this.character.stats.manaRegen.baseValue() *
            this.Game.timer.elapsed);
    };
    
    EnemyController.prototype.render = function(){
        if(!this.active) return;
        if(this.ui) this.ui.render();
    };

    EnemyController.prototype.doAction = function(target){
        this.character.useSkill(
            this.character.basicAttack(),
            target);
        this.character.stats.speed.baseValue(0,true);
    };

    EnemyController.prototype.tearDown = function(){
        this.active = false;
        this.ui.hide();
    };

    EnemyController.prototype.hasDied = function(){
        if(this.ui) this.ui.hide();
        this.active = false;
        this.Game.controllers.player.battleEnd();
    };
    
    if(typeof module !== 'undefined' && module.exports){
        module.exports = EnemyController;
    }else{
        root.EnemyController = EnemyController;
    }

}());