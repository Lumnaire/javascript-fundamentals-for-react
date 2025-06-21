

console.log("--- ES6 Destructuring ---");

// =====================================
// 1. Object Destructuring
//    - Extracts properties from objects into distinct variables.
// =====================================

console.log("\n--- Object Destructuring ---");

const userProfile = {
    firstName: "Jane",
    lastName: "Doe",
    age: 28,
    city: "New York"
};

// 1.1. Basic Object Destructuring
// Variables `firstName`, `lastName`, `age` are created and assigned values
const { firstName, lastName, age } = userProfile;
console.log("Basic:", firstName, lastName, age); // Output: Jane Doe 28

// 1.2. Destructuring with Different Variable Names (Alias)
// `fullName` gets the value of `firstName`, `personAge` gets the value of `age`
const { firstName: fullName, age: personAge } = userProfile;
console.log("With alias:", fullName, personAge); // Output: Jane 28
// console.log(firstName); // Throws ReferenceError: firstName is not defined (because we aliased it)

// 1.3. Destructuring with Default Values
// `country` is not in userProfile, so it defaults to "USA"
const { city, country = "USA" } = userProfile;
console.log("With default value:", city, country); // Output: New York USA

const { zipcode = "10001" } = userProfile;
console.log("Default only (not in object):", zipcode); // Output: 10001

// 1.4. Nested Object Destructuring
const company = {
    name: "Tech Solutions",
    location: {
        address: "123 Main St",
        zip: "90210"
    },
    employees: 50
};

const { name, location: { address, zip }, employees } = company;
console.log("Nested:", name, address, zip, employees); // Output: Tech Solutions 123 Main St 90210 50

// 1.5. Destructuring in Function Parameters
function displayUser({ firstName, lastName, age, city = "Unknown" }) {
    console.log(`User: ${firstName} ${lastName}, Age: ${age}, City: ${city}`);
}
displayUser(userProfile); // Output: User: Jane Doe, Age: 28, City: New York
displayUser({ firstName: "John", lastName: "Smith", age: 35 }); // Output: User: John Smith, Age: 35, City: Unknown


// =====================================
// 2. Array Destructuring
//    - Extracts values from arrays into distinct variables based on position.
// =====================================

console.log("\n--- Array Destructuring ---");

const rgbColors = ["red", "green", "blue", "alpha"];

// 2.1. Basic Array Destructuring
const [color1, color2, color3] = rgbColors;
console.log("Basic:", color1, color2, color3); // Output: red green blue

// 2.2. Skipping Elements
// Use commas to skip elements you don't need
const [,, thirdColor] = rgbColors;
console.log("Skipping elements:", thirdColor); // Output: blue

// 2.3. Destructuring with Default Values
const [first, second, , fourth, fifth = "white"] = rgbColors;
console.log("With default value:", first, second, fourth, fifth); // Output: red green alpha white

// 2.4. Destructuring with the Rest Pattern
// The rest pattern collects remaining elements into a new array
const [primary, ...secondaryColors] = rgbColors;
console.log("With rest pattern (primary):", primary);       // Output: red
console.log("With rest pattern (secondary):", secondaryColors); // Output: [ 'green', 'blue', 'alpha' ]

// 2.5. Swapping Variables (a classic use case)
let num1 = 10;
let num2 = 20;
console.log(`Before swap: num1=${num1}, num2=${num2}`); // Output: Before swap: num1=10, num2=20
[num1, num2] = [num2, num1]; // Swap values using destructuring
console.log(`After swap: num1=${num1}, num2=${num2}`);  // Output: After swap: num1=20, num2=10


// =====================================
// 3. Mixed Destructuring (e.g., Array of Objects)
// =====================================

console.log("\n--- Mixed Destructuring ---");

const students = [
    { id: 1, name: "Anna", grade: "A" },
    { id: 2, name: "Ben", grade: "B" }
];

// Destructure the first student object from the array
const [{ name: firstStudentName, grade }] = students;
console.log("First student's name and grade:", firstStudentName, grade); // Output: Anna A

console.log("\n--- Summary ---");
console.log("Destructuring provides a concise way to extract values from arrays and objects.");
console.log("It enhances readability and is extensively used in modern JavaScript and React for props, state, and function parameters.");

