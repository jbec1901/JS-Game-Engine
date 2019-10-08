const Game = require('./../../logic/game');
const uID = require('./../../logic/uID');
const Vector = require('./../vector');
const Tickable = require('./../../logic/tickable');

let Collideable = Game.newGroup({
  name: 'collideable',
  constructor: function(){
    if(this.collider === undefined){
      throw new Error('collider need to be set before you apply Collideable');
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

    this.collided = false;

    let tick = (delta, i, group) => {
      if(this.collisionWhile || this.collisionStart || this.collisionEnd || this.collisionNot){
        let bounds = this.collider.apply(this.position);
        let collision = false;
        for(let i = group.objects.length - 1; i >= 0; i--){
          let collideable = group.objects[i];
          if(this.id === collideable.id || (this.collisionFilter !== undefined && !this.collisionFilter(collideable))){
            continue;
          }
          if(collideable.collider.apply(collideable.position).testCollision(bounds)){
            collision = true;
            break;
          }
        }
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
      this.tick = (...args) => {
        tmp.bind(this)(...args);
        tick.bind(this)(...args);
      }
    }

    Tickable.apply(this);
  },
});

module.exports = Collideable;
