// ==== Advent of Code problem 3 ====

// An invalid ID is one that consists of two identical sequences repeated (ie. 55, 2020, 123123). 
// Now invalid IDs can be sequences of any length repeated any number of times
  // -- This means only ints with odd num of digits can also be invalid 
  // -- It is not as simple as splitting a str in half and checking equality -- we need to 
  // -- check sequences of all lengths
  // -- The smallest number of repeats in a sequence can be 1, and the most can be length - 1. 
  // -- So we can break our loop if we make it to index length/2 
  // -- So if we check char 0 and compare it to the next char for equality, 
// We require the sum of all invalid IDs, so we need to track a rolling sum. 

// Load input file
const fs = require('fs')
const inputFilePath = '../03/03-input.csv'
const readFileFromSrc = (path) => {
  try {
    const file = fs.readFileSync(path)
    return file.toString()
  } catch (error) {
    console.error('Error reading file: ', error.message)
  }
}
const rangesStr = readFileFromSrc(inputFilePath)
const mockRanges = '11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124'
const mockRanges2 = '123123123-123123124'

// Create list of ranges
const rangesList = rangesStr.split(',')
// const rangesList = mockRanges.split(',')

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
  // Single digit IDs cannot have repeats
  if (len === 1) return true
  // Declare var for operating validation logic
  let checkString
  // Loop over first half of string
  for (let i = 0; i < len / 2; i++) {
    // Initialize sample substring from index 0 to the current index (inclusive)
    const sample = idStr.substring(0, i + 1)
    // If we eliminate all instances of the sample string from the idString, any idString that consists only
    // of repeated units will result in an empty checkString --> therefore id is invalid
    checkString = idStr.replaceAll(sample, '')
    if (!checkString) return false
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