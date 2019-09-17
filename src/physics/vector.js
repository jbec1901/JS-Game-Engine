class Vector {
  constructor(x = 0, y){
    if(y === undefined){
      this.y = x;
    }
    else{
      this.y = y;
    }
    this.x = x;
  }

  //Clone creates a copy of the vector
  clone(){
    return new Vector(this.x, this.y);
  }

  //Get angle of vector
  angle(){
    return Math.atan2(this.y,this.x);
  };
  //Get the magnitude/hypotenuse of the vector
  magnitude(){
    return(Math.pow(Math.pow(this.x,2) + Math.pow(this.y,2),0.5))
  };

  //Add two vectors together into a new vector
  add(vector){
    return new Vector(this.x + vector.x, this.y + vector.y);
  };
  //Join another vector into this vector
  join(vector){
    this.x += vector.x;
    this.y += vector.y;
  };

  //Multiply two vectors together into a new vector
  multiply(vector){
    return new Vector(this.x * vector.x, this.y * vector.y);
  };
  //Scale this vector by another vector
  scale(vector){
    this.x *= vector.x;
    this.y *= vector.y;
  };

  //Get the minimum of the x and y of a vector
  min(vector){
    return new Vector(((this.x < vector.x)? this.x : vector.x), ((this.y < vector.y)? this.y : vector.y));
  }
  //Get the maximum of the x and y of a vector
  max(vector){
    return new Vector(((this.x > vector.x)? this.x : vector.x), ((this.y > vector.y)? this.y : vector.y));
  }

  //TODO dot product
}

module.exports = Vector;
