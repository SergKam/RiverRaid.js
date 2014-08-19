define(["./Actor", "./Explosion"], function (Actor, Explosion) {

    var Enemy = function () {
        Actor.apply(this, arguments);
        this.role = Actor.ENEMY;
        this.life = 1;
        this.damage = 10;
        this.angle = 0;
    };

    Enemy.prototype = new Actor();

    Enemy.prototype.tick = function (dt) {
        Actor.prototype.tick.apply(this, arguments);

        if (this.top > this.game.height) {
            this.destroy();
        }
    };
    Enemy.prototype.die = function () {
        this.role = Actor.NEUTRAL;
        this.setClass('enemy dying');
        setTimeout(this.destroy.bind(this), 3000);
        var explosion = new Explosion(this.game);
        explosion.left = this.left - 20;
        explosion.top = this.top - 20;
        this.game.addActor(explosion);
    };


    return Enemy;
});
