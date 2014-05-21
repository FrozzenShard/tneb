(function () {
    var _ = require('underscore');
    var $ = require('jQuery');
    var root = this;

    function Battle(Game) {
        this.log = [];
        this.fighterA;
        this.fighterB;
        this.Game = Game;
        this.active = false;
        this.init();
    }
    Battle.version = "0.0.1";
    Battle.prototype.init = function () {
        this.Game.global.events.trigger('battle:systemInit');
        //this.initUi();
    };

    Battle.prototype.update = function () {
        if (!this.active) return;
        var fasg = this.fighterA.stats.speedGain.getTotal() * this.Game.timer.elapsed;
        // I originally was going to abbrivate as FighterAspeedGain but that seemed like a bad idea.
        var fbsg = this.fighterA.stats.speedGain.getTotal() * this.Game.timer.elapsed;
        this.fighterA.stats.speed.increase(fasg);
        this.fighterB.stats.speed.increase(fbsg);

        if (this.fighterA.stats.speed.isMax()) {
            this.actionQueue.push([this.fighterA, this.fighterB]);
        }

        if (this.fighterB.stats.speed.isMax()) {
            if (this.actionQueue.length > 0 && (this.fighterA.stats.speed.max() - fasg) < (this.fighterB.stats.speed.max() - fbsg)) {
                this.actionQueue.push([this.fighterB, this.fighterA]);
            } else {
                this.actionQueue.unshift([this.fighterB, this.fighterA]);
            }
        }

        if (this.actionQueue.length) {
            var len = this.actionQueue.length;
            while (len-- && this.active) {
                this.actionQueue[len][0].doAction(this.actionQueue[len][1]);
                this.actionQueue[len][0].stats.speed.baseValue(0);
                this.actionQueue.pop();
            }
        }
    };

    Battle.prototype.end = function () {
        this.active = false;
        return true;
    };


    Battle.prototype.render = function (player, enemy) {
        
    };

    Battle.prototype.start = function (fighterA, fighterB, conditions) {
        this.clear();
        if (!fighterA || !fighterB) return false;
        this.fighterA = fighterA;
        this.fighterB = fighterB;
        this.Game.global.events.trigger('system:battle:start', this);
        this.active = true;
        fighterA.stats.speed.baseValue(0);
        fighterB.stats.speed.baseValue(0);
        this.update();
        this.Game.global.events.once("system:character:death", this.end,this);
        return this.active;
    };

    Battle.prototype.clear = function () {
        this.actionQueue = [];
        this.allCharacters = [];
    };
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Battle;
        root.Battle = Battle;
    } else {
        root.Battle = Battle;
    }
}());