// ==== Advent of Code problem 17 ====

// A floor has some number of red tiles and the rest of other colours
// We wish to find, given a pattern of floor tiles, what is the largest possible rectangle we can transcribe with two
// opposite corners being red tiles.
// The input is a line-separated list of x-y coordinates given as integers
// We can calculate the sizes of the rectangles by finding the x and y distances between a given red tile and each other red tile
// adding one to the result to account for the space taken up by the lower numbered tile itself
// -- muiltiplying them gives us the area of the rectangle.
// We can loop over our input to find and store the coordinates of each red tile in an array
// Then nested loop over our red tiles, calculating the size of the rectangle transcribed by the current tile and each other tile
// -- reducing the size of the inner loop each time because we've already calculated 
// We can track the largest area so far and replace that value if we find a larger one, returning the largest area at the end

const fs = require('fs')
const inputFilePath = './17-input.txt'
const readFileFromSrc = (input) => {
  try {
    const file = fs.readFileSync(input)
    return file.toString()
  } catch (error) {
    console.error('Error reading file: ', error.message)
  }
}
// Split our input into a list of arrays for easy indexing of each coordinate
const inputStr = readFileFromSrc(inputFilePath).trim().split('\n')
const coordinateArray = inputStr.map((index) => index.split(','))

// Given two sets of x-y coordinates, as [x, y], return area of a rectangle transcribing those points
const findArea = (coord1, coord2) => {
  const x = Math.abs(coord1[0] - coord2[0] + 1)
  const y = Math.abs(coord1[1] - coord2[1] + 1)
  // console.log(x, y, x * y)
  return x * y
}

// For each coordinate in a given array, compare area against largest area found so far (reducing size of inner loop each iteration to avoid duplcation)
const findLargestArea = (coordinateArray) => {
  let largestArea = 0
  const len = coordinateArray.length
  for (coordinateIndex in coordinateArray) {
    for (let i = parseInt(coordinateIndex) + 1; i < len; i++) {
      const currentArea = findArea(coordinateArray[coordinateIndex], coordinateArray[i])
      // console.log(coordinateArray[coordinateIndex], '|', coordinateArray[i], '|', currentArea)
      largestArea = currentArea > largestArea ? currentArea : largestArea
    }
  }
  return largestArea
}

console.log(findLargestArea(coordinateArray))