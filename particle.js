function Particle(x, y) {
    this.pos = createVector(random(width) * random(-2,3), random(height) * random(-2,3));
    this.target = createVector(x, y);
    this.vel = p5.Vector.random2D(238);//createVector();
    this.acc = createVector();
    this.r = 8;
    this.maxspeed = 8;
    this.maxforce = 0.8;
}

Particle.prototype.behave = function() {
    let arrive = this.arrive(this.target);    
    let mouse = createVector(mouseX, mouseY);
    let flee = this.flee(mouse);

    arrive.mult(2.2);
    flee.mult(15);

    this.applyForce(arrive);
    this.applyForce(flee);
}

Particle.prototype.applyForce = function(f) {
    this.acc.add(f);
}

Particle.prototype.update = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
}

Particle.prototype.show = function() {
    stroke(238,8,20);
    strokeWeight(8);
    point(this.pos.x, this.pos.y);
}

Particle.prototype.arrive = function(target) {
    let desired = p5.Vector.sub(target, this.pos);
    let d = desired.mag();
    let speed = this.maxspeed;
    if (d < 100) {
        speed = map(d, 0, 100, 0, this.maxspeed);
    } 
    desired.setMag(speed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
}

Particle.prototype.flee = function(target) {
    let desired = p5.Vector.sub(target, this.pos);
    let d  = desired.mag();
    if (d < 70) {
        desired.setMag(this.maxspeed);
        desired.mult(-1);
        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxforce);
        return steer;
    } else {
        return createVector(0, 0);
    }
    
}