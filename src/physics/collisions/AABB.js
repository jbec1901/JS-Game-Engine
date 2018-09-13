var AABB = function(anchor, points = [new Vector(), new Vector(10)], color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16)) {

  //Anchor is a refernce that the box will move with
  this.anchorRef = anchor;

  this.anchor = funcion(){
    return this.anchorRef;
  }

  var xPoints = [];
  var yPoints = [];

  for(var i in points){
    var point = points[i];

    xPoints.push(point.x());
    yPoints.push(point.y());
  }

  this.topLeftRef = new Vector(Math.min(xPoints), Math.min(yPoints));
  this.topLeft = funcion(){
    return this.topLeftRef.add(this.anchor);
  }
  this.bottomRightRef = new Vector(Math.max(xPoints), Math.max(yPoints));
  this.bottomRight = funcion(){
    return this.bottomRightRef.add(this.anchor);
  }

  delete xPoints;
  delete yPoints;

	//Random color if we draw it
	this.color = color;

	//Functions to get the sizes of the box if we want
	this.width = function() {
		return this.bottomRightRef.x();
	};

	this.height = function() {
		return this.bottomRightRef.y();
	};

	this.center = function() {
		return this.topLeft().add(new Vector(this.width(), this.height()).scale(0.5));
	};

	//Function to draw the collision box if we want to (for debugging)
	this.draw = function(ctx) {
    ctx.fillStyle = this.color;
		ctx.fillRect(this.topLeft().x(), this.topLeft().y(), this.width(), this.height());
	}

	//Function to test if this box is overlapping with another box.
	this.testCollision = function(box) {
		if( this.bottomRight().x() < box.topLeft().x() || this.topLeft().x() > box.bottomRight().x() ) return false;
		if( this.bottomRight().y() < box.topLeft().y() || this.topLeft().y() > box.bottomRight().y() ) return false;
		return true;
	}

  //TODO
	this.compositeBox = function(box) {

	}
}
