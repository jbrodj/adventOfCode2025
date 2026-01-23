// ==== Advent of Code problem 3 ====

// An invalid ID is one that consists of two identical sequences repeated (ie. 55, 2020, 123123). 
  // -- This means only ints with even num of digits can be invalid 
  // -- to validate, we can split them at their middle index and check for equality on both sides.
// We require the sum of all invalid IDs, so we need to track a rolling sum. 

// Load input file
const fs = require('fs')
const inputFilePath = './03-input.csv'
const readFileFromSrc = (path) => {
  try {
    const file = fs.readFileSync(path)
    return file.toString()
  } catch (error) {
    console.error('Error reading file: ', error.message)
  }
}
const rangesStr = readFileFromSrc(inputFilePath)

// Create list of ranges
const rangesList = rangesStr.split(',')

// Helper functions
// -- Convert individual range str to arr of two ints
const rangeStrToInts = (rangeStr) => {
  const rangeStrArr = rangeStr.split('-')
  const rangeIntArr = rangeStrArr.map((numStr) => {
    return parseInt(numStr)
  })
  return rangeIntArr
}
// -- Validate ID 
const isValidId = (id) => {
  const idStr = id.toString()
  const len = idStr.length
  if (len % 2 === 0) {
    const firstHalf = idStr.substring(0, len / 2)
    const secondHalf = idStr.substring(len / 2)
    return firstHalf === secondHalf ? false : true
  }
  return true
}

// Initialize invalid ID sum
let invalidIdsSum = 0

// Run loop over list of ranges
for (range in rangesList) {
  const limits = rangeStrToInts(rangesList[range])
  const lowerLimit = limits[0]
  const upperLimit = limits[1]
  for (let id = lowerLimit; id <= upperLimit; id++) {
    const isValid = isValidId(id)
    // Conditionally add current invalid ID to rolling sum of invalid IDs
    invalidIdsSum = !isValid ? invalidIdsSum + id : invalidIdsSum
  }
}

// Print sum of all invalid IDs
console.log('Invalid ID sum: ', invalidIdsSum)