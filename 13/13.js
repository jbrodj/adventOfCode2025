// ==== Advent of Code problem 13 ====

// A tachyon is emitted from the character 'S' and travels downwards through the manifold.
// Tachyons move freely in empty space '.', but are split into two new tachyons by splitters '^'
// Split tachyons appear directly to the left and right of the splitter and continue moving downwards. 
// Tachyons that would be created by adjacent splitters that would occupy the same space count as one single
// tachyon, not as two. 
// The process ends when all tachyons reach the exit (beyond the last row)
// We want to know how many times a beam is split.
// To begin, we need to know the index of 'S', which we can store as our tachyon's current location
// Then at each step, all tachyons move one position downward and either 
// a) occupy their new position, or
// b) become two tachyons at the two adjacent positions, or 
// c) some of above split tachyons that would occupy the same space create one instead of two
// In each case, we record the tachyon positions and move to the next step. 
// When a tachyon moves beyond the bottom row, we can remove it from the array.
// We can continue this operation while there are more than zero tachyons in our tracking object. 
// To allow easy indexing through the rows of the manifold, we'll split the text input into an array by line.
// We can use the string index within each line to track the lateral positions
// We'll keep a counter for splits and print it.

const fs = require('fs')
const { get } = require('http')
const inputFilePath = './13-input.txt'
const readFileFromSrc = (path) => {
  try {
    const file = fs.readFileSync(path)
    return file.toString()
  } catch (error) {
    console.error('Error reading file: ', error.message)
  }
}
// Split our input into array by line
const manifoldArray = readFileFromSrc(inputFilePath).split('\n')

// Parse a line in the manifold array and return the modified next line
const runLine = (manifoldArray, lineIndex) => {
  const nextLineIndex = parseInt(lineIndex) + 1
  // If end of array, break
  if (!manifoldArray[nextLineIndex]) {
    return
  }
  const currentLine = manifoldArray[lineIndex]
  let updatedNextLine = manifoldArray[nextLineIndex]

  for (char in currentLine) {
    const currentIndex = parseInt(char)
    const currentChar = currentLine[char]
    // If char is a tachyon
    if (currentChar === 'S' || currentChar === '|') {
    // Send tachyon to line below:
      // If char at next line is a splitter
      if (manifoldArray[nextLineIndex][char] === '^') {
        const leftSplitIndex = currentIndex - 1
        const rightSplitIndex = currentIndex + 1
        // Check if either of the next line char at the split indecies are already tachyons, if not, increment split count
        if (updatedNextLine[leftSplitIndex] !== '|' || updatedNextLine[rightSplitIndex] !== '|') {
          splitCount++
          // Add tachyon chars to next line
          updatedNextLine = 
            updatedNextLine.slice(0, leftSplitIndex) + 
            '|' + 
            updatedNextLine.slice(leftSplitIndex + 1, rightSplitIndex) + 
            '|' + 
            updatedNextLine.slice(rightSplitIndex + 1)
        }
      }
      // If char at next line is empty space
      else {
        // Add tachyon char to next line
        updatedNextLine = 
          updatedNextLine.slice(0, char) + 
          '|' + 
          updatedNextLine.slice(parseInt(char) + 1)
      }
    }
  }
  return updatedNextLine
}

let splitCount = 0
const getSplitCount = (manifoldArray) => {
  // For each line in the manifold, update the next line with positions of tachyons from current line
  for (line in manifoldArray) {
    const nextLineIndex = parseInt(line) + 1
    const nextLine = runLine(manifoldArray, line)
    manifoldArray[nextLineIndex] = nextLine ? nextLine : manifoldArray[nextLineIndex]
  }
  return splitCount
}
console.log('Final split count: ', getSplitCount(manifoldArray))
