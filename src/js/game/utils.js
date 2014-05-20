(function(){
    var _ = require('underscore');
    var utils = {};
    var root = this;
    utils.objOverride = function(to,from,check){
        _.each(from,function(v,k){
            if(check && from[k]){
                if(_.isObject(from[k]) || _.isArray(from[k]) ){
                    utils.objOverride(to[k],from[k],check);
                }else{
                    to[k] = v;
                }
            }else{
                if(_.isObject(from[k]) || _.isArray(from[k])){
                    utils.objOverride(to[k],from[k],check);
                }else{
                    to[k] = v;
                }
            }
        });
        return to;
    };
    //http://codetheory.in/weighted-biased-random-number-generation-with-javascript-based-on-probability/
    utils.weightedRandom = function(weights){
        var totalWeight = weights.reduce(function(prev,cur){
            return prev + cur;
        });
        var rand = _.random(0,totalWeight);
        var weightSum = 0;
        for(var i = 0; i < weights.length; i++){
            weightSum += weights[i];
            weightSum = +weightSum;
            if(rand <= weightSum){
                return i;
            }
        }
    };

    if(typeof module !== 'undefined' && module.exports){
        module.exports = utils;
        root.utils = utils;
    }else{
        root.utils = utils;
    }
}());