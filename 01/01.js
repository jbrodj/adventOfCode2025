// ==== Advent of Code day 1 problem 1 ====
// Given a sequence of instructions to modify a number 0 thru 99 (which runs through -- 99 + 1 == 0; 0 - 1 == 99), find the count of instances where the number is exactly zero after an instruction.

// Import the list of instructions
// -- Read the file using node fs and return string
const fs = require('fs')
const filePath = './problem01Inputs.txt'
const readFileFromSrc = (path) => {
  try {
    const file = fs.readFileSync(filePath)
    return file.toString()
  } catch (error) {
    console.error('Error reading file: ', error.message)
  }
}
const data = readFileFromSrc()

// -- Create array of strings by splitting str by new line
const instructionsList = data.split(`\n`)


// Helper functions to parse an instruction -- 
// -- Read the direction of dial turn
const isRightTurn = (instruction) => {
  return instruction[0].toUpperCase() === 'R' ? true : false
}
// -- Read the instruction number -- accounting for numbers larger than 99
const getInteger = (instruction) => {
  let num = parseInt(instruction.slice(1))
  return num > 99 ? num % 100 : num
}
// -- Update the dial position
const updateDialPosition = (instruction) => {
  const rightTurn = isRightTurn(instruction)
  dialPosition = rightTurn ? 
    (dialPosition + getInteger(instruction)) % 100 : 
    (dialPosition - getInteger(instruction)) % 100
  // Account for negative dial position by translating to corresponding positive integer
  dialPosition = dialPosition < 0 ? dialPosition = dialPosition + 100 : dialPosition
  console.log('Current dial position: ', dialPosition)
}
// -- Check current value and conditionally increment zero count value
const checkIncrementZeroCount = () => {
  if (dialPosition === 0) {
    zeroCount++
  }
}


// Initialize dial position variable
let dialPosition = 50
// Initialize zero count variable
let zeroCount = 0

// Loop over the list
for (index in instructionsList) {
  updateDialPosition(instructionsList[index])
  checkIncrementZeroCount()
}

// Print final zero count var value once loop is complete
console.log('Zero count: ', zeroCount)