// ==== Advent of Code problem 11 ====

// This problem's input set contains subsets of numbers with an operator (* or +) describing whether we need to add or multiply those nums.
// Each subset is arranged vertically (ie. the first num of the first set is the leftmost number on line 1, the next num of
// the first set is the leftmost number on line 2, etc). The operator for each set is the corresponding char on the last line. 
// The task is to perform each operation for each "column" of nums, and sum the result of each operation for a grand total. 
// We'll need to organize the text input into something more useable. 
// -- Splitting into an array by new line seems like a good start
// -- Then splitting each line by empty space ' ' provides us a 2d array with each line represented by an index, 
// -- and each column indexed within each line. 
// But we need to operate on the column -- so the outer loop, i would be the index of the "column", and j would be the index
// of the line
// We can check the operator of that given column by looking at arr.length index of the given column, and exclude that last
// row from the arithmetic loop 
// Since we're performing arithmetic operations on these numeric strings, we'll need to convert them to ints.

const mockInput = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `
