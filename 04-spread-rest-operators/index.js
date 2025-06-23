// index.js for 04-spread-rest-operators

console.log("--- ES6 Spread and Rest Operators ---");

// =====================================
// 1. Spread Operator (...) for Arrays
//    - Expands an iterable (like an array) into individual elements.
// =====================================

console.log("\n--- Spread Operator with Arrays ---");

const fruits = ["apple", "banana", "cherry"];
const moreFruits = ["date", "elderberry"];

// 1.1. Combining Arrays
// Creates a new array by spreading elements of existing arrays
const allFruits = [...fruits, ...moreFruits, "fig"];
console.log("Combined arrays:", allFruits); // Output: [ 'apple', 'banana', 'cherry', 'date', 'elderberry', 'fig' ]

// 1.2. Copying Arrays (Shallow Copy)
// Creates a new array with the same elements. Modifying `copiedFruits` won't affect `fruits`.
const copiedFruits = [...fruits];
copiedFruits.push("grape");
console.log("Original fruits after copy:", fruits);       // Output: [ 'apple', 'banana', 'cherry' ]
console.log("Copied fruits with new item:", copiedFruits); // Output: [ 'apple', 'banana', 'cherry', 'grape' ]

// 1.3. Adding Elements to an Array
const newFruits = ["apricot", ...fruits, "kiwi"];
console.log("Adding elements:", newFruits); // Output: [ 'apricot', 'apple', 'banana', 'cherry', 'kiwi' ]

// 1.4. Passing Array Elements as Function Arguments
function sum(a, b, c) {
    return a + b + c;
}
const numbers = [1, 2, 3];
console.log("Sum using spread for args:", sum(...numbers)); // Output: 6


// =====================================
// 2. Spread Operator (...) for Objects
//    - Copies properties from one object to another.
//    - Used for shallow copies and merging objects.
// =====================================

console.log("\n--- Spread Operator with Objects ---");

const user = { name: "Alice", age: 30 };
const address = { city: "London", country: "UK" };

// 2.1. Combining Objects (Merging)
// Creates a new object with properties from `user` and `address`
const userWithAddress = { ...user, ...address };
console.log("Combined objects:", userWithAddress);
// Output: { name: 'Alice', age: 30, city: 'London', country: 'UK' }

// 2.2. Copying Objects (Shallow Copy)
const copiedUser = { ...user };
copiedUser.age = 31;
console.log("Original user after copy:", user);         // Output: { name: 'Alice', age: 30 }
console.log("Copied user with new age:", copiedUser);   // Output: { name: 'Alice', age: 31 }

// 2.3. Updating Object Properties (Non-Mutating)
// Creates a new object with updated 'age', leaving original 'user' unchanged
const updatedUser = { ...user, age: 32, email: "alice@example.com" };
console.log("Original user after update:", user);           // Output: { name: 'Alice', age: 30 }
console.log("Updated user with new age and email:", updatedUser);
// Output: { name: 'Alice', age: 32, email: 'alice@example.com' }

// 2.4. Order Matters for Duplicate Keys
const defaults = { role: "guest", theme: "light" };
const admin = { theme: "dark", role: "admin", permissions: ["manage"] };
const adminSettings = { ...defaults, ...admin }; // 'admin' properties override 'defaults'
console.log("Merged with override:", adminSettings);
// Output: { role: 'admin', theme: 'dark', permissions: [ 'manage' ] }

const settingsWithDefaults = { ...admin, ...defaults }; // 'defaults' properties won't override 'admin'
console.log("Merged with defaults secondary:", settingsWithDefaults);
// Output: { theme: 'dark', role: 'admin', permissions: [ 'manage' ] }


// =====================================
// 3. Rest Operator (...)
//    - Gathers remaining elements/properties into a new array/object.
//    - Used in function parameters or destructuring.
// =====================================

console.log("\n--- Rest Operator ---");

// 3.1. Rest in Function Parameters
function calculateAverage(name, ...grades) { // 'grades' becomes an array of all remaining arguments
    const sum = grades.reduce((acc, current) => acc + current, 0);
    return `${name}'s average: ${sum / grades.length}`;
}
console.log(calculateAverage("Mathieu", 90, 85, 95, 88)); // Output: Mathieu's average: 89.5
console.log(calculateAverage("Sarah", 70, 75)); // Output: Sarah's average: 72.5

// 3.2. Rest in Array Destructuring
const [firstItem, secondItem, ...otherItems] = ["A", "B", "C", "D", "E"];
console.log("First item:", firstItem);     // Output: A
console.log("Second item:", secondItem);   // Output: B
console.log("Other items:", otherItems); // Output: [ 'C', 'D', 'E' ]

// 3.3. Rest in Object Destructuring
const product = {
    id: "p123",
    name: "Laptop",
    price: 1200,
    category: "Electronics",
    inStock: true
};

const { id, name: productName, ...details } = product; // 'details' becomes an object with remaining properties
console.log("Product ID:", id);                 // Output: p123
console.log("Product Name:", productName);      // Output: Laptop
console.log("Product Details:", details);       // Output: { price: 1200, category: 'Electronics', inStock: true }

console.log("\n--- Summary ---");
console.log("Spread: Expands iterables (arrays/strings) or copies object properties.");
console.log("Rest: Gathers remaining elements into an array or object.");
console.log("Both are critical for functional programming and immutable data patterns in React.");
