//Simple Pool based collision detection
//TODO: create tree based collision detection
class Pool {
  constructor(){
    this.objects = [];
  }

  add(object){
    this.objects.push(object);
  }

  testCollision(object){
    let bounds = object.getBounds();
    for(let i = this.objects.length; i != -1; i--){
      //If the object dosn't exist anymore remove it from the pool
      if(!this.objects[i].exist){
        this.objects.splice(i, 1);
        continue;
      }
      if(object.id = this.objects[i].id){
        continue;
      }
      if(this.objects[i].getBounds().testCollision(bounds)){
        return true;
      }
    }
    return false;
  }

  draw(ctx, color){
    this.objects.map((object) => {
      object.getBounds().draw(ctx,color);
    });
  }
}

module.exports = Pool;