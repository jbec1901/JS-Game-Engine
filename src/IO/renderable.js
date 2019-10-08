const Game = require('./../logic/game');
const Vector = require('./../physics/vector');
const Layer = require('./layer');

let Renderable = Game.newGroup({
  name: 'renderable',
  vars: {
    layers: {},
  },
  constructor: function(){
    if(this.render === undefined){
      throw new Error('Renderables must have a render function');
    }

    if(this.position === undefined){
      this.position = new Vector();
    }
    if(this.layer === undefined){
      this.layer = 'base';
    }
  },
  each: function(delta, i, group){
    //If its layer doesnt exist then create one
    if(group.layers[this.layer] === undefined){
      group.layers[this.layer] = new Layer();
    }
    //Draw it in the context of the layer
    let layer = group.layers[this.layer];
    this.render(layer.ctx);
  },
  tick: (group) => {
    for(let layer in group.layers){
      group.layers[layer].clear();
    }
  },
  tps: 0,
});

module.exports = Renderable;
