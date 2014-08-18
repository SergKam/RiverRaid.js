require(["game/Game"], function (Game) {

        console.log('start');
        var canvas = document.getElementById("canvas");
        var game = new Game(canvas);
        game.run();

});
