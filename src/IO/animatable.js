const Game = require('./../logic/game');
const Renderable = require('./renderable');

function Animatable(){
  this.animation = 0;
  this.frame = 0;

  if(this.render === undefined){
    if(this.spriteSheet === undefined){
      throw new Error('Animatables must have a sprite sheet defiend')
    }

    this.render = (ctx) => {
      this.spriteSheet.draw(ctx, this.frame, this.animation, this.position);
    }

    this.animate = () => {
      this.frame++;
      if(this.frame >= this.spriteSheet.columns){
        this.frame = 0;
      }
    }
  }
  else {
    if(this.frames === undefined){
      throw new Error('animation frames must be defined for custom renders');
    }

    this.animate = () => {
      this.frame++;
      if(this.frame >= this.frames){
        this.frame = 0;
      }
    }
  }

  Game.animatables.push(this);
  Renderable.apply(this);
};

module.exports = Animatable;
