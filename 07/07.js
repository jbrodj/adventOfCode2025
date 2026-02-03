// ==== Advent of Code problem 7 ====

// A roll of paper ('@') is accessible in a block of text if that roll is adjacent to fewer than four other rolls of paper in
// the eight adjacent positions. Task is to sum the num of rolls of paper than can be accessed. 
// Converting the block of txt to an array of strings (by new line) allows us to index in 2 dimensions
// So we need to loop over each index in each string in the array, (n), and for each index, check the vals of each adjacent 
// char (k) (up, down, left, right, and each diagonal). If <4, we increment our counter. We need an algorithm that can easily
// loop over the adjacent values. Accounting for nonexistent indecies where a char is at the boundary of the array/string (
// ie. index 0[0] doesn't have anything to its left/top)
// We can break out of the inner loop once we reach a value of 4 to avoid increasing the value of k unnecessarily.
// We can move on to the next char if the current char is not a roll of paper to avoid running the k loop when not needed.
// The eight possible adjacent indecies (if they exist) for a given index (row[index]) can be expressed as:
  // [row-1[index-1], row-1[index], row-1[index+1], row[index-1], row[index+1], row+1[index-1], row+1[index], row+1[index+1]]

const fs = require('fs')
const inputFilePath = './07-input.txt'
const readFileFromSrc = (path) => {
  try {
    const file = fs.readFileSync(path)
    return file.toString()
  } catch (error) {
    console.error('Error reading file: ', error.message)
  }
}
const inputArray = readFileFromSrc(inputFilePath).split('\n')

let accessibleRollCount = 0
// 2d Loop over the block of text to find val at each index
for (row in inputArray) {
  for (index in inputArray[row]) {
    // If char is not roll of paper, move to next
    if (inputArray[row][index] !== '@') {continue}
    // Check value of each adjacent char by looping over 2d sub-array of adjacent digits
    let rollsAdjToCurrent = 0
    // Index val in for/in loop is string -- need to convert row/index vals to int
    for (let i = row - 1; i <= parseInt(row) + 1; i++) {
      // If the row doesn't exist, move to next
      if (i < 0 || i > inputArray.length - 1) {continue}
      for (let j = index - 1; j <= parseInt(index) + 1; j++) {
        // If the index doesn't exist, or is current index move to next
        if (j < 0 || j > inputArray[row].length || (i == row && j == index)) {continue}
        // Check the value of the index and conditionally increment counter if val is '@'
        rollsAdjToCurrent = inputArray[i][j] === '@' ? rollsAdjToCurrent = rollsAdjToCurrent + 1 : rollsAdjToCurrent
        // Move to next if adjacent count reaches 4
        if (rollsAdjToCurrent >= 4) {continue}
      }
    }
    // Conditionally increment the total roll count
    accessibleRollCount = rollsAdjToCurrent < 4 ? accessibleRollCount + 1 : accessibleRollCount
  }
}
console.log('Final roll count: ', accessibleRollCount)