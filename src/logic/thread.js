class Thread {
  constructor(lambda){
    this.lambda = lambda;
    this.id = -1;
    this.loop = 0
  }

  //Start is the function that starts the loop
  //If it doesn't get a value for loop speed it will just used 0
  start(loop = this.loop){
    //If loop is not running then create one
    if(this.id === -1){
      //If we set a number for loop that is greater then 0 set a interval
      if(loop > 0){
        this.id = setInterval(this.lambda, loop);
      }
      //If loop is 0 then use a loop that will go as fast as posible
      else if(loop === 0){
        let lastTime = Date.now();
        loop = () => {
          let delta = Date.now() - lastTime;
          this.lambda(delta);
          lastTime += delta;
          this.id = setTimeout(loop, 0)
        }
        this.id = setTimeout(loop, 0)
      }
      //If loop is any other number then just run it once
      else{
        this.id = setTimeout(this.lambda, 0);
      }
    }
    else{
      throw new Error('Thread already running');
    }
  }

  //Function to stop the thread
  stop(){
    //Make sure the thread is actualy running if we want to start it
    if(this.id !== -1){
      //Stop the loop depending on the type of thread we made
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
