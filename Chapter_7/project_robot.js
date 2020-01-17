/*

This file is based on chapter 7 of Marjin's Haverbeke excellent book: "Eloquent Javascript" 3rd Edition and deals with the creation of a virtual automaton.
Unless stated otherwise, all of the code below is taken from this chapter and all credit goes to Marjin Haverbeke.

*/

const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);


class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) return p;
        return {place: destination, address: p.address};
      })
      .filter(p => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
}

function runRobot(state, robot, memory) {
  for (let turn = 0;; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function randomRobot(state) {
  return {direction: randomPick(roadGraph[state.place])};
}

VillageState.random = function(parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({place, address});
  }
  return new VillageState("Post Office", parcels);
};

const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return {direction: memory[0], memory: memory.slice(1)};
}

function findRoute(graph, from, to) {
  let work = [{at: from, route: []}];
  for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some(w => w.at == place)) {
        work.push({at: place, route: route.concat(place)});
      }
    }
  }
}

function goalOrientedRobot({place, parcels}, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}

/*
Measuring a robot - Exercise:

"It’s hard to objectively compare robots by just letting them solve a few scenarios. Maybe one robot just happened to get easier tasks or the kind of tasks that it is good at, whereas the other didn’t.
Write a function compareRobots that takes two robots (and their starting memory). It should generate 100 tasks and let each of the robots solve each of these tasks. When done, it should output the average number of steps each robot took per task.

For the sake of fairness, make sure you give each task to both robots, rather than generating different tasks per robot."

Note: the code below is my (L-Glogov's) take on solving this exercise.
*/

function runRobotTest(state, robot, memory) {
  for (let turn = 0;; turn++) {
    if (state.parcels.length == 0) {
      return turn;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
  }
}

function compareRobots(robot1, memory1, robot2, memory2) {
  let counter1 = 0;
  let counter2 = 0;
  for (let i = 0; i < 100; i++) {
    let testState = VillageState.random();
    counter1 += runRobotTest(testState, robot1, memory1);
    counter2 += runRobotTest(testState, robot2, memory2);
  }
  let rob1Avg = Math.round(counter1/100);
  let rob2Avg = Math.round(counter2/100);
  return `Robot1: ${rob1Avg}, Robot2: ${rob2Avg}`;
}

// console.log(compareRobots(routeRobot, [], goalOrientedRobot, []));

/*
Robot efficiency - Exercise:

"Can you write a robot that finishes the delivery task faster than goalOrientedRobot? If you observe that robot’s behavior, what obviously stupid things does it do? How could those be improved?
If you solved the previous exercise, you might want to use your compareRobots function to verify whether you improved the robot.
For the sake of fairness, make sure you give each task to both robots, rather than generating different tasks per robot."

Note: the code below is my (L-Glogov's) take on solving this exercise.
*/

function fastRobot({place, parcels}, route) {
  if (route.length == 0) {
    let routeArray = [];
    for (let parcel of parcels) {
      if (parcel.place !=place) {
        routeArray.push(findRoute(roadGraph, place, parcel.place));
      } else {
        routeArray.push(findRoute(roadGraph, place, parcel.address));
      }
    }
    let routeLength = routeArray.map(item => item.length);
    let routeIndex = routeLength.indexOf(Math.min(...routeLength));
    route = routeArray[routeIndex];
  }
  return {direction: route[0], memory: route.slice(1)};
}

console.log(compareRobots(fastRobot, [], goalOrientedRobot, []))

// Test output: Robot1: 12, Robot2: 15. Thus: fastRobot is faster!
