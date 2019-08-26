class SpriteSheet{
  constructor(image, columns, rows){
    this.sheet = new Image;
    this.sheet.src = image;

    this.width = Math.floor(this.sheet.width / columns);
    this.height = Math.floor(this.sheet.height / rows);

  }

  drawImage(ctx, row, column, location, scale = 1){
    let { width, height } = this;
    let { x, y } = location
    ctx.drawImage(this.image, width * row, height * column, width, height, x, y, width * scale, height * scale);
  }
}

module.exports = SpriteSheet;
