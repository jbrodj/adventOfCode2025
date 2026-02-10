// ==== Advent of Code problem 10 ==== 

// Now instead of counting the number of fresh ingredients in the list, we want to find out how many
// fresh ingredients are implied by the given ranges. 
// So the set of ingredient numbers is now irrelevant.
// We only want to count the num of IDs in all of the list of ranges (accounting for ranges that overlap)
// We could do this by creating FreshIds array to store each fresh ID -- loop over each range, check new array for 
// an instance of that value, if it isn't there, add it. 
// Then we can simply check the length of the array to find the number of fresh ingredients. 
// But it turns out this would have very bad performance because we're increasing the size of k by a large factor.
// Instead, let's loop through our subset of n and count the difference between the upper limit and lower limit of 
// each range (inclusive), making sure to account for overlapping ranges. We'll have to sort the input array, which adds
// time complexity. 
