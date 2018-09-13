var CollisionTree = function(sortingMethod){
  //The root is the first value one the tree
  this.root = undefined;

  //Function to run custom sorting method over and over again
  var ref = this;
  function sorter(){
    while(true){
        sortingMethod(ref);
    }
  }
  //Starting sorting method in separate thread
  if(sortingMethod != undefined){
    this.sortThread = setTimeout(sorter, 0);
  }

  //Function to add to the tree
  this.add = function(box){
    //If we have nothing in the tree then the new box is the tree
    if(this.root == undefined){
      this.root = new Leaf(box);
    }
    //Add to the tree if it exist
    else{
      this.root.add(box);
    }
  }

  //Test the collisions down the tree
  //This will return the box that we hit or undeifned
  this.testCollision = function(box){
    return this.root.testCollision(box);
  }

  var Branch = function(branch1, branch2){
    //Save our branches
    this.branch1 = branch1;
    this.branch2 = branch2;

    //Get a box that encompasses all of the boxes below this one
    this.box = this.branch1.compositeBox(this.branch2)

    //Test if we hit any leafs down the line if we do return that box
    this.testCollision = function(box){
      var collision = this.box.testCollision(box);
      if(collision){
        //Return the box we hit or undefined
        return this.branch1.testCollision(box) || this.branch2.testCollision(box);
      }
      return undefined;
    }

    this.add = function(box){
      //find which box is closer to the one we are adding to keep the tree as accurate as posible.
      var boxCenter = box.center();
      //If we subtract (add negitive) our branchs center and get the magnitude we can get how far we are from them
      var mag1 = this.branch1.box.center().add(boxCenter.multiply(new Vector(-1))).magnitude();
      var mag2 = this.branch2.box.center().add(boxCenter.multiply(new Vector(-1))).magnitude();
      //Based on which one is closer add it
      if(mag1 < mag2){
        //If it wasnt added that means the branch was a leaf and we need to make it into a branch
        if(!this.branch1.add(box)){
          this.branch1 = new Branch(this.branch1, new Leaf(box));
        }
      }
      else{
        //If it wasnt added that means the branch was a leaf and we need to make it into a branch
        if(!this.branch2.add(box)){
          this.branch2 = new Branch(this.branch2, new Leaf(box));
        }
      }
      //Retrun true to tell further up braches that we did it
      return true;
    }
  }

  var Leaf = function(box){
    this.box = box;

    this.testCollision = function(box){
      //If we get a collision then we want to return the box so we know what box we hit
      if(this.box.testCollision(box)){
        return box;
      }
      //Retrun undefined as false because val || undefined == val
      else{
        return undefined;
      }
    }

    //Leafs cant add branches so we need to tell what ever tryed to run this that
    this.add = function(box){
      return false;
    }
  }
}
