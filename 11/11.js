// ==== Advent of Code problem 11 ====

// This problem's input set contains subsets of numbers with an operator (* or +) describing whether we need to add or multiply those nums.
// Each subset is arranged vertically (ie. the first num of the first set is the leftmost number on line 1, the next num of
// the first set is the leftmost number on line 2, etc). The operator for each set is the corresponding char on the last line. 
// The task is to perform each operation for each "column" of nums, and sum the result of each operation for a grand total. 
// We'll need to organize the text input into something more useable. 
// -- Splitting into an array by new line seems like a good start
// -- Then splitting each line by empty space ' ' provides us a 2d array with each line represented by an index, 
// -- and each column indexed within each line. 
// But we need to operate on the column -- so the outer loop, i would be the index of the "column", and j would be the index
// of the line
// We can check the operator of that given column by looking at arr.length index of the given column, and exclude that last
// row from the arithmetic loop 
// Since we're performing arithmetic operations on these numeric strings, we'll need to convert them to ints.
// The text input also has extra spaces in it (each num isn't necessarily separated by only one space), so we'll need to 
// eliminate the empty strings from our 2d array. 

// Import input text (trim trailing new line)
const fs = require('fs')
const inputFilePath = './11-input.txt'
const readFileFromSrc = (path) => {
  try {
    const file = fs.readFileSync(path)
    return file.toString()
  } catch (error) {
    console.error('Error reading file: ', error.message)
  }
}
const inputTxt = readFileFromSrc(inputFilePath).trim()

// Convert str input to 2d array
const composeNestedArray = (input) => {
  // Break string into 1d arr by line
  let nestedArray = input.split('\n')
  // Break each line into array by empty space
  for (row in nestedArray) {
    nestedArray[row] = nestedArray[row].split(' ')
  }
  // Rm empty strings from each row
  for (row in nestedArray) {
    nestedArray[row] = nestedArray[row].filter((value) => {
      return value !== ''
    })
  }
  return nestedArray
}

const getGrandTotal = (inputTxt) => {
  const nestedOperationArray = composeNestedArray(inputTxt)
  // The num of operations will be equal to how many columns are in a line of the data.
  const numOfColumns = nestedOperationArray[0].length
  // Num of numbers in each operation will be equal to the number of rows minus 1 (the operator row at bottom)
  const numOfRows = nestedOperationArray.length - 1
  let grandTotal = 0
  // Nested loop to perform operations on each column
  for (let col = 0; col < numOfColumns; col++) {
    let rollingColSum = 0
    for (let row = 0; row < numOfRows; row++) {
      const currentNum = parseInt(nestedOperationArray[row][col])
      const operation = nestedOperationArray[numOfRows][col]
      // For first element, set rollingColSum = that value and move to next
      if (!rollingColSum) {
        rollingColSum = currentNum
        continue
      }
      if (operation === '+') {rollingColSum += currentNum}
      if (operation === '*') {rollingColSum *= currentNum}
      // rollingColSum = operation === '+' ? rollingColSum+= currentNum : rollingColSum * currentNum
    }
    grandTotal += rollingColSum
  }
  return grandTotal
}
console.log('Grand total: ', getGrandTotal(inputTxt))