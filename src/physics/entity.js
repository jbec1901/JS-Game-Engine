const Vector = require('./vector');
const uID = require('./../logic/uID');

let entityTypes = [];
let entitys = [];

//Default Game
const Game = new (require('./../logic/game'))(0, 60);

//Default Renderer
Game.renderer.newLayer(function(){
  this.clear();
  mapEntitys((entity) => {
    entity.draw(this.ctx);
  });
});
//Default game loop
Game.start((delta) => {
  mapEntitys((entity) => {
    entity.tick(delta);
  });
});

//Default collision space
const collisionSpace = new (require('./collision/pool'))();

function mapEntitys(callback){
  entityTypes.map((type) => {
    for(let i = type.instences.length - 1; i >= 0; i--){
      let entity = type.instences[i];
      if(!entity.exist){
        type.instences.splice(i);
        return;
      }
      callback(entity, type.id);
    }
  })
}

class Entity {
  constructor(spriteSheet, bounds, tick, options = {
    default: true
  }){
    this.spriteSheet = spriteSheet;
    this.bounds = bounds;
    
    this.tick = tick;

    this.instences = [];

    this.options = options;
    if(this.options !== undefined){
      if(this.options.default === true){
        entityTypes.push(this);
      }
    }

    uID.getID()
    .then((id) => {
      this.id = id;
    });
  }

  createInstence(location){
    let instence = new Instence(this, location);
    this.instences.push(instence);
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

  tick(delta){
    this.parent.tick.bind(this)(delta);
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
