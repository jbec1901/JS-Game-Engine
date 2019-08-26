class Thread {
  constructor(lambda, loop){
    this.lambda = lambda;
    this.id = -1;
    this.loop = loop
  }

  start(loop = this.loop){
    if(this.id === -1){
      if(loop !== -1){
        this.id = setInterval(this.lambda, loop);
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
      if(this.loop !== -1){
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
