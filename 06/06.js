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

