const Game = require('./game');

let Tickable = Game.newGroup({
  name: 'tickable',
  constructor: function(){
    //Defualt tick function so we don't get errors
    if(this.tick === undefined){
      this.tick = () => {};
    }
  },
  each: function(...args){
    this.tick(...args);
  },
  //Make ticks go as fast as possible
  tps: 0,
});

module.exports = Tickable;
