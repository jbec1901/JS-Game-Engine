const Game = require('./../logic/game');
const Renderable = require('./renderable');

let Animatable = Game.newGroup({
  name: 'animatable',
  constructor: function(){
    this.animation = 0;
    this.frame = 0;

    //If a custom render was not passed then we are just going to animate based on the spriteSheet
    if(this.render === undefined){
      //If need to have a spriteSheet for default aniamtion
      if(this.spriteSheet === undefined){
        throw new Error('Animatables must have a sprite sheet defiend')
      }

      //Set the render method to draw the target sprite
      this.render = (ctx) => {
        this.spriteSheet.draw(ctx, this.frame, this.animation, this.position);
      }

      //Create the animator
      this.animate = () => {
        this.frame++;
        if(this.frame >= this.spriteSheet.columns){
          this.frame = 0;
        }
      }
    }
    else {
      //If we are using a custom render function then we need to tell the animator how many frames we want to use
      if(this.frames === undefined){
        throw new Error('animation frames must be defined for custom renders');
      }

      //Loop through the frames 1 by 1
      this.animate = () => {
        this.frame++;
        if(this.frame >= this.frames){
          this.frame = 0;
        }
      }
    }

    //Animatables are also renderables
    Renderable.apply(this);
  },
  //Run the animation
  each: function(...args){
    this.animate(...args);
  },
  //Default aniamtion speed is 5 per second
  tps: 5,
});

module.exports = Animatable;
