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

// Import and read input file

// Initialize list of numeric strings from input string

// Helper functions
// -- Find greatest numeric value in a given string

  // Loop over input string
  // Track current highest number by comparing each char
  // (Maybe track index of that char too so we can only look at substr to the right of highest num)
  // (or think of a way to be tracking the second highest num found to right of whatever current highest num is)
  // Loop over chars in string to the right of the highest number
  // Track current highest number 
  // Return two digit string
// -- Add highest integer to rolling sum
  // Coerce two digit string to int by adding to initialized int variable

// Initialize sum variable

// Loop over list of input strings

// Print sum