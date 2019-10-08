const Game = require('./game');

let Tickable = Game.newGroup({
  name: 'tickable',
  constructor: function(){
    if(this.tick === undefined){
      this.tick = () => {};
    }
  },
  each: function(...args){
    this.tick(...args);
  },
  tps: 0,
});

module.exports = Tickable;
