// ==== Advent of Code day 1 problem 1 ====
// Given a sequence of instructions to modify a number 0 thru 99 (which runs through -- 99 + 1 == 0; 0 - 1 == 99), find the count of instances where the number is exactly zero after an instruction.

// Import the list of instructions
// -- Read the file using node fs and return string
const fs = require('fs')
const inputFilePath = './problem01Inputs.txt'
const readFileFromSrc = (path) => {
  try {
    const file = fs.readFileSync(path)
    return file.toString()
  } catch (error) {
    console.error('Error reading file: ', error.message)
  }
}
const instructionsStr = readFileFromSrc(inputFilePath)

// -- Create array of strings by splitting str by new line
const instructionsList = instructionsStr.split(`\n`)

// Helper functions to parse an instruction -- 
// -- Read the direction of dial turn by checking first char
const isRightTurn = (instruction) => {
  return instruction[0].toUpperCase() === 'R' ? true : false
}
// -- Read the instruction number -- accounting for numbers larger than 99
const getInteger = (instruction) => {
  // Get number from current instruction string by removing first char; 
  // Some instructions are > 99, so we modulo by 100 to convert to relative dial position change
  let num = parseInt(instruction.slice(1)) % 100
  // Convert left turn instructions to negative ints
  if (!isRightTurn(instruction)) { num = 0 - num}
  return num
}
// -- Update the dial position -- accounting for sums greater than 99
const updateDialPosition = (instruction) => {
  dialPosition = (dialPosition + getInteger(instruction)) % 100
  // Account for negative dial position by translating to corresponding positive integer
  dialPosition = dialPosition < 0 ? dialPosition = dialPosition + 100 : dialPosition
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

// Loop over the instructions list and execute instructions
for (index in instructionsList) {
  updateDialPosition(instructionsList[index])
  checkIncrementZeroCount()
}

// Print final zero count var value once loop is complete
console.log('Zero count: ', zeroCount)