var CollisionBox = function(corner1, corner2, color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16)) {
  var minX, maxX, minY, maxY = undefined;
  //Align the vectors to go topLeft to bottomRight
  if(corner1.x() < corner2.x()){
    minX = corner1.xComponent;
    maxX = corner2.xComponent;
  }
  else{
    minX = corner2.xComponent;
    maxX = corner1.xComponent;
  }
  if(corner1.y() < corner2.y()){
    minY = corner1.yComponent;
    maxY = corner2.yComponent;
  }
  else{
    minY = corner2.yComponent;
    maxY = corner1.yComponent;
  }
	//We are going to store the references to the vectors that make up the two corners of this collision box
	this.topLeft = new Vector(minX,minY);
	this.bottomRight = new Vector(maxX,maxY);

	//Random color if we draw it
	this.color = color;

	//Functions to get the sizes of the box if we want
	this.width = function() {
		return this.bottomRight.x() - this.topLeft.x();
	};
	this.height = function() {
		return this.bottomRight.y() - this.topLeft.y();
	};
	this.center = function() {
		return this.topLeft().add(new Vector(this.width(), this.height()).scale(0.5));
	};

	//Function to draw the collision box if we want to (for debugging)
	this.draw = function(ctx) {
    ctx.fillStyle = this.color;
		ctx.fillRect(this.topLeft.x(), this.topLeft.y(), this.width(), this.height());
	}

	//Function to test if this box is overlapping with another box.
	this.testCollision = function(box) {
		if( this.bottomRight.x() < box.topLeft.x() || this.topLeft.x() > box.bottomRight.x() ) return false;
		if( this.bottomRight.y() < box.topLeft.y() || this.topLeft.y() > box.bottomRight.y() ) return false;
		return true;
	}

	this.compositeBox = function(box) {
    //Get the smallest X
    if(this.topLeft.x() < box.topLeft.x()){
      corner1X = this.topLeft.xComponent;
    }
    else{
      corner1X = box.topLeft.xComponent;
    };
    //Get the smallest Y
    if(this.topLeft.y() < box.topLeft.y()){
      corner1Y = this.topLeft.yComponent;
    }
    else{
      corner1Y = box.topLeft.yComponent;
    };
    //Make them into a vector
    corner1 = new Vector(corner1X,corner1Y);

    //Get the largest X
    if(this.bottomRight.x() > box.bottomRight.x()){
      corner2X = this.bottomRight.xComponent;
    }
    else{
      corner2X = box.bottomRight.xComponent;
    };
    //Get the largest Y
    if(this.bottomRight.y() > box.bottomRight.y()){
      corner2Y = this.bottomRight.yComponent;
    }
    else{
      corner2Y = box.bottomRight.yComponent;
    };
    //Make them into a vector
    corner2 = new Vector(corner2X,corner2Y);

		return new CollisionBox(corner1, corner2);
	}
}
