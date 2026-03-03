// ==== Advent of Code problem 15 ====

// Given a set of n 3d coordinates of electrical junction boxes
// When two junction boxes are connected by a string of lights, electricity can flow between them, creating a circuit
// A circuit can contain two or more junction boxes (ie. we can create connections from one junction box to multiple others)
// We want to create connections using the shortest possible straight-line distances
// We need to connect the 1000 pairs of junction boxes that are closest together
// Then multiply the sizes (num of junctions in circuit) of the three largest circuits. 

// Beyond splitting our txt input by line, it probably makes sense to split it again into a 2d array of coordinates to make each coordinate axis
// easily accessible by index. 
// So we need an algorithm for calculating the straight-line distance between two given junction boxes.
  // We have access to three coordinates for each -- we can use these to find the difference on each axis
  // We can use these distances to find the hypotenuse length of a right triangle that connects two of the three points
  // then use that hypotenuse length and the third distance to find the length between the two junctions
  // ie, let's say we have a junction at 0, 0, 0, and another 2, 3, 5 -- the distances are x = 3, y = 4, z = 5
  // So we can find the xy hypotenuse length --  sqrt (3^2 + 4^2) == 5
  // And then find the hypz hypotenuse length -- sqrt (5^5 + 5^5) == ~7.1
// So we can loop thru n and find the shortest distance for each junction box (actually we might need to find all distances for each junction box -- in the event a junction's second closest
// connection would be among the top x shortest connections and would connect its circuit to another circuit).
// We need a data structure to store our existing circuits -- when we find the shortest distance, add that junction box coordinate set to a sub-array of junction boxes that comprise a circuit
  // For any given junction box, once we've found the shortest distance to another junction box, there are a number of possibilities
    // a) Neither of the two junction box coordinates are in any existing circuits     --> in which case we simply wish to create a new circuit array, and add both coordinates
    // b) One of the two junction boxes is already in a circuit, but the other is not  --> in which case, we wish to add the second junction box to the circuit array that already contains the first
    // c) Both of the two junction boxes are already in a single cirtuit               --> in which case, we wish to do nothing
    // d) Both of the two junction boxes are already in SEPARATE circuits              --> in which case, it makes sense to merge the two circuit arrays
// We may come across a junction in our loop that is already part of a circuit, so we can skip it
// This loop may become complex quickly, because we have a nested loop both of which are looping over n, so we should take care to make the operations efficient.

const fs = require('fs')
const inputFilePath = './15-input.txt'
const readFileFromSrc = (input) => {
  try {

    const file = fs.readFileSync(input)
    return file.toString()
  } catch (error) {
    console.error('Error reading file: ', error.message)
  }
}
const inputStr = readFileFromSrc(inputFilePath)

const mockInput = `
162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689
`
// Given a set of string coordinates, create two dimensional coordinate array of comma-separated strs
const getCoordinateArray = (input) => {
  const splitByLine = input.trim().split('\n')
  let coordinateArray = []
  for (index in splitByLine) {
    const currentCoordinates = splitByLine[index].split(',')
    coordinateArray.push(currentCoordinates)
  }
  return coordinateArray
}
const coordinateArray = getCoordinateArray(inputStr)

// Find the distance between two given sets of xyz coordinates
const findDistance = (pointA, pointB) => {
  // Given coordinates
  const xA = pointA[0]
  const yA = pointA[1]
  const zA = pointA[2]
  const xB = pointB[0]
  const yB = pointB[1]
  const zB = pointB[2]
  // Find absolute distance on each axis
  const x = Math.abs(xA - xB)
  const y = Math.abs(yA - yB)
  const z = Math.abs(zA - zB)
  // Find x-y hypotenuse length
  const xyHyp = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
  // Find straight line distance between the points (findin xy-z hyp length)
  const distance = Math.sqrt(Math.pow(z, 2) + Math.pow(xyHyp, 2))
  return distance
}

// For a given coordinate, create list of ojb containing all possible connections to another single junction with distance
const findAllDistances = (junction, coordinateArray, distancesArray) => {
  let updatedDistancesArray = distancesArray
  let currentConnection
  for (index in coordinateArray) {
    // Skip index if comparing a junction to itself
    if (coordinateArray[index] != junction) {
      const currentDistance = findDistance(junction, coordinateArray[index])
      currentConnection = {
        junctions: [junction.toString(), coordinateArray[index].toString()].sort(),
        distance: currentDistance
      }
      updatedDistancesArray.push(currentConnection)
    }
  }
  return updatedDistancesArray
}

// Check whether a given set of coordinates is already in a given circuit array -- return the index of that circuit array or null
const isInCircuit = (junction, circuitArray) => {
  for (circuit in circuitArray) {
    for (connection in circuitArray[circuit]) {
      for (coordinate in circuitArray[circuit][connection]) {
        // console.log('comparing: ', junction, circuitArray[circuit][connection][coordinate])
        // Compare stringified values of junction coordinates
        if (junction.toString() == circuitArray[circuit][connection][coordinate].toString()) {
          return circuit
        }
      }
    }
  }
  return null
}

