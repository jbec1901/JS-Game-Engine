class Thread {
  constructor(lambda, loop){
    this.lambda = lambda;
    this.id = -1;
    this.loop = loop
  }

  start(loop = this.loop){
    if(this.id === -1){
      if(loop > 0 && loop !== undefined){
        this.id = setInterval(this.lambda, loop);
      }
      else if(loop === 0 && loop !== undefined){
        let lastTime = Date.now();
        loop = () => {
          let delta = Date.now() - lastTime;
          this.lambda(delta);
          lastTime += delta;
          this.id = setTimeout(loop, 0)
        }
        this.id = setTimeout(loop, 0)
      }
      else{
        this.id = setTimeout(this.lambda, 0);
      }
    }
    else{
      throw new Error('Thread already running');
    }
  }

  stop(){
    if(this.id === -1){
      if(this.loop > 0){
        clearInterval(this.id);
      }
      else{
        clearTimeout(this.id);
      }
      this.id = -1;
    }
    else{
      throw new Error('Thread not running');
    }
  }
}

module.exports = Thread;
