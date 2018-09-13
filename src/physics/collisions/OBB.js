
//TODO
// Save data
// Add draw function
// Add convert to AABB function
// Add test collision function

var OBB = function(anchor, points, color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16)){

  this.anchor = anchor;

  this.color = color;

  //TODO test if convex and if so break it into smaller OBB's
  this.points = points;

  

}
