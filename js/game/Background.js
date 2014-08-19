define(["./Actor"], function (Actor) {

    var Background = function (target) {
        this.el = target;
        this.role = Actor.NEUTRAL;
        this.speed = 10;// pixels/sec
        this.position = 0;
        this.height = 302;
    };

    Background.prototype.tick = function (dt) {
        var distance = this.speed * (dt / 1000);
        this.position = this.position + distance;
        if (this.position > this.height) {
            this.position = this.position - this.height;
        }
        //background-position-y
        this.el.style.backgroundPosition = "0 " + parseInt(this.position, 10) + "px";
    };
    return Background;
});
