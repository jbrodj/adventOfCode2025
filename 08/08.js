// ==== Advent of Code problem 8 ====

// Now we want to account for removing a roll of paper -- once a roll is removed, other adjacent roll may be 
// possible to remove. 
// So we want to update the value of the char from '@' to '.' to represent the vacated space. 
// This also means we will need to re-check values for which an ajacent roll was removed.
// This could be done by repeating the whole outer loop if a roll was removed during the past loop (until 
// we run a loop without removing a roll). But this would probably be slow. 
// Could use a do/while loop for the above.
// We could also conditionally (ie. each time we are removing a roll), re-check the indecies that are directly
// adjacent to the removed index. 

// Going to attempt using problem 7's logic and see what the performance hit is.
// We are running through n multiple times using the do/while loop, which is definitely slower. 
// Though we're removing removeable rolls as we encounter them, so the number of runs through k will decrease 
// as we run through the do/while loop (as the num of rolls in the array decreases -- since we're not running k for non '@' vals). 
// I think this could still be improved by writing an algorithm that re-checks the directly adjacent rolls each time we 
// remove one. This would require us to re-run the rm roll and check adjacent indecies each time any of said adjacent indecies
// is removed. Intuitively, I think this would be lower time complexity because we're not looping back over any unaffected parts
// of the array. 

const fs = require('fs')
const inputFilePath = '../07/07-input.txt'
const readFileFromSrc = (path) => {
  try {
    const file = fs.readFileSync(path)
    return file.toString()
  } catch (error) {
    console.error('Error reading file: ', error.message)
  }
}
let inputArray = readFileFromSrc(inputFilePath).split('\n')
let hasChange = false
let totalRollCount = 0
// 2d Loop over the block of text to find val at each index
const runLoop = (inputArray) => {
  hasChange = false
  let currentRollCount = 0
  let updatedArray = inputArray

  for (currentRow in updatedArray) {
    for (currentIndex in updatedArray[currentRow]) {
      // Index val in for/in loop is string -- need to convert row/index vals to int
      const row = parseInt(currentRow)
      const index = parseInt(currentIndex)
      // If char is not roll of paper, move to next
      if (updatedArray[row][index] !== '@') {continue}
      // Check value of each adjacent char by looping over 2d sub-array of adjacent digits
      let rollsAdjToCurrent = 0
      for (let i = row - 1; i <= parseInt(row) + 1; i++) {
        // If the row doesn't exist, move to next
        if (i < 0 || i > updatedArray.length - 1) {continue}
        for (let j = index - 1; j <= parseInt(index) + 1; j++) {
          // If the index doesn't exist, or is current index move to next
          if (j < 0 || j > updatedArray[row].length || (i == row && j == index)) {continue}
          // Check the value of the index and conditionally increment counter if val is '@'
          rollsAdjToCurrent = updatedArray[i][j] === '@' ? rollsAdjToCurrent = rollsAdjToCurrent + 1 : rollsAdjToCurrent
          // Move to next if adjacent count reaches 4
          if (rollsAdjToCurrent >= 4) {continue}
        }
      }
      // For index with fewer than 4 adjacent rolls
      if (rollsAdjToCurrent < 4) {
        // Update value of char with empty spot ('.')
        updatedArray[row] = updatedArray[row].slice(0, index) + '.' + updatedArray[row].slice(index + 1, updatedArray[row].length)
        // Increment total roll count
        totalRollCount++
        // Update change tracker
        hasChange = true
      }
      // Conditionally increment the total roll count
      currentRollCount = rollsAdjToCurrent < 4 ? currentRollCount + 1 : currentRollCount
    }
  }
  return updatedArray
}

// While we detect changes to the array (ie. we have removed a roll since the last run),
// check the array for removeable rolls
do {
  inputArray = runLoop(inputArray)
}
while (hasChange === true)
console.log('Final roll count: ', totalRollCount)