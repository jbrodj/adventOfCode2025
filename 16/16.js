// ==== Advent of Code problem 16 ====

// Now instead of capping the num of shortest connections at a specific number, we wish to continue creating connections
// until all junction boxes are connected into a single circuit. 
// To discover this, we can check the length of the circuits array and return when we have a length of 1,
// then check if the num of junctions in a circuit === num of total junctions in our input.
// Then we need the x coordinate of each of the last two junction boxes that we connected, and multiply them together. 
// This should be straightforward to implement -- but I think the implementation from the prev problem will be too slow here. 

const fs = require('fs')
const inputFilePath = '../15/15-input.txt'
const readFileFromSrc = (input) => {
  try {

    const file = fs.readFileSync(input)
    return file.toString()
  } catch (error) {
    console.error('Error reading file: ', error.message)
  }
}
const inputStr = readFileFromSrc(inputFilePath)

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

// Find the distance between two given sets of xyz coordinates (arr of comma-separated strs)
const findDistance = (pointA, pointB) => {
  // Find absolute distance betweenn given coordinates on each axis
  const x = Math.abs(pointA[0] - pointB[0])
  const y = Math.abs(pointA[1] - pointB[1])
  const z = Math.abs(pointA[2] - pointB[2])
  // Find straight line distance between the points (finding xy-z hypotenuse length)
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2))
}

// For a given coordinate, create list of obj containing all possible connections to another single junction with distance
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

// Check whether a given set of coordinates is already in an arr of circuits -- return the index of that circuit or null
const isInCircuit = (junction, circuitArray) => {
  for (circuit in circuitArray) {
    for (connection in circuitArray[circuit]) {
      if (
        junction === circuitArray[circuit][connection][0] || 
        junction === circuitArray[circuit][connection][1]
      ) {
        return circuit
      }
    }
  }
  return null
}

// Generate list of possible junction box connections sorted by distance (ASC)
const getSortedDistances = (coordinateArray) => {
  let distancesArr = []
  for (junction in coordinateArray) {
    distancesArr = findAllDistances(coordinateArray[junction], coordinateArray, distancesArr)
  }
  const sorted = distancesArr.sort((a, b) => a.distance - b.distance)
  return sorted
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

// Given arr of connections sorted by distance (desc), return pair of coordinates once ALL junctions are in a SINGLE circuit
const createShortestConnections = (sortedConnectionsArray) => {
  let junctionsAddedToACircuit = new Set
  let circuitArray = []
  // Add the next shortest possible connection to a circuit (if it is not already in that circuit)
  for (index in sortedConnectionsArray) {
    const connection = sortedConnectionsArray[index].junctions
    const junction1Circuit = isInCircuit(connection[0], circuitArray)
    const junction2Circuit = isInCircuit(connection[1], circuitArray)
    // If j1 is in a circuit, and j2 is not, add j2 to that circuit
    if (junction1Circuit != null && junction2Circuit == null) {
      circuitArray = addCoordinatesToCircuit(connection, circuitArray, junction1Circuit)
      junctionsAddedToACircuit.add(connection[1])
    }
    // If j2 is in a circuit, and j1 is not, add j1 to that circuit
    else if (junction1Circuit == null && junction2Circuit != null) {
      circuitArray = addCoordinatesToCircuit(connection, circuitArray, junction2Circuit)
      junctionsAddedToACircuit.add(connection[0])
    }
    // If neither junction coordinate is in a circuit, add both to a new circuit
    else if (junction1Circuit == null && junction2Circuit == null) {
      circuitArray = addCoordinatesToCircuit(connection, circuitArray)
      junctionsAddedToACircuit.add(connection[0])
      junctionsAddedToACircuit.add(connection[1])
    }
    // If both are in SEPARATE circuits, merge those circuits
    else if (junction1Circuit != null && junction2Circuit != null && junction1Circuit != junction2Circuit) {
      circuitArray.splice(junction1Circuit, 1, circuitArray[junction1Circuit].concat(circuitArray[junction2Circuit]))
      circuitArray.splice(junction2Circuit, 1)
    }
    // If all junctions in input are present in single circuit, return last connection made
    if (circuitArray.length === 1 && junctionsAddedToACircuit.size >= coordinateArray.length) {
      return connection
    }
  }
  return "Cannot achieve single circuit"
}

// Given a connection (set of two coordinates) find the product of the x coordinates
const getXCoordProduct = (connection) => {
  if (typeof(connection) === 'string') {return connection}
  else {return connection[0].split(',')[0] * connection[1].split(',')[0]}
}

const finalCircuit = createShortestConnections(getSortedDistances(coordinateArray))
console.log('Product: ', getXCoordProduct(finalCircuit))
