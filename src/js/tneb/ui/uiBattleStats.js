(function(){
    var root = this;
    var $ = require('jQuery');
    var _ = require('underscore');
    var tmpl = require('tneb-templates/enemyBattleSlot.hbs');
    var Stat = require('tneb/systems/battle/stat');
    function UIBattleStats(controller, character, parent, wrapper){
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



    UIBattleStats.prototype.createUiData = function() {
        var base = this.$wrapper.find('.health-display');
        var self = this;
        this.uiData = {};
        this.uiData.health = {
            $el : base,
            $name : base.find('.name'),
            $bar : base.find('.bar'),
            stat : self.character.stats.health
        }
        base = this.$wrapper.find('.mana-display');
        this.uiData.mana = {
            $el : base,
            $name : base.find('.name'),
            $bar : base.find('.bar'),
            stat : self.character.stats.mana
        }

        base = this.$wrapper.find('.speed-display');
        this.uiData.speed = {
            $el : base,
            $name : base.find('.name'),
            $bar : base.find('.bar'),
            stat : self.character.stats.speed
        }
        base = this.$wrapper.find('.name-display');
        this.uiData.name = {
            $el : base,
            $name : base.find('.name'),
            $prefix : base.find('.prefix')
        }
    };

    UIBattleStats.prototype.update = function(){
        
    };

    UIBattleStats.prototype.render = function(){
        this.uiData.name.$name.text(this.controller.name);
        this.uiData.health.$name.text(this.uiData.health.stat.name);
        this.uiData.mana.$name.text(this.uiData.mana.stat.name);
        this.uiData.speed.$name.text(this.uiData.speed.stat.name);

        this.uiData.health.$bar.width( (this.uiData.health.stat.baseValue() / this.uiData.health.stat.max()) * 100 + "%");
        this.uiData.mana.$bar.width( (this.uiData.mana.stat.baseValue() / this.uiData.mana.stat.max()) * 100 + "%");
        this.uiData.speed.$bar.width( (this.uiData.speed.stat.baseValue() / this.uiData.speed.stat.max()) * 100 + "%");
    };

    if(typeof module !== 'undefined' && module.exports){
        module.exports = UIBattleStats;
    }
    root.UIBattleStats = UIBattleStats;
}());