// Given a coordinate pair and a circuit, return true if identical coordinate pair exists in circuit
const hasDuplicateConnection = (coordinates, circuit) => {
  for (connection in circuit) {
    // console.log(coordinates.toString(), circuit[connection].toString())
    if (coordinates.toString() === circuit[connection].toString()) {
      // console.log('Duplicate coordinates already in circuit')
      return true
    }
  }
  return false
}

// Generate list of possible junction box connections sorted by distance (ASC)
const getSortedDistances = (coordinateArray) => {
  let arr = []
  for (junction in coordinateArray) {
    arr = findAllDistances(coordinateArray[junction], coordinateArray, arr)
  }
  let sorties = arr.sort((a, b) => a.distance - b.distance)
  // console.log(sorties)
  return sorties
}

// Add a given set of coordinates to a circuit array as a string (if it does not already exist in that circuit)
const addCoordinatesToCircuit = (coordinate, circuitArray, circuitIndex=null) => {
  let modifiedCircuitarray = circuitArray
    if (circuitIndex == null) {
      modifiedCircuitarray.push([coordinate])
    } else {
      modifiedCircuitarray[circuitIndex].push(coordinate)
    }
  return modifiedCircuitarray
}


// const distancesArr = getSortedDistances(coordinateArray)
// console.log('Sorted array: ', distancesArr)

const createNShortestConnections = (n, sortedConnectionsArray) => {
  // console.log(sortedConnectionsArray)
  // let circuitArray = []
  let circuitArray = []
  let junctionCounter = 0
  // While our num of connections is less than n, add the next shortest possible connection to a circuit (if it is not already in that circuit)
  for (index in sortedConnectionsArray) {
    // console.log('=====================================================')
    if (junctionCounter >= n) {
      break
    }
    // console.log('current connection', sortedConnectionsArray[index].junctions)
    const connection = sortedConnectionsArray[index].junctions
    let coordinate1 = connection[0]
    let coordinate2 = connection[1]
    // console.log('connection', sortedConnectionsArray[index].junctions[1])
    const junction1Circuit = isInCircuit(coordinate1, circuitArray)
    const junction2Circuit = isInCircuit(coordinate2, circuitArray)
    // console.log(coordinate1, 'is in:', junction1Circuit, ' | ', coordinate2, 'is in:', junction2Circuit)
    // If j1 is in a circuit, and j2 is not, add j2 to that circuit
    if (junction1Circuit != null && junction2Circuit == null) {
      circuitArray = addCoordinatesToCircuit(connection, circuitArray, junction1Circuit)
      // console.log('adding coordinate 2,', coordinate2, 'to circuit', junction1Circuit)
      // console.log(circuitArray[junction1Circuit])
      junctionCounter++
    }
    // If j2 is in a circuit, and j1 is not, add j1 to that circuit
    if (junction2Circuit != null && junction1Circuit == null) {
      circuitArray = addCoordinatesToCircuit(connection, circuitArray, junction2Circuit)
      // console.log('adding coordinate 1,', coordinate1, 'to circuit', junction2Circuit)
      // console.log(circuitArray[junction2Circuit])
      junctionCounter++
    }
    // If neither junction coordinate is in a circuit, add both to a new circuit
    if (junction1Circuit == null && junction2Circuit == null) {
      circuitArray = addCoordinatesToCircuit(connection, circuitArray)
      // console.log('adding coordinate 1 & 2,', coordinate1, '&', coordinate2, 'to circuit (length)', circuitArray.length - 1)
      junctionCounter++
    }
    // If both are in SAME circuit, but NOT connected to each other, add connection and increment junction counter
    if (junction1Circuit != null && junction1Circuit == junction2Circuit && !hasDuplicateConnection(connection, circuitArray[junction1Circuit])) {
      // console.log('both are already in same circuit')
      circuitArray = addCoordinatesToCircuit(connection, circuitArray, junction1Circuit)
      junctionCounter++
    }
    // If both are in SEPARATE circuits, merge those circuits
    if (junction1Circuit != null && junction2Circuit != null && junction1Circuit != junction2Circuit) {
      // console.log('need to merge circuit', junction1Circuit, '&', junction2Circuit)
      circuitArray.splice(junction1Circuit, 1, circuitArray[junction1Circuit].concat(circuitArray[junction2Circuit]))
      circuitArray.splice(junction2Circuit, 1)
      // junctionCounter++
    }
    // console.log('junction counter: ', junctionCounter)
    // console.log(circuitArray)
  }
  return circuitArray
}

const circuits = createNShortestConnections(1000, getSortedDistances(coordinateArray)).sort((a, b) => b.length - a.length)
console.log('final array', circuits)

let lengths = []
for (circuit in circuits) {
  const flattenedCircuits = circuits[circuit].flat()
  const set = new Set(flattenedCircuits)
  lengths.push(set.size)
}

const sortedLengths = lengths.sort((a, b) => b - a)

// Multiply the nums of three highest lengths
let multiplier = 1
for (let i = 0; i < 3; i++) {
  multiplier *= sortedLengths[i]
}

console.log(multiplier)