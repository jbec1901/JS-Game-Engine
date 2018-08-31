var Quaternion = function(angle = 0, magnitude = 1){
  this.angleComponent = {value: angle};
  this.angle = function(){
    return this.angleComponent.value;
  }
  this.setAngle = function(angle){
    this.angleComponent.value = angle;
  }

  this.magnitudeComponent = {value: magnitude};
  this.magnitude = function(){
    return this.magnitudeComponent.value;
  }
  this.setMagnitude = function(magnitude){
    this.magnitudeComponent.value = magnitude;
  }

  this.x = function(){
    return Math.cos(this.angle()) * this.mag()
  }

  this.y = function(){
    return Math.sin(this.angle()) * this.mag()
  }
}
