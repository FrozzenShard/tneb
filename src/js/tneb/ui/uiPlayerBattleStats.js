(function(){
    var root = this;
    var $ = require('jQuery');
    var _ = require('underscore');
    var tmpl = require('tneb-templates/playerSlot.hbs');
    var Stat = require('tneb/systems/battle/stat');

    function UIPlayerBattleStats(controller, character, parent, wrapper){
        this.character = character;
        this.controller = controller;
        this.template = tmpl;
        this.parent = parent || document.body;
        this.wrapper = wrapper || document.createElement('div');
        this.parent.appendChild(this.wrapper);
        this.$parent = $(this.parent);
        this.$wrapper = $(this.wrapper);
        this.$wrapper.html(tmpl(this.templateData));
        this.createUiData();
    }



    UIPlayerBattleStats.prototype.createUiData = function() {
        var base = this.$wrapper.find('.health-display');
        var self = this;
        this.uiData = {};
        this.uiData.health = {
            $el : base,
            $name : base.find('.name'),
            $bar : base.find('.bar'),
            stat : self.character.stats.health
        };
        base = this.$wrapper.find('.mana-display');
        this.uiData.mana = {
            $el : base,
            $name : base.find('.name'),
            $bar : base.find('.bar'),
            stat : self.character.stats.mana
        };

        base = this.$wrapper.find('.exp-display');
        this.uiData.exp = {
            $el : base,
            $name : base.find('.name'),
            $bar : base.find('.bar'),
            stat : self.character.stats.exp
        };

        base = this.$wrapper.find('.speed-display');
        this.uiData.speed = {
            $el : base,
            $name : base.find('.name'),
            $bar : base.find('.bar'),
            stat : self.character.stats.speed
        };
        this.uiData.attackBtn = {
            $el : self.$wrapper.find('.attack')
        };

        base = this.$wrapper.find('.name-display');
        this.uiData.name = {
            $el : base,
            $name : base.find('.name'),
            $title : base.find('.title')
        }
    };

    UIPlayerBattleStats.prototype.update = function(){
        
    };

    UIPlayerBattleStats.prototype.render = function(){
        this.uiData.name.$name.text(this.controller.name);
        this.uiData.name.$title.text(this.controller.name);
        this.uiData.health.$name.text(this.uiData.health.stat.name);
        this.uiData.mana.$name.text(this.uiData.mana.stat.name);
        this.uiData.exp.$name.text(this.uiData.exp.stat.name);
        this.uiData.speed.$name.text(this.uiData.speed.stat.name);

        this.uiData.health.$bar.width( (this.uiData.health.stat.baseValue() / this.uiData.health.stat.max()) * 100 + "%");
        this.uiData.mana.$bar.width( (this.uiData.mana.stat.baseValue() / this.uiData.mana.stat.max()) * 100 + "%");
        this.uiData.exp.$bar.width( (this.uiData.exp.stat.baseValue() / this.uiData.exp.stat.max()) * 100 + "%");
        this.uiData.speed.$bar.width( (this.uiData.speed.stat.baseValue() / this.uiData.speed.stat.max()) * 100 + "%");
    };

    UIPlayerBattleStats.prototype.enableAttackBtn = function(enabled){
        this.uiData.attackBtn.$el.prop('disabled', enabled);
    };

    if(typeof module !== 'undefined' && module.exports){
        module.exports = UIPlayerBattleStats;
    }
    root.UIPlayerBattleStats = UIPlayerBattleStats;
}());