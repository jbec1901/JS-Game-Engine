let Animatable = require('./../IO/animatable');
let Collideable = require('./collision/collideable');
let Vector = require('./vector');

//Entity dosn't need to have its own group so it dosn't need to be added as a group and only implemnet them
function Entity(){
  //Entitys will have a defualt position and velocity of 0,0
  if(this.position === undefined){
    this.position = new Vector();
  }
  if(this.velocity === undefined){
    this.velocity = new Vector();
  }

  //On ticks we want to add velocity to the position
  let tick = (delta) => {
    this.position.join(this.velocity);
  }

  //If we dont have a tick function already set then just use this on as the tick
  if(this.tick === undefined){
    this.tick = tick;
  }
  else {
    //If we have a pre set tick then combine them into a new function
    const tmp = this.tick;
    this.tick = (...args) => {
      tmp.bind(this)(...args);
      tick.bind(this)(...args);
    }
  }

  //Entitys are animatable and collideable
  Animatable.call(this);
  Collideable.call(this);
}

module.exports = Entity;
