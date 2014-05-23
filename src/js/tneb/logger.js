(function(){
    var root = this;
    var $ = require('jQuery');
    var GameLogger = {};
    var el;
    GameLogger.displayList = [];
    GameLogger.currentMessages = [];
    GameLogger.fullLog = [];
    GameLogger.el = $("#logger");
    GameLogger.maxMessages = 3;
    el = GameLogger.el;
    GameLogger.log = function(type,message){
        var curTime = Date.now(),
            len;
        this.fullLog.push({message : message, timestamp : curTime, type : type});
        this.currentMessages.push({message : message, timestamp : curTime, type : type});
        if(this.currentMessages.length > this.maxMessages){
            this.currentMessages.splice(0,1);
            console.log(this.currentMessages.length,this.currentMessages);
        }
        len = this.currentMessages.length;
        while(len--){
            this.displayList[len].innerHTML = this.currentMessages[len].message;
        }
    };
    for(var i = 0; i < GameLogger.maxMessages; i++){
        var p = document.createElement('p');
        GameLogger.displayList.push(p);
        el.append(p);
    }
    
    if(typeof module !== 'undefined' && module.exports){
        module.exports = GameLogger;
    }
    root.GameLogger = GameLogger;
}());