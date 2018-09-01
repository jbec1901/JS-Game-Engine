var SpriteSheet = function(image, columns, rows){

  this.rows = rows;
  this.columns = columns;

  this.row = 0;
  this.column = 0;

  if(image.src == undefined){
    this.image = new Image();
    this.image.src = image;
    this.image.onload = imageReady;
  }
  else{
    this.image = image;
    imageReady();
  }

  tmpParent = this;

  function imageReady(){

    var sheet = document.createElement('canvas');
    var sheet_ctx = sheet.getContext('2d');
    ctx.drawImage(this,0,0,this.width,this.height);
    var column = [];
    for(x = 0; x < this.width; x += tmpParent.width()){
      var row = []
      for(y = 0; y < this.height; y += tmpParent.height()){
        console.log(tmpParent.width());
        var subImage = sheet_ctx.getImageData(x, y,tmpParent.width(),tmpParent.height());
        row.push(subImage);
      }
      column.push(row);
    }
    tmpParent.sheet = column;
    tmpParent = undefined
  }

  this.getSprite = function(x,y){
    if(this.sheet == undefined){
      return new Image();
    }
    else{
      return this.sheet[x][y];
    }
  }

  this.setSprite = function(x,y){
    this.row = x;
    this.column = y;
  }

  //TODO
  this.draw = function(ctx, location){
  	var t = this.getSprite(row,column);
  	ctx.putImageData(t,0,0)
  }

  this.width = function(){
    return Math.floor(this.image.width / this.columns);
  }

  this.height = function(){
    return Math.floor(this.image.height / this.rows);
  }
}
