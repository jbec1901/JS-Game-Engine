const Renderable = require('./renderable');
const Tickable = require('./../logic/tickable');

function Particle(){
  if(this.position === undefined){
    this.position = new Vector();
  }

  if(this.velocity === undefined){
    this.velocity = new Vector();
  }

  if(this.color === undefined){
    this.color = '#000';
  }
  if(this.size === undefined){
    this.size = 2;
  }

  if(this.lifeSpan === undefined){
    this.lifeSpan = 100;
  }

  let tick = (delta) => {
    this.lifeSpan -= delta;
    if(this.lifeSpan <= 0){
      this.exist = false;
    }
    else{
      this.position.join(this.velocity);
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

  this.render = (ctx) => {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
  }

  Renderable.call(this);
  Tickable.call(this);
};

module.exports = Particle;
