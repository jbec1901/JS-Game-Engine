var CollisionGroup = function(boxes){
  this.boxes = boxes;

  //Create a box that holds all of the boxes in this box
  this.box = undefined;
  for(i in this.boxes){
    box = this.boxes[i];
    if(this.box == undefined){
      this.box = box;
    }
    else{
      this.box = comp.compositeBox(box);
    }
  }

	//Functions to get the sizes of the box if we want
	this.width = function() {
		return this.box.bottomRight.x() - this.box.topLeft.x()
	};
	this.height = function() {
		return this.box.bottomRight.y() - this.box.topLeft.y()
	};
	this.center = function() {
		return this.box.topLeft().add(new Vector(this.box.width(), this.box.height()).scale(0.5));
	};

	//Function to draw the collision box if we want to (for debugging)
	this.draw = function(ctx) {
    this.box.draw(ctx);
    for(i in this.boxes){
      box = this.boxes[i];
      box.draw(ctx);
    }
  }

  //Function to test if this box is overlapping with another box.
  this.testCollision = function(box) {
    if(this.box.test.testCollision(box)){
      for(i in this.boxes){
        box = this.boxes[i];
        if(box.test.testCollision(box)){
          return true;
        }
      }
    }
    return false;
  }

  this.compositeBox = function(box) {
    return this.box.compositeBox(box);
  }
}
