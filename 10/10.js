// ==== Advent of Code problem 10 ==== 

// Now instead of counting the number of fresh ingredients in the list, we want to find out how many
// fresh ingredients are implied by the given ranges. 
// So the set of ingredient numbers is now irrelevant.
// We only want to count the num of IDs in all of the list of ranges (accounting for ranges that overlap)
// We could do this by creating FreshIds array to store each fresh ID -- loop over each range, check new array for 
// an instance of that value, if it isn't there, add it. 
// Then we can simply check the length of the array to find the number of fresh ingredients. 
// But it turns out this would have very bad performance because we're increasing the size of k by a large factor.
// Instead, let's loop through our subset of n and count the difference between the upper limit and lower limit of 
// each range (inclusive), making sure to account for overlapping ranges. We'll have to sort the input array, which adds
// time complexity. 

const fs = require('fs')
const inputFilePath = '../09/09-input.txt'
const readFileFromSrc = (path) => {
  try {
    const file = fs.readFileSync(path)
    return file.toString()
  } catch (error) {
    console.error('Error reading file: ', error.message)
  }
}
// Create array from input string
const inputArr = readFileFromSrc(inputFilePath).split('\n')

// Split range strings into sorted 2d-array (numerically by the first index of each sub-array) -- sorting makes it simpler to find overlaps
// -- We only need the first part of the input array that contains the ranges
const getSortedRangesArray = (inputArr) => {
  let rangesArr = []
  for (index in inputArr) {
    // End loop when we reach the end of the ranges (ie. at the empty new line)
    if (index > 0 && inputArr[index] === '') {break}
    rangesArr.push(inputArr[index].split('-'))
  }
  return rangesArr.sort((a, b) => a[0]-b[0])
}

const getFreshIngredientCount = (sortedArr) => {
  let freshIngredientCount = 0
  for (index in sortedArr) {
    // Check previous range for overlap with current range (null prevRange for index 0)
    const prevRange = index > 0 ? sortedArr[parseInt(index) - 1] : null
    let currentRange = sortedArr[index]
    // Adjust lower limit of current range if current range overlaps with previous range (convert to ints to avoid
    // comparison & arithmetic issues with numeric strings)
    if (prevRange && parseInt(prevRange[1]) >= parseInt(currentRange[0])) {
      currentRange[0] = parseInt(prevRange[1]) + 1
    }
    // Count indecies in current (or adjusted) range (inclusive of range boundary nums)
    const numOfIndeciesInRange = currentRange[1] - currentRange[0] + 1
    // In cases where numOfIndeciesInRange is negative, the current range is a subset of the prev range with no new indecies
    // and can be discarded
    freshIngredientCount = numOfIndeciesInRange > 0 ? freshIngredientCount + numOfIndeciesInRange : freshIngredientCount
  }

  return freshIngredientCount
}

console.log('Total count: ', getFreshIngredientCount(getSortedRangesArray(inputArr)))
