define(["./Actor"], function (Actor) {

    var Cloud = function () {
        Actor.apply(this, arguments);
        this.setClass('cloud1');
        this.role = 0;
        this.width = 13;
        this.height = 216;
        this.deltaLeft = 0;
        this.deltaTop = 10;
        this.life = 100;

    };

    Cloud.prototype = new Actor();
    Cloud.prototype.tick = function(dt){
      Actor.prototype.tick.apply(this, arguments);
      this.el.style.opacity = this.life/100;
      this.hit(0.1*dt);

    };
    return Cloud;
});
