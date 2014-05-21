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
        this.ui = {};
        this.init();
    }
    Battle.version = "0.0.1";
    Battle.prototype.init = function () {
        this.Game.global.events.trigger('battle:systemInit');
        //this.initUi();
    };
    Battle.prototype.initUi = function () {
        this.ui.player = {};
        var base = this.ui.player.playerBase = $("#player-battle-stats");
        this.ui.player.stats = {
            health: {
                $name: base.find(".health .name"),
                $value: base.find(".health .value")
            },
            mana: {
                $name: base.find(".mana .name"),
                $value: base.find(".mana .value")
            },
            str: {
                $name: base.find(".str .name"),
                $value: base.find(".str .value")
            },
            dex: {
                $name: base.find(".dex .name"),
                $value: base.find(".dex .value")
            },
            int: {
                $name: base.find(".int .name"),
                $value: base.find(".int .value")
            },
            speed: {
                $name: base.find(".speed .name"),
                $value: base.find(".speed .value")
            },
            armor: {
                $name: base.find(".armor .name"),
                $value: base.find(".armor .value")
            },
            magicRes: {
                $name: base.find(".magic-res .name"),
                $value: base.find(".magic-res .value")
            },
            fireRes: {
                $name: base.find(".fire-res .name"),
                $value: base.find(".fire-res .value")
            },
            iceRes: {
                $name: base.find(".ice-res .name"),
                $value: base.find(".ice-res .value")
            },
            waterRes: {
                $name: base.find(".water-res .name"),
                $value: base.find(".water-res .value")
            },
            elecRes: {
                $name: base.find(".elec-res .name"),
                $value: base.find(".elec-res .value")
            },
            earthRes: {
                $name: base.find(".earth-res .name"),
                $value: base.find(".earth-res .value")
            },
            windRes: {
                $name: base.find(".wind-res .name"),
                $value: base.find(".wind-res .value")
            },
            lightRes: {
                $name: base.find(".light-res .name"),
                $value: base.find(".light-res .value")
            },
            darkRes: {
                $name: base.find(".dark-res .name"),
                $value: base.find(".dark-res .value")
            }
        };
        this.ui.enemy = {};
        base = this.ui.enemy.base = $("#enemy-battle-stats");
        this.ui.enemy.stats = {
            health: {
                $name: base.find(".health .name"),
                $value: base.find(".health .value")
            },
            mana: {
                $name: base.find(".mana .name"),
                $value: base.find(".mana .value")
            },
            str: {
                $name: base.find(".str .name"),
                $value: base.find(".str .value")
            },
            dex: {
                $name: base.find(".dex .name"),
                $value: base.find(".dex .value")
            },
            int: {
                $name: base.find(".int .name"),
                $value: base.find(".int .value")
            },
            speed: {
                $name: base.find(".speed .name"),
                $value: base.find(".speed .value")
            },
            armor: {
                $name: base.find(".armor .name"),
                $value: base.find(".armor .value")
            },
            magicRes: {
                $name: base.find(".magic-res .name"),
                $value: base.find(".magic-res .value")
            },
            fireRes: {
                $name: base.find(".fire-res .name"),
                $value: base.find(".fire-res .value")
            },
            iceRes: {
                $name: base.find(".ice-res .name"),
                $value: base.find(".ice-res .value")
            },
            waterRes: {
                $name: base.find(".water-res .name"),
                $value: base.find(".water-res .value")
            },
            elecRes: {
                $name: base.find(".elec-res .name"),
                $value: base.find(".elec-res .value")
            },
            earthRes: {
                $name: base.find(".earth-res .name"),
                $value: base.find(".earth-res .value")
            },
            windRes: {
                $name: base.find(".wind-res .name"),
                $value: base.find(".wind-res .value")
            },
            lightRes: {
                $name: base.find(".light-res .name"),
                $value: base.find(".light-res .value")
            },
            darkRes: {
                $name: base.find(".dark-res .name"),
                $value: base.find(".dark-res .value")
            }
        };
        base = null;
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
        player = player || this.fighterA;
        enemy = enemy || this.fighterB;
        console.log(player);
        if (player) {
            this.ui.player.stats.health.$value.text(player.getStat('health', 'current'));
        }
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