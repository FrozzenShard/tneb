(function(){
    var Mocks = {};
    Mocks.noop = function(){};
    
    Mocks.GameMock = function(){
        var game = {};
        
        game.systems = {};
        game.timer = {
            elapsed : 1,
            lastTime : 1
        };
        game.global = {
            _ : Mocks.noop,
            backbone : Mocks.noop,
            modApi : Mocks.noop,
            events : {
                trigger : Mocks.noop,
                on : Mocks.noop,
                off : Mocks.noop,
                once : Mocks.noop
            },
            version : "0"
        };
        game.init = Mocks.noop;
        game.activePlayer = {};
        game.loop = Mocks.noop;
        game.update = Mocks.noop;
        return game;
    };
    
    module.exports = Mocks;
}());