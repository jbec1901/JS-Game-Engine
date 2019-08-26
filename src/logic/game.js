let Renderer = require('../IO/renderer');
let UI = require('../IO/userInput')
let Thread = require('./thread')

class Game {
  constructor(tps, fps){
    this.renderer = new Renderer(fps);

    this.tps = tps;
    this.thread = new Thread(() => {

    }, this.tps);
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
      this.thread = new Thread(gameLoop, this.tps);
    }
    this.thread.start();
    this.renderer.start();
  }
}

module.exports = Game;
