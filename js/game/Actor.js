define( function () {
    var Actor = function (game) {
        this.game = game;
        this.el = document.createElement("div");
        this.el.className = "enemy";
        if (game) {
            this.game.canvas.appendChild(this.el);
        }
        this.role = Actor.NEUTRAL;
        this.left = 100;
        this.top = -100;
        this.width = 150;
        this.height = 100;
        this.deltaLeft = 0;
        this.deltaTop = 1;
        this.life = 100;
        this.damage = 1000;

    };
    Actor.prototype = {

        destroy: function () {
            if(this.el.parentNode) {
                this.el.parentNode.removeChild(this.el);
            }
            this.game.removeActor(this);
        },
        setClass: function (cls) {
            this.el.className = cls;
        },

        tick: function (dt) {

            this.left += this.deltaLeft * (dt / 1000);
            this.top += this.deltaTop * (dt / 1000);
            this.move(this.left, this.top);
        },
        move: function(left, top) {
            this.el.style.left = left + 'px';
            this.el.style.top =  top + 'px';
        },

        isOverlapped: function (target) {
            if (this.top > target.top + target.height) {
                return false;
            }
            if (this.top + this.height < target.top) {
                return false;
            }
            if (this.left > target.left + target.width) {
                return false;
            }
            if (this.left + this.width < target.left) {
                return false;
            }

            return true;
        },
        hit: function (points) {
            this.life -= points;
            if (this.life <= 0) {
                this.die();
            }

        },
        die: function () {
            this.destroy();
        }


    };

    Actor.NEUTRAL = 0;
    Actor.FRIEND = 1;
    Actor.ENEMY = -1;


    return Actor;
});
