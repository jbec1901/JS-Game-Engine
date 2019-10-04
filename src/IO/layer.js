
class Layer {
  constructor(){
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    //Handel resizing
    let resizeCanvas = () => {
  		this.canvas.width = window.innerWidth;
  		this.canvas.height = window.innerHeight;
  	}
  	window.addEventListener('resize', resizeCanvas, false);
  	resizeCanvas();

    document.body.appendChild(this.canvas);
  }

  clear(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

module.exports = Layer;
