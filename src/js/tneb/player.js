(function(){
    var root = this;
    var Character = require('tneb/systems/battle/character.js');
    var $ = require('jQuery');
    var randomNames = ["Sammy", "Villy", "Azarath", "Metrion", "Zinthos",
                       "Flying Watermelon", "Blue", "Meteor", "Lion Rabbit",
                       "Robotmayo", "SJVellenga", "Antlong", "MoragX", "tangentialThinker","waffleyone",
                      "Muffer-Nl", "gamehelp16", "firewires"];
    var _ = require('underscore');
    var UICharacter = require('tneb/ui/uicharacter.js');
    function Player(Game){
        this.name = _.sample(randomNames,1)[0];
        this.party = [new Character(null, this.name, Game)];
        this.party[0].isAi = false;
        this.ui = new UICharacter(this.party[0], document.getElementById("party-battle-stats"));
        this.Game = Game;
        this.lastFrame = {};
        this.inBattle = false;
        this.Game.global.events.on("battle:start", function(){
            this.inBattle = true;
        });
        this.party[0].stats.health.baseValue(0,true);
        this.party[0].stats.mana.baseValue(0,true);
    }
    
    Player.prototype.update = function(){
        this.party[0].stats.health.increase(this.party[0].stats.healthRegen.baseValue() * this.Game.timer.elapsed);
        this.party[0].stats.mana.increase(this.party[0].stats.manaRegen.baseValue() * this.Game.timer.elapsed);
    };
    
    Player.prototype.render = function(){
        this.ui.render();
    };
    
    if(typeof module !== 'undefined' && module.exports){
        module.exports = Player;
    }else{
        root.Player = Player;
    }

}());