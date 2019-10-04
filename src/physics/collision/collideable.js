const Game = require('./../../logic/game');
const uID = require('./../../logic/uID');
const Vector = require('./../vector');
const Tickable = require('./../../logic/tickable');

function Collideable(){
  if(this.collider === undefined){
    throw new Error('this.collider need to be set before you apply Collideable');
  }

  if(this.id === undefined){
    uID.getID()
    .then((id) => {
      this.id = id;
    });
  }

  if(this.position === undefined){
    this.position = new Vector();
  }

  if(this.collider === undefined){
    this.collider = collider;
  }

  if(this.triggers === undefined){
    this.triggers = {};
  }
  if(this.triggers.collision === undefined){
    this.triggers.collision = {};
  }

  if(this.collided === undefined){
    this.collided = false;
  }

  let tick = () => {
    if(this.collisionWhile || this.collisionStart || this.collisionEnd || this.collisionNot){
      let collision = Game.testCollision(this, this.collisionFilter);
      if(collision){
        if(this.collisionWhile !== undefined){
          this.collisionWhile.bind(this)();
        }
        if(this.collisionStart !== undefined && !this.collided){
          this.collisionStart.bind(this)();
        }
        this.collided = true;
      }
      else if(this.collided){
        if(this.collisionEnd !== undefined){
          this.collisionEnd.bind(this)();
        }
        this.collided = false;
      }
      else if(this.collisionNot !== undefined){
        this.collisionNot.bind(this)();
      }
    }
  }

  if(this.tick === undefined){
    this.tick = tick;
  }
  else {
    const tmp = this.tick;
    this.tick = (delta) => {
      tmp.bind(this)(delta);
      tick.bind(this)(delta);
    }
  }
  Game.collideables.push(this);

  Tickable.apply(this);
}

module.exports = Collideable;
