const Renderer = require('../IO/renderer');
const UI = require('../IO/userInput')
const Thread = require('./thread')

class Game {
  constructor(tps, fps){
    this.renderer = new Renderer(fps);

    this.tps = tps;
    this.thread = new Thread((delta) => {
      this.mapEntitys((entity) => {
        entity.tick(delta);
      });
    }, this.tps);

    this.entityTypes = [];
    this.collisionSpace = new (require('./../physics/collision/pool'))();
  }

  start(gameLoop){
    try {
      this.renderer.stop();
      this.thread.stop();
    }
    catch(err){
      console.log(err);
    }
    if(gameLoop){
      this.thread = new Thread((delta) => {
        gameLoop(delta);
        this.mapEntitys((entity) => {
          entity.tick(delta);
        });
      }, this.tps);
    }
    this.thread.start();
    this.renderer.start();
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

  mapEntitys(callback){
    this.entityTypes.map((type) => {
      for(let i = type.instences.length - 1; i >= 0; i--){
        let entity = type.instences[i];
        if(!entity.exist){
          type.instences.splice(i);
          return;
        }
        callback(entity, type.id);
      }
    });
  }
}

module.exports = Game;
