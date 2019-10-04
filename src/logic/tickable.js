const Game = require('./game');

function Tickable(){
  if(this.exist === undefined){
    this.exist = true;
  }
  if(this.tick === undefined){
    this.tick = (delta) => { }
  }
  Game.tickables.push(this);
};

module.exports = Tickable;
