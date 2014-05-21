(function(){
    var utils = require('tneb/utils.js');
    var counts = [0,0,0,0,0];
    for(var i = 0; i < 10000; i++){
        counts[utils.weightedRandom([4,2,2,1,3])]++;
    }
}());