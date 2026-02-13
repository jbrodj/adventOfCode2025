// ==== Advent of Code problem 12 ==== 

// Now we need to read our data differently -- the nums in our text input are read right-to-left, top-to-bottom
// So we need to organize and/or read our data structure differently. 
// Each integer needs to be composed by checking three values (if they exist). 
// But our arithmetic operations are still contained within a "column", so we can loop over the same columns as before.
// For each column, we can compose each num and perform the operation. 
// Nums are composed top to bottom. 
// The nums in our data are strings, so we can access each digit by its index, and access the length property of each str.
// So if we use the same data structure as the last solution, the rightmost integer in a given column would be composed by:
  // Finding the length of the longest numeric string in the data.
  // Accessing the digit at the corresponding last index in each numeric string (if it exists), top to bottom.  
  // Then moving to the last-index - 1 and doing the same. Remembering to account for digits that don't exist. 
  // Leaving these values as strings will make them simpler to compose -- we can simply concat the next digit. 
// But actually this isn't a good plan -- creating an array by splitting on the space char will elinimate 
// vital data -- the positions of the spaces as they orient each char into their proper index in the operational column.
// We need to preserve the position of the emppty spaces -- so instead of creating a 2d array, let's break the txt block into
// an array by linebreak so we have access to rows by the array indecies, and simply run our arithmetic operation on each
// char index. 
// Since the set has an operator in the leftmost digit and empty spaces in the other digits, we can use that digit
// to track where an operational column begins and ends.

