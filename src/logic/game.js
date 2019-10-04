const UI = require('../IO/userInput');
const Layer = require('../IO/layer');
const Thread = require('./thread');

class Game {
  constructor(){
    this.thread = new Thread(this.tick.bind(this));
    this.renderer = new Thread(this.render.bind(this));
    this.animater = new Thread(this.animate.bind(this));

    this.tps = 0;
    this.fps = 0;

    this.tickables = [];

    this.renderables = [];
    this.animatables = [];

    this.collideables = [];

    this.layers = {};
  }

  /*  the start function will start the game
   *  loop<function> can be used it inject some code to run every tick
   *  tps<int> tps can be used to set the ticks per a second
   *  fps<int> fps can be used to set the frames per a second
   */
  start({ loop, tps, fps, aps }){
    //Try and stop the threads
    try {
      this.thread.stop();
    }
    catch(err){
      console.log(err);
    }
    try {
      this.renderer.stop();
    }
    catch(err){
      console.log(err);
    }
    try {
      this.animater.stop();
    }
    catch(err){
      console.log(err);
    }

    //If we changed anything with the fps then update the fps
    if(fps !== undefined){
      this.fps = (fps === 0)? 0: 1000/fps;
    }

    //If we changed anything with the fps then update the fps
    if(aps !== undefined){
      this.aps = 1000/aps;
    }

    //If tps was updated then update it in memory
    if(tps){
      this.tps = (tps === 0)? 0: 1000/tps;
    }

    //If we changed anything with loop then update the game loop thread
    if(loop !== undefined){
      this.thread = new Thread((delta) => {
        loop(delta);
        this.tick(delta);
      });
    }

    this.renderer.start(this.fps);
    this.animater.start(this.aps);
    this.thread.start(this.tps);
  }

  stop(){
    try {
      this.renderer.stop();
      this.thread.stop();
    }
    catch(err){
      console.log(err);
    }
  }

  mapGroup(group, callback){
    let groupObjects = this[group];
    for(let i = groupObjects.length - 1; i >= 0; i--){
      let object = groupObjects[i];
      if(!object.exist){
        groupObjects.splice(i);
        continue;
      }
      callback(object, i, groupObjects);
    }
  }

  tick(delta){
    this.mapGroup('tickables', (tickable) => {
      tickable.tick.bind(tickable)(delta);
    });
  };

  render(){
    //Clear all layers
    for(let layer in this.layers){
      this.layers[layer].clear();
    }

    this.mapGroup('renderables', (renderable) => {
      //If its layer doesnt exist then create one
      if(this.layers[renderable.layer] === undefined){
        this.layers[renderable.layer] = new Layer();
      }
      //Draw it in the context of the layer
      let layer = this.layers[renderable.layer];
      renderable.render(layer.ctx);
    });
  }

  animate(){
    this.mapGroup('animatables', (animatable) => {
      animatable.animate();
    });
  }

  testCollision(collider, filter = () => {return false}){
    let bounds = collider.collider.apply(collider.position);

    let { collideables } = this;
    for(let i = collideables.length - 1; i >= 0; i--){
      let collideable = collideables[i];
      if(!collideable.exist){
        collideables.splice(i);
        continue;
      }

      if(collider.id === collideable.id || filter(collideable)){
        continue;
      }
      if(collideable.collider.apply(collideable.position).testCollision(bounds)){
        return true;
      }
      return false;
    }
  }
}

module.exports = new Game();
