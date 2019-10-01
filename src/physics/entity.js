const Vector = require('./vector');
const uID = require('./../logic/uID');

let entityTypes = [];
let entitys = [];

//Default Game
//Create the game
let Game = new (require('./../logic/game'))(0, 0);

class Entity {
  constructor({
    spriteSheet,
    bounds,
    tick = () => {},
    triggers = {},
    collisionSpace,
    vars = {}
  }){
    this.spriteSheet = spriteSheet;
    this.bounds = bounds;

    this.tick = tick;
    this.triggers = triggers;

    this.instences = [];

    this.vars = vars;

    Game.entityTypes.push(this);

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

    this.colliding = false;

    for(let i in this.parent.vars){
      this[i] = this.parent.vars[i];
    }

    uID.getID()
    .then((id) => {
      this.id = id;
      Game.collisionSpace.add(this);
    });
  }

  draw(ctx, scale){
    this.parent.spriteSheet.drawImage(ctx, this.animation, this.frame, this.location);
  }

  tick(delta){
    //If a collider is defiend then we need to do prossessing on it
    if(this.parent.triggers.collision || this.parent.triggers.collisionStart || this.parent.triggers.collisionWhile || this.parent.triggers.collisionEnd){
      let collision = Game.collisionSpace.testCollision(this);
      if(collision){
        if(this.parent.triggers.collision !== undefined){
          this.parent.triggers.collision.bind(this)();
        }
        if(!this.colliding && this.parent.triggers.collisionStart !== undefined){
          this.parent.triggers.collisionStart.bind(this)();
        }
        else if(this.parent.triggers.collisionWhile !== undefined){
          this.parent.triggers.collisionWhile.bind(this)();
        }
        this.colliding = true;
      }
      else if(this.colliding){
        if(this.parent.triggers.collisionEnd !== undefined){
          this.parent.triggers.collisionEnd.bind(this)();
        }
        this.colliding = false;
      }
      else if(this.parent.triggers.collisionNot !== undefined){
        this.parent.triggers.collisionNot.bind(this)();
      }
    }
    if(this.parent.triggers.collisionStart){
      this.parent.triggers.collisionStart.bind(this)();
    }
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

exports.Entity = Entity;
exports.Game = Game;
