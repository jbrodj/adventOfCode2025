// ==== Advent of Code problem 5 ====

// Given a string (bank) of numbers, find the largest possible two-digit integer that can be composed by combining two
// digits from that string -- the numbers must remain in order (ie. the second digit must be to the right of the first digit)
// We will want to use the greatest possible number for the tens column of our integer, and find whatever is the largest remaining
// digit to the right of that to compose the greatest possible int.
// Since the digits must remain in order, we mustn't sort the rows. 
// This also means if there are multiple of the same greatest digit, if reading from left to right, we'll want to use the first instance
// to optimize the choice of next largest numbers to the right of it. 
// Since strings are iterable, we'll want to leave the row in its string form to allow looping over the string to find the greatest value. 
// Do this for each row in a list of banks, and sum all resulting integers to find total max value (joltage value). 

// Import and read input file using node fs and return string
const fs = require('fs')
const inputFilePath = './05-input.txt'
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

// Helper functions
// -- Find greatest numeric value in a given string bank
const findGreatestNumber = (bank, isTensDigit) => {
  // Tens digit cannot be last digit in bank (elim last digit from loop if tens digit)
  const loopLen = isTensDigit ? bank.length - 1 : bank.length
  let highestNum = '0'
  for (let i = 0; i < loopLen; i++) {
    // Track current highest number by comparing each char to prev highest found
    highestNum = bank[i] > highestNum ? bank[i] : highestNum
  }
  return highestNum
}
// Initialize sum variable
let joltageSum = 0

// Loop over list of input strings
for (row in numericBanksList) {
  const currentBank = numericBanksList[row]
  // Get num for tens digit
  const tensDigit = findGreatestNumber(currentBank, true)
  // Get num for ones digit from substring of chars to right of tens digit num
  const bankSubtr = currentBank.slice(currentBank.indexOf(tensDigit) + 1)
  const onesDigit = findGreatestNumber(bankSubtr)
  // Compose two-digit num str and convert to int
  maxJoltageInBank = parseInt(tensDigit + onesDigit)
  // Add integer to rolling sum
  joltageSum = joltageSum + maxJoltageInBank
}

// Print sum
console.log('Joltage sum: ', joltageSum)