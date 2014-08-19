define(["./Actor"], function (Actor) {

    var Explosion = function () {
        Actor.apply(this, arguments);
        this.setClass('explosion');
        this.role = Actor.NEUTRAL;
        this.width = 13;
        this.height = 216;
        this.deltaLeft = 0;
        this.deltaTop = 10;
        this.life = 100;

    };

    Explosion.prototype = new Actor();
    Explosion.prototype.tick = function(dt){
      Actor.prototype.tick.apply(this, arguments);
      this.hit(0.1*dt);
      this.setClass('explosion a' + (10 - Math.round((this.life / 100) * 9)));
    };
    return Explosion;
});
