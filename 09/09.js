// ==== Advent of Code problem 9 ====

// Given a list of valid (fresh) ranges, we want to check whether each number in a list of IDs is "fresh"
// Ranges are inclusive (ie. the terminal nums in the range are fresh)
// An ID may appear in multiple ranges
// Input is provided as text -- lines of ranges, an empty line, followed by lines of ID nums.
// For each ID in the IDs list (n), for each range (k) we can check if its value is >= the start of the range and 
// <= the end of the range. So no looping needed thru the range itself. 
// Once an ID is found in a range, we don't need to continue the inner loop. 
// If we know the data will always be sorted (which we don't know for certain, but the sample data happens to be sorted),
// we could use a search algorithm to check one set of nums against the other without needing an inner loop over k. 
// (ie. for num in range, check inex nums.length / 2 >/=/< the num in range)
// Want to consider which set (the ranges or the IDs) to use as the outer loop... Does either strategy present 
// ways to optimize that the other doesn't? 
// We can break the list into two arrays by checking for the empty line. 

const fs = require('fs')
const inputFilePath = './09-input.txt'
const readFileFromSrc = (path) => {
  try {
    const file = fs.readFileSync(path)
    return file.toString()
  } catch (error) {
    console.error('Error reading file: ', error.message)
  }
}
const inputArr = readFileFromSrc(inputFilePath).split('\n')

// Compose arrays of ranges and ids by splitting input data at the empty line
// Converting str nums to ints (for comparisons later in logic)
// Splitting the ranges into nested array of two nums at the '-' char
const composeIDRangesArrays = (inputArr) => {
  let endOfRanges = false
  for (index in inputArr) {
    if (index > 0 && inputArr[index] === '') {endOfRanges = true}
    if (!endOfRanges && inputArr[index]) {rangesArr.push(inputArr[index].split('-'))}
    if (endOfRanges && inputArr[index]) {idsArr.push(parseInt(inputArr[index]))}
  }
}

// Check each ID against each range, counting fresh ingredients, and breaking once a given index is found in any range
// to avoid counting any ID more than once.
let rangesArr = []
let idsArr = []
const findFreshIngredients = () => {
  composeIDRangesArrays(inputArr)
  let freshIngredients = []
  for (index in idsArr) {
    for (range in rangesArr) {
      if (idsArr[index] >= rangesArr[range][0] && idsArr[index] <= rangesArr[range][1]) {
        freshIngredients.push(idsArr[index])
        break
      }
    }
  }
  return freshIngredients
}

console.log('Num of freshies: ', findFreshIngredients().length)