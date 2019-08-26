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

  //Get angle of vector
  angle(){
    return Math.atan2(this.y,this.x);
  };
  magnitude(){
    return(Math.pow(Math.pow(this.x,2) + Math.pow(this.y,2),0.5))
  };

  add(vector){
    return new Vector(this.x + vector.x, this.y + vector.y);
  };
  join(vector){
    this.x += vector.x;
    this.y += vector.y;
  };

  multiply(vector){
    return new Vector(this.x * vector.x, this.y * vector.y);
  };
  scale(vector){
    this.x *= vector.x;
    this.y *= vector.y;
  };

  //TODO dot product
}
