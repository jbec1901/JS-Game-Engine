let Thread = require('../logic/thread')

class Renderer {
  constructor(tickRate = 30){
    this.layers = [];
    this.staticLayers = [];
    this.thread = new Thread(() => {
      for(let i = this.layers.length - 1; i >= 0; i--){
        this.layers[i].draw.bind(this.layers[i])();
      }
    }, 1000 / tickRate);
  }

  newLayer(draw){
    let layer = new Layer(draw);
    this.layers.push(layer);
    return layer;
  }

  newStaticLayer(draw){
    let layer = new Layer(draw);
    this.staticLayers.push(layer);
    layer.draw.bind(layer)();
    return layer;
  }

  start(){
    this.thread.start();
  }

  stop(){
    this.thread.stop();
  }
}

class Layer {
  constructor(draw){

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.draw = draw;

    //Handel resizing
    let resizeCanvas = () => {
  		this.canvas.width = window.innerWidth;
  		this.canvas.height = window.innerHeight;
      this.draw();
  	}
  	window.addEventListener('resize', resizeCanvas, false);
  	resizeCanvas();

    document.body.appendChild(this.canvas);
  }
}

module.exports = Renderer;
