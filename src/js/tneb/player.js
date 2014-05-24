(function(){
    var root = this;
    var Character = require('tneb/systems/battle/character.js');
    var $ = require('jQuery');
    var randomNames = ["Sammy", "Villy", "Azarath", "Metrion", "Zinthos",
                       "Flying Watermelon", "Blue", "Meteor", "Lion Rabbit",
                       "Robotmayo", "SJVellenga", "Antlong", "MoragX", "tangentialThinker","waffleyone",
                      "Muffer-Nl", "gamehelp16", "firewires"];
    var _ = require('underscore');
    function Player(Game){
        this.party = [new Character(null,Game)];
        this.ui = {};
        this.Game = Game;
        this.name = _.sample(randomNames,1);
        this.lastFrame = {};
        this.inBattle = false;
        this.initUi();
        this.Game.global.events.on("battle:start", function(){
            this.inBattle = true;
        });
    }
    
    Player.prototype.initUi = function(){
        var base,
            input,
            self = this;
        this.ui.battleDisplay = {};
        this.ui.battleDisplay.base = $('.party-slot');
        
        base = this.ui.battleDisplay.base.find('.name-display');
        this.ui.battleDisplay.nameDisplay = {
            $base : base,
            $name : base.find('.name'),
            $title : base.find('title')
        };
        this.ui.battleDisplay.nameDisplay.$name.text(this.name);
        this.ui.battleDisplay.nameDisplay.$name.click(changeName);
        input = this.ui.battleDisplay.nameDisplay.$base.children('input');
        input.focusout(function(){
            var v = input.val().trim();
            if(v !== '') self.name = v;
            self.ui.battleDisplay.nameDisplay.$name.text(self.name);
            $(this).hide();
        });
        
        base = this.ui.battleDisplay.base.find('.health-display');
        this.ui.battleDisplay.healthDisplay = {
            $base : base,
            $name : base.find('.name'),
            $bar : base.find('.bar')
        };
        
        this.ui.battleDisplay.actions = {
            $attack : this.ui.battleDisplay.base.find('.attack'),
            $skills : this.ui.battleDisplay.base.find('.skills')
        };
        this.ui.battleDisplay.actions.$attack.prop('disabled',!this.inBattle);
        //console.log(this.ui.battleDisplay.actions.$attack, this.inBattle);
    };
    
    Player.prototype.update = function(){
        for(var i = 0; i < this.party.length; i++){
            var curChar = this.party[i];
            if(!curChar.stats.health.isMax()){
                curChar.stats.health.increase(this.character.stats.healthRegen.getTotal()*this.Game.timer.elapsed);
            }
        }
    };
    
    Player.prototype.render = function(){
        if(this.lastFrame.inBattle !== this.inBattle){
            this.ui.battleDisplay.actions.$attack.prop('disabled',!this.inBattle);
        }
        if(!this.character.stats.health.isMax()){
            this.ui.battleDisplay.healthDisplay.$bar.width( (this.character.stats.health.baseValue() / this.character.stats.health.max()) * 100 + "%");
        }
        //this.ui.battleDisplay.healthDisplay.bar.width( (this.character.stats.health.baseValue() / this.character.stats.health.max()) * 100 + "%");
    };
    
    function changeName(evt){
        var self = $(this);
        var input = self.parent().children('input');
        self.text('');
        input.val(this.name);
        input.show();
        input.focus();
    }
    
    if(typeof module !== 'undefined' && module.exports){
        module.exports = Player;
    }else{
        root.Player = Player;
    }
}());