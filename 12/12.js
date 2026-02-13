// ==== Advent of Code problem 12 ==== 

// Now we need to read our data differently -- the nums in our text input are read top-to-bottom, right-to-left
// So we need to organize and/or read our data structure differently. 
// Each integer needs to be composed by checking values at a given str index across different lines (if they exist). 
// But our arithmetic operations are still contained within a "column", so we can loop over the same columns as before.
// For each column, we can compose each num and perform the operation. 
// Nums are composed top to bottom. 
// The nums in our data are strings, so we can access each digit by its index, and access the length property of each str.
// So if we use the same data structure as the last solution, the rightmost integer in a given column would be composed by:
  // Finding the length of the longest numeric string in the data.
  // Accessing the digit at the corresponding last index in each numeric string (if it exists), top to bottom.  
  // Then moving to the last-index - 1 and doing the same. Remembering to account for digits that don't exist. 
  // Leaving these values as strings will make them simpler to compose -- we can simply concat the next digit. 
// But actually this isn't a good plan -- creating a 2d array by splitting on the space char will elinimate 
// vital data -- the positions of the spaces -- as they orient each char into their proper index within their operational column.
// We need to preserve the position of the emppty spaces -- so instead of creating a 2d array, let's break the txt block into
// an array by linebreak so we have access to rows by the array index, and simply run our arithmetic operation on the each
// int we can compose at each char index. 
// Since the set has an operator in the leftmost digit and empty spaces in the other digits, we can use that digit
// to track where an operational column begins and ends.

// Import input text (trim trailing new line)
const fs = require('fs')
const inputFilePath = '../11/11-input.txt'
const readFileFromSrc = (path) => {
  try {
    const file = fs.readFileSync(path)
    return file.toString()
  } catch (error) {
    console.error('Error reading file: ', error.message)
  }
}
const inputTxt = readFileFromSrc(inputFilePath).trim()

// Break string into 1d arr by line
const operationsArray = inputTxt.split('\n')

const maxIndexPerRow = operationsArray[0].length - 1
let grandTotal = 0
// Loop over each digit index from right to left, composing top-down integer for each index
// When we find an operator, perform operation on all integers in that operational column and add to total.
const calculateGrandTotal = (operationsArray) => {
  // Arr to store integers from current operational column
  let currentNums = []
  // Compose the top-down num at each index
  for (let digit = maxIndexPerRow; digit >= 0; digit--) {
    let currentNum = ''
    let currentOperator = ''
    for (row in operationsArray) {
      const currentDigit = operationsArray[row][digit]
      // If we have a number at current index, add it to the current num string
      if (currentDigit && currentDigit !== ' ' && currentDigit !== '+' && currentDigit !== '*') {
        currentNum = currentNum + currentDigit
      }
      // If we have an operator, set the current operator
      if (currentDigit == '+' || currentDigit == '*') {
        currentOperator = currentDigit
      }
    }
    // Convert to integer and store composed num
    if (currentNum) {currentNums.push(parseInt(currentNum))}
    // Once we find an operator, we have all nums in that operational column and can begin operation
    if (currentOperator) {
      let rollingSum = 0
      for (num in currentNums) {
        // For first element, set rollingColSum = that value and move to next
        if (!rollingSum) {
          rollingSum = currentNums[num]
          continue
        }
        if (currentOperator === '+') {rollingSum += currentNums[num]}
        if (currentOperator === '*') {rollingSum *= currentNums[num]}
      }
      grandTotal += rollingSum
      // Clear temp array for next operational column
      currentNums = []
    }
  }
  return grandTotal
}

console.log('Grand total: ', calculateGrandTotal(operationsArray))
