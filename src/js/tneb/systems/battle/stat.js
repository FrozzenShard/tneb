(function(){
    var root = this;
    var _ = require('underscore');
    function Stat(name,val,max,min){
        if(!(this instanceof Stat)) return new Stat(name,val,max,min); // Thanks jarofghosts
        this.modifiers = [];
        this.afterModifiers = [];
        this._baseValue = val || 0;
        if(max != null) this._max = max;
        if(min != null) this._min = min;
    }
    
    Stat.prototype.increase = function(val){
        this._baseValue += val;
        this.clamp();
        return this._baseValue;
    };
    
    Stat.prototype.decrease = function(val){
        this._baseValue -= val;
        this.clamp();
        return this._baseValue;
    };
    
    Stat.prototype.change = function(val){
        return val > 0 ? this.increase(val) : this.decrease(-val);
    };
    
    Stat.prototype.baseValue = function(val,set){
        if(set) this._baseValue = val;
        else if(val !== undefined) this._baseValue += val;
        this.clamp();
        return this._baseValue;
    };
    
    Stat.prototype.max = function(val,set){
        if(arguments.length === 0) return this._max;
        if(set || this._max === undefined) this._max = val;
        else if(val) this._max += val;
        this.clamp();
        return this._max;
    };
    
    Stat.prototype.isMax = function(val){
        return this._max != null ? (this._baseValue === this._max) : false;
    };
    
    Stat.prototype.min = function(val,set){
        if(arguments.length === 0) return this._min;
        if(set || this._min === undefined) this._min = val;
        else if(val) this._min += val;
        this.clamp();
        return this._min;
    };
    
    Stat.prototype.isMin = function(val){
        return this._min != null ? (this._baseValue === this._min) : false;
    };
    
    Stat.prototype.clamp = function(){
        if( this._max != null && this._baseValue > this._max) this._baseValue = this._max;
        if(this._min != null && this._baseValue < this._min) this._baseValue = this._min;
    };
    
    Stat.prototype.isGreaterThan = function(stat,useTotal){
        if(useTotal){
            return this.getTotal() > stat.getTotal();
        }
        return this._baseValue > stat._baseValue;
    };
    
    Stat.prototype.isLessThan = function(stat,useTotal){
        if(useTotal){
            return this.getTotal() < stat.getTotal();
        }
        return this._baseValue < stat._baseValue;
    };
    
    Stat.prototype.isEqualTo = function(stat,fuzzy,useTotal){
        if(useTotal){
            return fuzzy ? Math.floor(this.getTotal()) === Math.floor(stat.getTotal()) : this.getTotal() === stat.getTotal();
        }
        return fuzzy ? Math.floor(this._baseValue) ===  Math.floor(stat._baseValue) : this._baseValue === stat._baseValue;
    };
    
    Stat.prototype.add = function(stat, useTotal){
        if(useTotal) return this.getTotal() + stat.getTotal();
        return this.baseValue() + stat.baseValue();
    };
    
    Stat.prototype.subtract = function(stat, useTotal){
        if(useTotal) return this.getTotal() - stat.getTotal();
        return this.baseValue() - stat.baseValue();
    };
    
    Stat.prototype.multiply = function(stat, useTotal){
        if(useTotal) return this.getTotal() * stat.getTotal();
        return this.baseValue() * stat.baseValue();
    };
    
    Stat.prototype.divide = function(stat, useTotal){
        var st;
        if(useTotal) {
            st = stat.getTotal();
            return this.getTotal() / (st > 0 ? st : 1 );
        }
        st = stat.baseValue();
        return this.baseValue() / (st > 0 ? st : 1 );
    };
    
    /*
    * Add a modifier with a Flat or Percent Value value
    * @param {String} type The type of modifier, flat or percentage
    * @param {number|function} [value] Value to add. If its a function it will passed the stat object and owner. Functions are always calculated last
    * @param {boolean} [before] Add the value after the main calculations. Default runs with the main calculations
    * @return {object} The modifer object. Set destroy value when want to remove
    */
    Stat.prototype.addModifer = function(type,value,after){
        var m = {
            type : type,
            value : value,
            after : after || false,
            destroy : false
        };
        if(_.isFunction(value) || after){
            this.modifiers.unshift(m);
            if(after) this.afterModifiers.push(after);
        }else{
            this.modifiers.push(m);
        }
        return m;
    };
    
    Stat.prototype.getTotal = function(){
        var i,
            after = [],
            perValues = 0,
            t,
            lv = 0,
            len,
            totals = {
                flatTotal : 0,
                totalAfterFlat : 0,
                percentTotal : 0,
                totalAfterPercent : 0,
                total : 0
            };
        len = this.modifiers.length;
        while(len--){
            t = this.modifiers[len];
            if(!t.destroy){
                if(!t.after){
                    if(_.isFunction(t.value)){
                        totals[t.type+"Total"] += t.value(this);
                    }else{
                        totals[t.type+"Total"] += t.value;
                    }
                }else{
                    after.push(t);
                }
            }else{
                this.modifiers.splice(len,1);
            }
        }
        if(after.length > 0){
            for(i = 0; i < after.length; i++){
                t = after[i];
                t.value(this,totals);
            }
        }
        totals.total += this._baseValue + totals.flatTotal;
        totals.total += totals.total * (totals.percentTotal * 0.01);
        if(this._min && totals.total < this._min){
            totals.total = this._min;
        }else if(this._max && totals.total > this._max){
            totals.total = this._max;
        }
        return totals.total;
    };
    if(typeof module !== 'undefined' && module.exports){
        module.exports = Stat;
        root.Stat = Stat;
    }else{
        root.Stat = Stat;
    }
    
}());