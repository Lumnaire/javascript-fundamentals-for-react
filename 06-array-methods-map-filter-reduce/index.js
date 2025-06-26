console.log("--- ES6 Array Methods: map, filter, reduce ---");

// =====================================
// 1. Array.prototype.map()
//    - Creates a NEW array by calling a provided function on every element in the calling array.
//    - Does NOT modify the original array.
// =====================================

console.log("\n--- Demonstrating 'map()' ---");

const numbers = [1, 2, 3, 4, 5];

// 1.1. Doubling each number
const doubledNumbers = numbers.map(num => num * 2);
console.log("Original numbers:", numbers);      // Output: [ 1, 2, 3, 4, 5 ]
console.log("Doubled numbers (map):", doubledNumbers); // Output: [ 2, 4, 6, 8, 10 ]

// 1.2. Transforming array of objects
const users = [
    { id: 1, name: "Alice", active: true },
    { id: 2, name: "Bob", active: false },
    { id: 3, name: "Charlie", active: true }
];

// Extract just the names
const userNames = users.map(user => user.name);
console.log("User names (map):", userNames); // Output: [ 'Alice', 'Bob', 'Charlie' ]

// Return a new array of objects with only id and name, and an added property
const userSummaries = users.map(user => ({
    userId: user.id,
    userName: user.name,
    status: user.active ? "Active" : "Inactive"
}));
console.log("User summaries (map):", userSummaries);
/* Output:
[
  { userId: 1, userName: 'Alice', status: 'Active' },
  { userId: 2, userName: 'Bob', status: 'Inactive' },
  { userId: 3, userName: 'Charlie', status: 'Active' }
]
*/


// =====================================
// 2. Array.prototype.filter()
//    - Creates a NEW array with all elements that pass the test implemented by the provided function.
//    - Does NOT modify the original array.
// =====================================

console.log("\n--- Demonstrating 'filter()' ---");

const ages = [25, 18, 12, 30, 45, 16];

// 2.1. Filtering for adults (age >= 18)
const adults = ages.filter(age => age >= 18);
console.log("Original ages:", ages);      // Output: [ 25, 18, 12, 30, 45, 16 ]
console.log("Adults (filter):", adults); // Output: [ 25, 18, 30, 45 ]

// 2.2. Filtering objects based on a property
const activeUsers = users.filter(user => user.active);
console.log("Active users (filter):", activeUsers);
/* Output:
[
  { id: 1, name: 'Alice', active: true },
  { id: 3, name: 'Charlie', active: true }
]
*/

// 2.3. Filtering based on string criteria
const products = ["Laptop", "Mouse", "Keyboard", "Monitor", "Webcam"];
const longNameProducts = products.filter(product => product.length > 6);
console.log("Long name products (filter):", longNameProducts); // Output: [ 'Laptop', 'Keyboard', 'Monitor', 'Webcam' ]


// =====================================
// 3. Array.prototype.reduce()
//    - Executes a reducer function (provided by you) on each element of the array,
//      resulting in a single output value.
//    - Does NOT modify the original array.
//    - Takes a callback function and an optional initial value for the accumulator.
// =====================================

console.log("\n--- Demonstrating 'reduce()' ---");

// 3.1. Summing all numbers in an array
const prices = [10.50, 20.00, 5.25, 14.75];
const totalSum = prices.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log("Total sum (reduce):", totalSum); // Output: 50.5

// 3.2. Counting occurrences of items
const fruitsBasket = ["apple", "banana", "apple", "orange", "banana", "apple"];
const fruitCounts = fruitsBasket.reduce((counts, fruit) => {
    counts[fruit] = (counts[fruit] || 0) + 1;
    return counts;
}, {}); // Initial value is an empty object {}
console.log("Fruit counts (reduce):", fruitCounts); // Output: { apple: 3, banana: 2, orange: 1 }

// 3.3. Flattening an array of arrays
const arrayOfArrays = [[1, 2], [3, 4], [5, 6]];
const flattenedArray = arrayOfArrays.reduce((accumulator, currentArray) => {
    return accumulator.concat(currentArray);
}, []); // Initial value is an empty array []
console.log("Flattened array (reduce):", flattenedArray); // Output: [ 1, 2, 3, 4, 5, 6 ]

// 3.4. Chaining array methods
const students = [
    { name: "Eve", score: 85, passed: true },
    { name: "Frank", score: 40, passed: false },
    { name: "Grace", score: 92, passed: true },
    { name: "Heidi", score: 78, passed: true }
];

// Get the average score of only the students who passed
const averagePassedScore = students
    .filter(student => student.passed) // Filter out failing students
    .map(student => student.score)     // Get only their scores
    .reduce((sum, score) => sum + score, 0) // Sum the scores
    / students.filter(student => student.passed).length; // Divide by count of passed students

console.log("Average score of passed students:", averagePassedScore); // Output: 85


console.log("\n--- Summary ---");
console.log("map(): Transforms each element into a new array.");
console.log("filter(): Selects elements that meet a condition into a new array.");
console.log("reduce(): Accumulates a single value by iterating over elements.");
console.log("These methods are essential for immutable data manipulation in React and functional programming.");
