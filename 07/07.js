// ==== Advent of Code problem 7 ====

// A roll of paper ('@') is accessible in a block of text if that roll is adjacent to fewer than four other rolls of paper in
// the eight adjacent positions. Task is to sum the num of rolls of paper than can be accessed. 
// Converting the block of txt to an array of strings (by new line) allows us to index in 2 dimensions
// So we need to loop over each index in each string in the array, (n), and for each index, check the vals of each adjacent 
// char (k) (up, down, left, right, and each diagonal). If <4, we increment our counter. We need an algorithm that can easily
// loop over the adjacent values. Accounting for nonexistent indecies where a char is at the boundary of the array/string (
// ie. index 0[0] doesn't have anything to its left/top)
// We can break out of the inner loop once we reach a value of 4 to avoid increasing the value of k unnecessarily.
// We can move on to the next char if the current char is not a roll of paper to avoid running the k loop when not needed.
// The algorithm for checking the adjacent indecies (if they exist) for a given index (row[index]) can be expressed as:
  // -- row-1[index-1], row-1[index], row-1[index+1], row[index-1], row[index+1], row+1[index-1], row+1[index], row+1[index+1]

const mockArr = [
  '..@@.@@@@.',
  '@@@.@.@.@@',
  '@@@@@.@.@@',
  '@.@@@@..@.',
  '@@.@@@@.@@',
  '.@@@@@@@.@',
  '.@.@.@.@@@',
  '@.@@@.@@@@',
  '.@@@@@@@@.',
  '@.@.@@@.@.'
]
