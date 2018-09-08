var Entity = function(startPosition,graphics,collision){
  this.pos = startPosition;

  this.graphics = graphics;

  this.collision = collision;

  this.draw = function(ctx){
    this.graphics.draw(ctx,this.pos);
  }

  this.tick = function(time){

  }
}
