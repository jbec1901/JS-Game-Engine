var Vector = function(x = 0,y){
  //store the vector as a object so we can make references to it
  //Alow passing a object as the x value
  if(x.value == undefined){
    this.xComponent = {value: x};
  }
  else{
    this.xComponent = x;
  }
  //function to get x out of object
  this.x = function(){
    return this.xComponent.value;
  };
  //function to set x because we want to preserve the object
  this.setX = function(x){
    this.xComponent.value = x;
  };

  //if y is undeinfed make it x so it is easyer to make normal vectors
  if(y == undefined){
    y = x;
  };
  //store the vector as a object so we can make references to it
  //Alow passing a object as the y value
  if(y.value == undefined){
    this.yComponent = {value: y};
  }
  else{
    this.yComponent = y;
  }
  //function to get y out of object
  this.y = function(){
    return this.yComponent.value;
  };
  //function to set y because we want to preserve the object
  this.setY = function(x){
    this.yComponent.value = y;
  };

  //function to easily get the angle
  this.angle = function(){
    Math.atan2(this.y(),this.x())
  };
  //function to easily get the magnitude
  this.magnitude = function(){
    return(Math.pow(Math.pow(this.x,2) + Math.pow(this.y,2),0.5))
  };

  //Operations
  //Addition
  //adding the size of this vector with another vector
  this.join = function(vector){
    this.setX(this.x() + vector.x());
    this.setY(this.y() + vector.y());
  };
  //get a vector that is the size of both of them added
  this.add = function(vector){
    return new Vector(this.x() + vector.x(), this.y() + vector.y());
  };

  //Multiplication
  //multiplying the size of this vector with another vector
  this.scale = function(vector){
    this.setX(this.x() * vector.x());
    this.setY(this.y() * vector.y());
  };
  //get a vector that is the size of both of them multiplyed
  this.multiply = function(vector){
    return new Vector(this.x() * vector.x(), this.y() * vector.y());
  };
}
