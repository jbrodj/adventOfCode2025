// ==== Advent of Code problem 14 ====

// Instead of a tachyon splitting at each splitter, now we only move left or right -- only a single tachyon can be 
// in the manifold at a time. 
// So at each splitter, the tachyon either moves left or right to the line below.
// Except for this problem, we are assuming that in every case, one possible timeline sees the tachyon move left,
// and in the other we see it move right.
// The problem is to discover the total number of "timelines" we encounter from the possible permutations of a single tachyon
// moving through the manifold.
// So we need to be able to run our tachyon movement function anew each time we hit a splitter
// Or come up with a model that allows us to track the possible permutations at each step
// This might be simpler... Each time we hit a splitter, we're adding another permutation. 
// If we ran our logic from part 1, we might miss some permutations due to combining split tachyons that happen to occupy
// the same space after a split. So if we eliminate that part of the logic (simply allow each tachyon in our data set to occupy
// identical positions), we'd end up with a number of tachyons at the end that should match the number of permutations. 
// We need to track the positions of each tachyon using a data structure, rather than modifying the manifold array.

// This method will work, but is too slow --
// Since we're storing each timeline result as its own object, this results in a data set (and num of operations) that is vastly larger than n (num of rows in the manifold)
// even if we only store the tachyon locations for the given row of the manifold that we're currently on and discard the rest. 
// So we need to find a more clever way to store tachyon positions. 
// Reducing the size of the data per tachyon position did not help, so the issue of storing too many vals is limiting, not the amount of bytes per datum.
// So instead of storing one datum per poisition, let's use a qty property to track multiple tachyons at the same position, which will greatly reduce the size of the array.

const fs = require('fs')
const inputFilePath = '../13/13-input.txt'
const readFileFromSrc = (path) => {
  try {
    const file = fs.readFileSync(path)
    return file.toString()
  } catch (error) {
    console.error('Error reading file: ', error.message)
  }
}
// Split our input into array by line
const manifoldArray = readFileFromSrc(inputFilePath).trim().split('\n')

class tachyon {
  constructor(x, y, qty=1) {
    this.x = x
    this.y = y
    this.qty = qty
  }
}

const createNewTachyon = (x, y, qty) => {
  return new tachyon(x, y)
}

// Look at chars to find starting position character
const getStartingPosition = (manifoldArray) => {
  let startingPosition
  for (line in manifoldArray) {
    for (char in manifoldArray[line]) {
      if (manifoldArray[line][char] === 'S') {
        startingPosition = new tachyon(parseInt(char), parseInt(line))
      }
    }
  }
  return startingPosition
}

// Given a tachyon position, find value on next line of manifold array at same x position
const getNextLineValue = (tachyon, manifoldArray) => {
  return manifoldArray[tachyon.y + 1][tachyon.x]
}

// Given list of tachyons, check for a duplicated x coordinate and returns the index of the duplicate if it exists, or null
const findDuplicateXCoordinate = (tachyon, tachyonsArray) => {
  for (tachyonIndex in tachyonsArray) {
    if (tachyon.x === tachyonsArray[tachyonIndex].x) {
      return tachyonIndex
    }
  }
  return null
}

// Given a list of objects, find sum of given property
const getSumOfProperty = (array, propertyName) => {
  let sum = 0
  for (index in array) {
    const currentQty = array[index][propertyName]
    sum += currentQty
  }
  return sum
}

// Given a tachyon and the char at same x coorindate on next row of manifold array, return tachyon(s) that will occur on next row
const getNextLineTachyons = (nextLineCharValue, currentTachyon) => {
  const xPosition = currentTachyon.x
  const yPosition = currentTachyon.y
  const qty = currentTachyon.qty
  let newTachyons
  // If char on next line is splitter
  if (nextLineCharValue === '^') {
    // Create split tachyon positions for next row
    newTachyons = [
      {x: xPosition - 1, y: yPosition + 1, qty: qty},
      {x: xPosition + 1, y: yPosition + 1, qty: qty}
    ]
  }
  // If char on next line is empty space
  if (nextLineCharValue === '.') {
    // Create singel tachyon position for next row
    newTachyons = [{x:xPosition, y: yPosition + 1, qty: qty}]
  }
  return newTachyons
}

// For a given row in the tachyons array, compose new arr of tachyons that will occur on the next line (summing qty of tachyons with duplicate coordinates)
const runRow = (currentTachyons) => {
  // Create empty new row
  let nextLineTachyonsArray = []
  for (tachyon in currentTachyons) {
    // Find the value at current x-coordinate on next line of manifold array
    const nextLineValue = getNextLineValue(currentTachyons[tachyon], manifoldArray)
    // Get tachyon(s) for next line and conditionally add to array
    const newTachyons = getNextLineTachyons(nextLineValue, currentTachyons[tachyon])
    for (index in newTachyons) {
      const indexOfduplicateXCoordinate = findDuplicateXCoordinate(newTachyons[index], nextLineTachyonsArray)
      // For a coordinate that already exists in the next line, update qty
      if (indexOfduplicateXCoordinate) {
        nextLineTachyonsArray[indexOfduplicateXCoordinate].qty += currentTachyons[tachyon].qty
      } else {
        // Create tachyon position in next row if no duplicate exists
        nextLineTachyonsArray.push(newTachyons[index])
      }
    }
  }
  // Set current row to next line's y coordinate value
  currentRow = nextLineTachyonsArray[0].y
  return nextLineTachyonsArray
}

const startingPosition = getStartingPosition(manifoldArray)
let currentRow = 0
let currentTachyons = [startingPosition]

const getTotalTimelines = () => {
  let totalTimelines
  while (currentRow < manifoldArray.length - 1) {
    currentTachyons = runRow(currentTachyons)
    totalTimelines = getSumOfProperty(currentTachyons, 'qty')
  }
  return totalTimelines
}

console.log('Sum of quantities: ', getTotalTimelines())