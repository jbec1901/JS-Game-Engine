var SpriteSheet = function(image, columns, rows, scale = 1){

  this.scale = scale;

  this.row = 0;
  this.column = 0;

  if(image.src == undefined){
    this.image = new Image();
    this.image.src = image;
  }
  else{
    this.image = image;
  }

  this.width = function(){
    return Math.floor(this.image.width / columns);
  };

  this.height = function(){
    return Math.floor(this.image.height / rows);
  }

  this.draw = function(ctx, location){
    if(this.image.complete){
    var width = this.width();
    var height = this.height();
      var sx = this.row * width;
      var sy = this.column * height;
      var dx = location.x();
      var dy = location.y();
    	ctx.drawImage(this.image, sx, sy, width, height,dx,dy,width * this.scale,height * this.scale);
    }
  }
}
