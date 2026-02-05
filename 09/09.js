// ==== Advent of Code problem 9 ====

// Given a list of valid (fresh) ranges, we want to check whether each number in a list of IDs is "fresh"
// Ranges are inclusive (ie. the terminal nums in the range are fresh)
// An ID may appear in multiple ranges
// Input is provided as text -- lines of ranges, an empty line, followed by lines of ID nums.
// For each ID in the IDs list (n), for each range (k) we can check if its value is >= the start of the range and 
// <= the end of the range. So no looping needed thru the range itself. 
// Once an ID is found in a range, we don't need to continue the inner loop. 
// If we know the data will always be sorted (which we don't know for certain, but the sample data happens to be sorted),
// we could use a search algorithm to check one set of nums against the other without needing an inner loop over k. 
// (ie. for num in range, check inex nums.length / 2 >/=/< the num in range)
// Want to consider which set (the ranges or the IDs) to use as the outer loop... Does either strategy present 
// ways to optimize that the other doesn't? 
// We can break the list into two arrays by checking for the empty line. 

const mockInput = `
3-5
10-14
16-20
12-18

1
5
8
11
17
32
`
