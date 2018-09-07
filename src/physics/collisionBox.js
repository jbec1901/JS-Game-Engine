var CollisionBox = function(corner1, corner2, color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16)) {
  //Align the vectors to go topLeft to bottomRight
  if(corner1.x() < corner2.x()){
    minX = corner1.xReference;
    maxX = corner2.xReference;
  }
  else{
    minX = corner2.xReference;
    maxX = corner1.xReference;
  }
  if(corner1.y() < corner2.y()){
    minY = corner1.yReference;
    maxY = corner2.yReference;
  }
  else{
    minY = corner2.yReference;
    maxY = corner1.yReference;
  }
	//We are going to store the references to the vectors that make up the two corners of this collision box
	this.topLeft = new Vector(minX,minY);
	this.bottomRight = new Vector(maxX,maxY);

	//Random color if we draw it
	this.color = color;

	//Functions to get the sizes of the box if we want
	this.width = function() {
		return bottomRight.x() - topLeft.x()
	};
	this.height = function() {
		return bottomRight.y() - topLeft.y()
	};
	this.center = function() {
		return this.topLeft().add(new Vector(this.width(), this.height()).scale(0.5));
	};

	//Function to draw the collision box if we want to (for debugging)
	this.draw = function(ctx) {
		ctx.fillRect(this.topLeft, new Vector(this.width(), this.height()), 0, this.color);
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
