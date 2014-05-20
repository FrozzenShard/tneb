(function(){
    var root = this;
    var config = {};
    config.battle = {
        armorMultiplier : 0.04,
        magicResMultiplier : 0.06,
        elementalResMultiplier : 0.015,
        maxSpeed : 100
    };
    
    if(typeof module !== 'undefined' && module.exports){
        module.exports = config;
        root.config = config;
    }else{
        root.config = config;
    }
}());