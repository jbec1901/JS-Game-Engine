const Game = require('./../logic/game');
const Renderable = require('./renderable');

function Animatable(){
  if(this.spriteSheet === undefined){
    throw new Error('Animatables must have a sprite sheet defiend')
  }

  this.animation = 0;
  this.frame = 0;

  this.render = (ctx) => {
    this.spriteSheet.draw(ctx, this.frame, this.animation, this.position);
  }

  this.animate = () => {
    this.frame++;
    if(this.frame * this.spriteSheet.width >= this.spriteSheet.sheet.naturalWidth){
      this.frame = 0;
    }
  }

  Game.animatables.push(this);
  Renderable.apply(this);
};

module.exports = Animatable;
