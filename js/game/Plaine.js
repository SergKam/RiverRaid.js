define(["./Actor", "./Rocket", "./utils"], function (Actor, Rocket, utils) {
        var Plaine = function (game) {
            Actor.apply(this, arguments);
            this.setClass('plain');
            this.role = Actor.FRIEND;
            this.left = 400;
            this.top = 400;
            this.width = 200;
            this.height = 200;
            this.deltaLeft = 0;
            this.deltaTop = 0;
            this.life = 100;
            this.damage = 100;
            this.fired = 0;
        };


        Plaine.prototype = new Actor();
        utils.mix(Plaine.prototype, {
                goLeft: function () {
                    this.deltaLeft = -300;
                },
                goRight: function () {
                    this.deltaLeft = 300;
                },
                goUp: function () {
                    this.deltaTop = -300;
                },
                goDown: function () {
                    this.deltaTop = 300;
                },
                stopLeft: function () {
                    this.deltaLeft = 0;
                },

                stopTop: function () {
                    this.deltaTop = 0;
                },
                fire: function () {
                    var time = this.game.lastTime;

                    if (time - this.fired < 500) {
                        return;
                    }

                    this.fired = time;
                    var weapon = new Rocket(this.game);
                    this.fireLeft = !this.fireLeft;
                    weapon.left = this.left + 65 + 60 * this.fireLeft;
                    weapon.top = this.top;

                    this.game.addActor(weapon);
                },

                stopFire: function () {

                },

                tick: function (dt) {


                    var newLeft = this.left + this.deltaLeft * (dt / 1000);
                    var newTop = this.top + this.deltaTop * (dt / 1000);
                    if (newLeft < 0 ||
                        newLeft + this.width > this.game.width
                    ) {
                        this.stopLeft();
                    }

                    if (newTop < 0 || newTop + this.height > this.game.height) {
                        this.stopTop();
                    }

                    if (this.deltaLeft < 0) {
                        this.setClass('plaine left');
                    } else {
                        if (this.deltaLeft > 0) {
                            this.setClass('plaine right');
                        } else {
                            this.setClass('plaine');
                        }
                    }

                    Actor.prototype.tick.apply(this, arguments);

                },
                hit: function (points) {
                    Actor.prototype.hit.apply(this, arguments);
                    this.el.style.zIndex = 0;
                    this.setClass('plain bad' + (9 - Math.round((this.life / 100) * 9)));
                },

                die: function () {
                    alert('Game Over!');
                    window.location.reload();
                }
            }
        );
        return Plaine;
    }
);
