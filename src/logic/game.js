const UI = require('../IO/userInput');
const Thread = require('./thread');

let groups = [];

//This function takes in a list of tps's for the differnt groups
function start(args = {}){
  //Map over all groups and stop their threads
  for(let group in groups){
    try {
      if(groups[group].thread){
        groups[group].thread.stop();
      }
    }
    catch(err){}
  }

  //Loop over all groups that we are changing the tps for and change them
  for(let group in args){
    try{
      groups[group].tps = (args[group] === 0)? 0: 1000/args[group];
    }
    catch(err){
      throw new Error(`group ${group} not defined`);
    }
  }

  //Loop over all groups and start them back up the the target tps
  for(let group in groups){
    if(groups[group].thread !== undefined){
      groups[group].thread.start(groups[group].tps);
    }
  }
}

//This function just stops all threads
function stop(){
  //Map over all groups and stop their threads
  for(let group in groups){
    try {
      if(groups[group].thread){
        groups[group].thread.stop();
      }
    }
    catch(err){}
  }
}

  //This function adds a new group
function newGroup({ name, constructor, each, tps, tick, vars }){
  if(name === undefined){
    throw new Error(`All groups need a name`);
  }
  if(constructor === undefined){
    throw new Error(`Group ${name} needs a constructor`);
  }

  groups[name] = {
    objects: [],
  }

  if(vars){
    for(let i in vars){
      groups[name][i] = vars[i];
    }
  }

  if(tps !== undefined && (tick !== undefined || each !== undefined)){
    groups[name].tps = (tps === 0)? 0: 1000/tps;
    groups[name].thread = new Thread((delta) => {
      if(tick !== undefined){
        tick(groups[name]);
      }
      if(each !== undefined){
        mapGroup(name, (object, i) => {
          each.bind(object)(delta, i, groups[name]);
        });
      }
    });
  }

  return function(){
    this.exist = true;
    groups[name].objects.push(this);
    constructor.bind(this)();
  }
}

function mapGroup(group, callback){
  let groupObjects = groups[group].objects;
  for(let i = groupObjects.length - 1; i >= 0; i--){
    let object = groupObjects[i];
    if(!object.exist){
      groupObjects.splice(i, 1);
      continue;
    }
    callback(object, i, groups[name]);
  }
}

module.exports = {
  start: start,
  stop: stop,
  newGroup: newGroup,
  mapGroup: mapGroup,
}
