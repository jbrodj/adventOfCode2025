// ==== Advent of Code problem 5 ====

// Given a string of numbers, find the largest possible two-digit integer that can be composed by combining two
// digits from that string -- the numbers must remain in order (ie. the second digit must be to the right of the first digit)
// We will want to use the greatest possible number for the tens column of our integer, and find whatever is the largest remaining
// digit to the right of that to compose the greatest possible int.
// Since the digits must remain in order, we mustn't sort the rows. 
// This also means if there are multiple of the same greatest digit, if reading from left to right, we'll want to use the first instance
// to optimize the choice of next largest numbers to the right of it. 
// Since strings are iterable, we'll want to leave the row in its string form to allow looping over the string to find the greatest value. 
// Do this for each row in a list of strings, and sum all resulting integers. 

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
const mockBanksList = [
  '987654321111111', 
  '811111111111119', 
  '234234234234278', 
  '818181911112111'
]
// Helper functions
// -- Find greatest numeric value in a given string
const findGreatestNumber = (bank, isTensDigit) => {
  // Tens digit cannot be last digit in bank (elim last digit from loop if tens digit)
  const loopLen = isTensDigit ? bank.length - 1 : bank.length

  // Loop over input string
  let highestNum = '0'
  for (let i = 0; i < loopLen; i++) {
    // Track current highest number by comparing each char
    highestNum = bank[i] > highestNum ? bank[i] : highestNum
  }
  // console.log(highestNum)
  return highestNum
}
// -- Add highest integer to rolling sum
  // Coerce two digit string to int by adding to initialized int variable

// Initialize sum variable
let joltageSum = 0

// Loop over list of input strings
for (row in numericBanksList) {
  const currentBank = numericBanksList[row]
  const tensDigit = findGreatestNumber(currentBank, true)
  const bankSubtr = currentBank.slice(currentBank.indexOf(tensDigit) + 1)
  const onesDigit = findGreatestNumber(bankSubtr)
  const twoDigitNum = tensDigit+onesDigit

  console.log('current bank: ', currentBank)
  console.log('tens digit:', tensDigit)
  console.log('find index: ', currentBank.indexOf(tensDigit))
  console.log('substring for second digit: ', bankSubtr)
  console.log('Two digit num: ', twoDigitNum)
  maxJoltageInBank = parseInt(tensDigit + onesDigit)
  joltageSum = joltageSum + maxJoltageInBank
}

// Print sum
console.log('Joltage sum: ', joltageSum)