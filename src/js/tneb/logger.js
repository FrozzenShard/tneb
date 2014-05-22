(function(){
    var root = this;
    var logger = {};
    
    if(typeof module !== 'undefined' && module.exports){
        module.exports = logger;
    }
    root.logger = logger;
}());