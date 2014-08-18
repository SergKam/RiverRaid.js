define(["./Actor","./Plain", "./Enemy","./Background"], function (Actor, Plain, Enemy, Background) {
    var Game = function (canvas) {
        this.canvas = canvas;
        this.updateSize();

        this.actorList = [];
        this.plain = new Plain(this);
        this.addActor(this.plain);
        this.addActor(new Background(this.canvas));
        for (var i = 0; i < 30; i++) {
            var enemy = new Enemy(this);
            enemy.deltaTop = 300 * Math.random();
            enemy.deltaLeft= 50-100 * Math.random();

            enemy.left = Math.round(1000 * Math.random());
            enemy.top = -Math.round(10000 * Math.random());
            this.addActor(enemy);

        }

    };

    Game.prototype = {
        addActor: function (actor) {
            this.actorList.push(actor);
        },
        removeActor: function (actor) {
            var index = this.actorList.indexOf(actor);
            if (index === -1) {
                return false;
            }
            this.actorList.splice(index, 1);
            return true;
        },
        eachActor: function (fn, role) {
            var self = this;
            this.actorList.forEach(function (actor) {
                if (role === undefined || role === actor.role) {
                    fn.call(self, actor);
                }
            });
        },
        run: function () {
            this.addKeys();
            this.tick();
        },
        updateSize: function () {
            this.left = 0;
            this.top = 0;
            this.width = parseInt(window.innerWidth, 10)-20;
            this.canvas.style.width = this.width + "px";

            this.height = parseInt(window.innerHeight, 10)-20;
            this.canvas.style.height = this.height + "px";
        },

        tick: function (time) {

            var dt = (time - this.lastTime) || 1;
            this.lastTime = +time;

            this.eachActor(function (actor) {
                actor.tick(dt);
            });

            this.checkCollisions();

            requestAnimationFrame(this.tick.bind(this), this.canvas);

        },
        checkCollisions: function () {
            var self = this;
            self.eachActor(function (good) {
                self.eachActor(function (bad) {
                    if (good.isOverlapped(bad)) {
                        good.hit(bad.damage);
                        bad.hit(good.damage);
                    }
                }, Actor.ENEMY);
            }, Actor.FRIEND);

        },
        addKeys: function () {

            document.addEventListener("keydown", function (event) {
                //  console.log(event);
                //left
                if (event.keyCode === 37) {
                    this.plain.goLeft();
                }
                //right
                if (event.keyCode === 39) {
                    this.plain.goRight();
                }
                //up
                if (event.keyCode === 38) {
                    this.plain.goUp();
                }
                //down
                if (event.keyCode === 40) {
                    this.plain.goDown();
                }
                //space
                if (event.keyCode === 32) {
                    this.plain.fire();

                }


                return false;
            }.bind(this));

            document.addEventListener("keyup", function (event) {
                //console.log(event);
                //left
                if (event.keyCode === 37) {
                    this.plain.stopLeft();
                }
                //right
                if (event.keyCode === 39) {
                    this.plain.stopLeft();
                }
                //up
                if (event.keyCode === 38) {
                    this.plain.stopTop();
                }
                //down
                if (event.keyCode === 40) {
                    this.plain.stopTop();
                }
                //space
                if (event.keyCode === 32) {
                    this.plain.stopFire();
                }
                return false;

            }.bind(this))

        }
    };

    return Game;
});
