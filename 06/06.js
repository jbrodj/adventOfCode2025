// ==== Advent of Code problem 6 ====

// Now instead of producing the largest two-digit integer per bank, we wish to produce the
// largest twelve-digit integer per bank. 
// Strategically, this could be achieved thru a combo of assuring the largest possible first digit
// (making sure to leave at least eleven succeeding digits) AND by dropping the lowest numeric values
// from the remaining part of the string. 
// Ie. 898765432111111 --> 987654321111
// So this could look like:
// -- Finding the largest digit among the first n digits where n = str.length = 11
// -- Dropping the lowest of the remaining digits until lengths is 12
// Oh actually, we'd still want to prioritize leftmost digits beyond the first...
// So any given index in the final number theoretically has a number of possible "deletions" it can support 
// equal to the bank str length minus n (12 minus that digit's position) (until we reach a point where there are only
// 12 - position digits remaining in the original bank string). 

const NUM_OF_BATTERIES_PER_BANK = 12

const fs = require('fs')
const inputFilePath = '../05/05-input.txt'
const readFileFromSrc = (path) => {
  try {
    const file = fs.readFileSync(path)
    return file.toString()
  } catch (error) {
    console.error('Error reading file: ', error.message)
  }
}
const numericBanksStr = readFileFromSrc(inputFilePath)

// Initialize list of numeric banks from input string
const numericBanksList = numericBanksStr.split('\n')

// For given bank (str) of nums, and num of digits (int), return largest integer of that many digits
//  that can be composed from the given bank without changing the order
const composeMaxJoltageNum = (bank, numOfDigits) => {
  // Init str to compose output number
  let outputNum = ''
  let startIndex = 0
  // For each 'space' in our output number up to the num of digits required
  for (let outputIndex = startIndex; outputIndex < numOfDigits; outputIndex++) {
    // Find the "end" of the bank (ie. the last digit where enough remaining digits are present to complete the output number)
    const endIndex = bank.length - (numOfDigits  - outputNum.length) + 1
    let largestDigit = '0'
    let chosenDigitIndex 
    // Loop over the bank, from the index of the last chosen digit to the "end"
    for (let bankIndex = startIndex; bankIndex < endIndex; bankIndex++) {
      // Find the largest digit remaining within that range
      if (bank[bankIndex] > largestDigit) {
        // Update largest digit
        largestDigit = bank[bankIndex]
        // Store index of that digit
        chosenDigitIndex = bankIndex
      }
    }
    // Concat the chosen digit to our output num 
    outputNum += largestDigit
    // Update start digit to the chosen digit plus 1
    startIndex = chosenDigitIndex + 1
  }
  return parseInt(outputNum)
}

let maxJolstageSum = 0
// Loop over list of banks
for (bank in numericBanksList) {
  // Find max joltage and add to rolling sum
  maxJolstageSum += composeMaxJoltageNum(numericBanksList[bank], NUM_OF_BATTERIES_PER_BANK)

}
console.log('Max joltage sum: ', maxJolstageSum)
