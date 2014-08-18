define(["./Actor", "./Explosion"], function (Actor, Explosion) {

    var Enemy = function () {
        Actor.apply(this, arguments);
        this.role = Actor.ENEMY;
        this.life = 1;
        this.damage = 10;
    };

    Enemy.prototype = new Actor();

    Enemy.prototype.tick = function (dt) {
        Actor.prototype.tick.apply(this, arguments);

        if (this.top > this.game.height) {
            this.destroy();
        }
    };
    Enemy.prototype.die = function (dt) {
        Actor.prototype.die.apply(this, arguments);

        var cloud = new Explosion(this.game);
        cloud.left = this.left - 200;
        cloud.top = this.top - 100;
        this.game.addActor(cloud);
    };


    return Enemy;
});
