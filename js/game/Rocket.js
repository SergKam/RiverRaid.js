define(["./Actor"], function (Actor) {

    var Rocket = function (game) {
        Actor.apply(this, arguments);
        this.setClass('rocket');
        this.role = Actor.FRIEND;
        this.width = 13;
        this.height = 216;
        this.deltaLeft = 0;
        this.deltaTop = -200;
        this.life = 1;
        this.damage = 100;
        this.animation = 0;
    };

    Rocket.prototype = new Actor();

    Rocket.prototype.tick = function (dt) {
        Actor.prototype.tick.apply(this, arguments);
        this.animation = +!this.animation;
        this.setClass('rocket' + (this.animation ? ' a1' : ''));
        if(this.top+this.height< this.game.top){
            this.destroy();
        }
    };

    return Rocket;
});
