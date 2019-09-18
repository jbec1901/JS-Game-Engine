const Vector = require('./vector');
const uID = require('./../logic/uID');

let entityTypes = [];
let entitys = [];

//Default Game
const Game = new (require('./../logic/game'))(30, 60);
//Default Renderer
Game.renderer.newLayer(function(){
  this.clear();
  entitys.map((entity) => {
    entity.draw(this.ctx);
  });
});
Game.start(() => {
  entitys.map((entity) => {
    entity.tick();
  });
});
//Default collision space
const collisionSpace = new (require('./collision/pool'))();

class Entity {
  constructor(spriteSheet, bounds, tick, options = {
    default: true
  }){
    this.spriteSheet = spriteSheet;
    this.bounds = bounds;
    this.tick = tick;

    this.options = options;
    if(this.options !== undefined){
      if(this.options.default === true){
        entityTypes.push(this);
      }
    }
  }

  createInstence(location){
    let instence = new Instence(this, location);
    return instence;
  }
}

class Instence {
  constructor(parent, location = new Vector()){
    this.parent = parent;
    this.location = location;

    this.animation = 0;
    this.frame = 0;

    this.exist = true;

    if(this.parent.options !== undefined){
      if(this.parent.options.default === true){
        entitys.push(this);
      }
      if(this.parent.options.vars !== undefined){
        for(let i in this.parent.options.vars){
          this[i] = this.parent.options.vars[i];
        }
      }
    }

    uID.getID()
    .then((id) => {
      this.id = id;
    });
  }

  draw(ctx, scale){
    this.parent.spriteSheet.drawImage(ctx, this.animation, this.frame, this.location);
  }

  tick(){
    this.parent.tick.bind(this)();
  }

  getBounds(){
    return this.parent.bounds.apply(this.location);
  }

  destroy(){
    uID.freeID(this.id);
    this.exists = false;
    this.id = undefined;
  }
}

module.exports = Entity;
