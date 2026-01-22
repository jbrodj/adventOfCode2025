// ==== Advent of Code problem 2 ====

// Import the list of instructions
// -- Read the file using node fs and return string
const fs = require('fs')
const inputFilePath = '../01/problem01Inputs.txt'
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
  let num = parseInt(instruction.slice(1))
  // Convert left turn instructions to negative ints
  if (!isRightTurn(instruction)) { num = 0 - num}
  return num
}
// -- Factor out zero counting logic
const countZeros = (instructionIntMod, absInstructionInt) => {
  // Where int > 100, reduce absolute instruction int in increments of 100 to simulate a full dial turn until remainder is <100
  while (absInstructionInt >= 100) {
    absInstructionInt = absInstructionInt - 100
    zeroCount++
  }
  // For instruction ints/remainders < 100, increment zero count if dial passes zero in either direction (excluding starting at zero)
  if (absInstructionInt < 100 && dialPosition !== 0) {
    // For left turns greater than the current dial position
    if (instructionIntMod < 0 && absInstructionInt >= dialPosition) {zeroCount++}
    // For right turns greater than or equal to the difference of 100 less the dial position
    if (instructionIntMod > 0 && absInstructionInt >= 100 - dialPosition) {zeroCount++}
  }
}
// -- Update the dial position -- accounting for sums greater than 99
const updateDialPosition = (instruction) => {
  // Represent the net dial position change amount & direction with instruction integer modulo by 100
  const instructionIntMod = getInteger(instruction) % 100
  // Represent the total amount of dial movement with the absolute val of the instruction integer
  let absInstructionInt = Math.abs(getInteger(instruction))
  // Check for dial passing zero given current instructions
  countZeros(instructionIntMod, absInstructionInt)
  // Update dial position
  dialPosition = dialPosition + instructionIntMod
  // Account for final dial position > 99 by translating to corresponding remainder
  dialPosition = dialPosition > 99 ? dialPosition = dialPosition % 100 : dialPosition
  // Account for negative final dial position by translating to corresponding positive integer
  dialPosition = dialPosition < 0 ? dialPosition = dialPosition + 100 : dialPosition
}

// Initialize dial position variable
let dialPosition = 50
// Initialize zero count variable
let zeroCount = 0

// Loop over the instructions list and execute instructions
for (index in instructionsList) {
    updateDialPosition(instructionsList[index])
  }

// Print final zero count var value once loop is complete
console.log('Zero count: ', zeroCount)