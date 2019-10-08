const Game = require('./../../logic/game');
const uID = require('./../../logic/uID');
const Vector = require('./../vector');
const Tickable = require('./../../logic/tickable');

let Collideable = Game.newGroup({
  name: 'collideable',
  constructor: function(){
    //Colliders need a collideable
    if(this.collider === undefined){
      throw new Error('collider need to be set before you apply Collideable');
    }

    //Create a id for the collideable
    if(this.id === undefined){
      uID.getID()
      .then((id) => {
        this.id = id;
      });
    }

    //Set defualt position
    if(this.position === undefined){
      this.position = new Vector();
    }

    this.collided = false;
    //Function that will be ran every tick
    let tick = (delta, i, group) => {
      //Make sure that we are actualy using collision information before we calculate it
      if(this.collisionWhile || this.collisionStart || this.collisionEnd || this.collisionNot){
        //Get the bounding box at the current position
        let bounds = this.collider.apply(this.position);
        //Loop through all collideables and if we hit it then set collided to true and jump to end of loop
        let collision = false;
        for(let i = group.objects.length - 1; i >= 0; i--){
          let collideable = group.objects[i];
          //Filter out collideables that match out id and that don't match the filter if one is set
          if(this.id === collideable.id || (this.collisionFilter !== undefined && !this.collisionFilter(collideable))){
            continue;
          }
          //Test the collition
          if(collideable.collider.apply(collideable.position).testCollision(bounds)){
            collision = true;
            break;
          }
        }
        //If we collided then run things for that
        if(collision){
          if(this.collisionWhile !== undefined){
            this.collisionWhile.bind(this)();
          }
          //If we just started colliding run things for that
          if(this.collisionStart !== undefined && !this.collided){
            this.collisionStart.bind(this)();
          }
          this.collided = true;
        }
        //If we where collideing but not any more then run things for that
        else if(this.collided){
          if(this.collisionNot !== undefined){
            this.collisionNot.bind(this)();
          }
          //If we just endded collitions run things for that
          if(this.collisionEnd !== undefined){
            this.collisionEnd.bind(this)();
          }
          this.collided = false;
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
