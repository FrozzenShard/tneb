(function(){
    var root = this;
    var Character = require('tneb/systems/battle/character.js');
    var $ = require('jQuery');
    var randomNames = [
    "Sammy", "Villy", "Azarath", "Metrion", "Zinthos",
    "Flying Watermelon", "Blue", "Meteor", "Lion Rabbit",
    "Robotmayo", "SJVellenga", "Antlong", "MoragX",
    "tangentialThinker","waffleyone",
    "Muffer-Nl", "gamehelp16", "firewires"];

    var _ = require('underscore');

    var UIPlayerBattleStats = require('tneb/ui/uiPlayerBattleStats.js');


    /**
    * The Player controller
    * {Game} Game A reference to the Game object
    * {Boolean} [initUi] A boolean to determine whether or not to init the ui
    * {Character} [character] The players character. Can be set later.  
    */
    function Player(Game,initUi,character){
        this.name = _.sample(randomNames,1)[0];
        this.Game = Game;
        this.lastFrame = {};
        this.active = true;
        if(character) {
            this.character = character;
            this.character.controller = this;
            this.character.stats.speed.baseValue(0,true);
            this.character.name = this.name;
        }
        if(initUi && character) this.initUi();
        
    }

    Player.prototype.initUi = function(){
        var self = this;
        this.ui = new UIPlayerBattleStats(
            this,
            this.character,
            document.getElementById("party-battle-stats"));
        this.ui.disableAttackBtn(false);
        this.ui.uiData.attackBtn.$el.click(function(evt){
            if(self.target){
                self.character.useSkill(
                    self.character.basicAttack(),
                    self.target);
                self.ui.disableAttackBtn(true);
                self.character.stats.speed.baseValue(0,true);
                self.character.canAction = true;
            }

        });
    };

    Player.prototype.initBattle = function(allies,enemies){
        this.allies = allies;
        this.enemies = enemies;
    };

    Player.prototype.doAction = function(target){
        this.ui.disableAttackBtn(false);
        this.target = target;
        this.character.canAction = false;
    };

    
    Player.prototype.update = function(){
        this.character.stats.health.increase(
            this.character.stats.healthRegen.baseValue()
            * this.Game.timer.elapsed);

        this.character.stats.mana.increase(
            this.character.stats.manaRegen.baseValue()
            * this.Game.timer.elapsed);
    };
    
    Player.prototype.render = function(){
        this.ui.render();
    };

    Player.prototype.hasDied = function(){
        this.Game.controllers.enemy.tearDown();
    };

    Player.prototype.battleEnd = function(){
        this.ui.disableAttackBtn(true);
    };
    
    if(typeof module !== 'undefined' && module.exports){
        module.exports = Player;
    }else{
        root.Player = Player;
    }

}());