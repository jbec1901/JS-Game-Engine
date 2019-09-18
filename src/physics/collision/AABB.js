const Vector = require('./../vector');

class BoxTemplate {
  constructor(size = new Vector(10, 10)){
    this.size = size;
  }

  apply(location){
    return new BoundingBox(this, location);
  }
}

class BoundingBox {
  constructor(parent, location){
    this.parent = parent;

    this.topLeft = location.clone();
    this.topRight = location.add(new Vector(parent.size.x, 0));
    this.bottomRight = location.add(parent.size);
    this.bottomLeft = location.add(new Vector(0, parent.size.y));
  }

	//Function to test if this box is overlapping with another box.
	testCollision(box){
		if(this.bottomRight.x < box.topLeft.x || box.bottomRight.x < this.topLeft.x){
      return false
    };
		if(this.bottomRight.y < box.topLeft.y || box.bottomRight.y < this.topLeft.y){
      return false
    };
    console.log(this, box);
		return true;
	}

	//Function to draw the collision box if we want to (for debugging)
	draw(ctx, color){
    if(color){
      ctx.fillStyle = color;
    }
		ctx.fillRect(this.topLeft.x, this.topLeft.y, this.parent.size.x, this.parent.size.y);
	}
}

module.exports = BoxTemplate;
