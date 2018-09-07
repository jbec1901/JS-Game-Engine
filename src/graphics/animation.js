var Animation = function(spriteSheet){

  this.sheet = spriteSheet;

  this.currentFrame = 0;
  this.targetAnimation = 0;

  ref = this;

  this.changeAnimation = function(targetAnimation,frameTime, lenth){
    this.currentFrame = 0;
    this.targetAnimation = targetAnimation;
    if(this.frameUpdater != undefined){
      clearInterval(this.frameUpdater);
    }
    function updateFrame(){
      ref.currentFrame++;
      if(ref.currentFrame > lenth){
        ref.currentFrame = 0;
      }
    }
    this.frameUpdater = setInterval(updateFrame, frameTime);
  }

  this.draw = function(ctx,location){
    console.log(this.currentFrame);

    this.sheet.row = this.currentFrame;
    this.sheet.column = this.targetAnimation;

    this.sheet.draw(ctx,location);
  }
}
