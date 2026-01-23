// ==== Advent of Code problem 3 ====

// An invalid ID is one that consists of two identical sequences repeated (ie. 55, 2020, 123123). 
  // -- Only ints with even num of digits can be invalid -- we can split them at their middle index and check for equality on both sides.
// Ranges to be checked are defined in the input. 
// We require the sum of all invalid IDs, so we need to either store them or track a rolling sum. 

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
const mockRanges = '11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862'

// Create list of ranges
// const rangesList = rangesStr.split(',')
const rangesList = rangesStr.split(',')

// Helper functions
// -- Convert range str to arr of ints
const rangeStrToInts = (rangeStr) => {
  const rangeStrArr = rangeStr.split('-')
  const rangeIntArr = rangeStrArr.map((numStr) => {
    return parseInt(numStr)
  })
  return rangeIntArr
}

// console.log(rangeStrToInts(rangesList[0]))
// -- Check for invalid ID 
  const validateId = (id) => {
    // Convert to string and split into substrs if len is even
    const idStr = id.toString()
    // console.log('ID str: ', idStr)
    if (idStr.length % 2 === 0) {
      const len = idStr.length
      const firstHalf = idStr.substring(0, len / 2)
      const secondHalf = idStr.substring(len / 2)
      // Compare first half and second half of num -- return int
      if (firstHalf == secondHalf) {return id}
    }
  }

    
    // Initialize invalid ID sum
    let invalidIdsSum = 0
    
    // Run loop over list of ranges
    for (range in rangesList) {
      const limits = rangeStrToInts(rangesList[range])
      for (let i = limits[0]; i < limits[1] + 1; i++) {
        const invalidId = validateId(i)
    // Conditionally add current invalid ID to rolling sum of invalid IDs
    invalidIdsSum = invalidId ? invalidIdsSum + invalidId : invalidIdsSum
  }
}

// Print sum of all invalid IDs
console.log('Invalid ID sum: ', invalidIdsSum)