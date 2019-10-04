let Animatable = require('./../IO/animatable');
let Collideable = require('./collision/collideable');
let Vector = require('./vector');

function Entity(){
  if(this.position === undefined){
    this.position = new Vector();
  }

  if(this.velocity === undefined){
    this.velocity = new Vector();
  }

  let tick = (delta) => {
    this.position.join(this.velocity);
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

  Animatable.call(this);
  Collideable.call(this);
}

module.exports = Entity;
