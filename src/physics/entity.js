const Vector = require('./vector');

class Entity {
  constructor(spriteSheet, bounds, tick){
    this.spriteSheet = spriteSheet;
    this.bounds = bounds;
    this.tick = tick;
  }

  createInstence(location){
    let instence = new Instence(this, location);
  }
}

class Instence {
  constructor(parent, location = new Vector()){
    this.parent = parent;

    this.location = location;

    this.animation = 0;
    this.frame = 0;

    this.exist = true;
  }

  draw(ctx, scale){
    this.parent.spriteSheet.drawImage(ctx, animation, frame, location, scale);
  }

  tick(){
    this.parent.tick.bind(this)();
  }

  getBounds(){
    return this.parent.bounds.apply(this.location);
  }
}

module.exports = Entity;
