// ==== Advent of Code problem 2 ====

// Instead of counting the instances where the dial points at zero at the end of an instruction, 
// we now also want to count those instances where a dial would point to zero during an instruction.
// Ie. dial position 50, instruction R1000 would cause multiple zero position counts

// To accomplish this, we could add logic that subtracts the current position of the dial 
// from each instruction (if the instruction is great enough to push us to zero from one
// direction or the other). 
// For ex:
// For a R turn, the instruction has to be >= 100 - the current dial position to reach zero
// For a L turn, the unstruction has to be >= the current dial position to reach zero. 

// While instruction integer is negative, and integer is <= -100, add 100 to integer, and ++ zero count, then
// While instruction integer is negative, and integer is >100, and absolute value of int >= current dial position, add integer to dial position and ++ zero count

// While instruction integer is positive, and integer is >= 100, subtract 100 from integer, and ++ zero count, then
// While instruction integer is positive, and integer is <100, and value of int >= current dial position, add integer to dial position and ++ zero count. 
// Both above --> Accounting for times when the dial ends on zero -- this means we can eliminate the original zero counting function.

// Possibly using a new var of absolute value of the instruction integer for the loop, to avoid needing to duplicate the logic for pos/neg values. 

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
const mockInstructions = ['L68', 'L30', 'R48', 'L5', 'R60', 'L55', 'L1', 'L99', 'R14', 'L82']

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
// -- Update the dial position -- accounting for sums greater than 99
const updateDialPosition = (instruction) => {
  // Represent the net dial position change amount & direction with instruction integer modulo by 100
  const instructionIntMod = getInteger(instruction) % 100
  // Represent the total amount of dial movement with the absolute val of the instruction integer
  let absInstructionInt = Math.abs(getInteger(instruction))
  console.log('Dial position: ', dialPosition)
  console.log('Zero count: ', zeroCount)
  console.log('Int: ', instructionIntMod, absInstructionInt)
  // Loop to reduce absolute instruction int in increments of 100 to simulate a full dial turn until remainder is <100
  while (absInstructionInt >= 100) {
    absInstructionInt = absInstructionInt - 100
    zeroCount++
  }
  // For instruction ints < 100, increment zero count if dial passes zero in either direction
  if (absInstructionInt < 100 && dialPosition !== 0) {
    // For left turns greater than the current dial position
    if (instructionIntMod < 0 && absInstructionInt >= dialPosition) {zeroCount++ 
      console.log('neg zero out')}
    // For right turns greater than the difference of 100 less the dial position
    if (instructionIntMod > 0 && absInstructionInt >= 100 - dialPosition) {zeroCount++
      console.log('pos zero out')
    }
  }
  dialPosition = dialPosition + instructionIntMod
  // Account for dial position > 99 by translating to corresponding remainder
  dialPosition = dialPosition > 99 ? dialPosition = dialPosition % 100 : dialPosition
  // Account for negative dial position by translating to corresponding positive integer
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
  // for (index in mockInstructions) {
  //   updateDialPosition(mockInstructions[index])
  // }
  
console.log('Dial position: ', dialPosition)
// Print final zero count var value once loop is complete
console.log('Zero count: ', zeroCount)