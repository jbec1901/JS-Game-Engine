
class Sound {
  constructor(){
    this.background = new Audio();
    this.background.loop = true;
  }

  playSound(path){
    let sound = new Audio(path);
    sound.play();
  }

  setBackground(path){
    try {
      this.background.pause();
    }
    catch(err){
      console.log(err);
    }
    this.background.src = path;
    this.background.play();
  }
}

module.exports = new Sound();
