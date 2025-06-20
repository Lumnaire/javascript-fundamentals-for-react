console.log("--- ES6 Variables and Scope ---");

// =====================================
// 1. var Keyword
//    - Function-scoped or globally-scoped.
//    - Can be re-declared and re-assigned.
//    - Hoisted to the top of its scope (initialized with undefined).
// =====================================

console.log("\n--- Demonstrating 'var' ---");

// 1.1. 'var' and Hoisting
// 'x' is hoisted, so this doesn't throw an error, but logs undefined.
console.log("Value of x before declaration (var):", x); // Output: undefined
var x = 10;
console.log("Value of x after declaration (var):", x);  // Output: 10

// 1.2. 'var' and Function Scope
function demonstrateVarScope() {
    var y = 20;
    console.log("Inside function (var y):", y); // Output: 20

    if (true) {
        var z = 30; // 'var' ignores block scope (like if, for loops)
        console.log("Inside if block (var z):", z); // Output: 30
    }
    console.log("Outside if block but inside function (var z):", z); // Output: 30 (z is still accessible)
}
demonstrateVarScope();
// console.log("Outside function (var y):", y); // Throws ReferenceError: y is not defined
// console.log("Outside function (var z):", z); // Throws ReferenceError: z is not defined

// 1.3. 'var' Re-declaration and Re-assignment
var a = 5;
console.log("Initial var a:", a); // Output: 5
var a = 15; // Re-declaration is allowed
console.log("Re-declared var a:", a); // Output: 15
a = 25; // Re-assignment is allowed
console.log("Re-assigned var a:", a); // Output: 25

// =====================================
// 2. let Keyword
//    - Block-scoped.
//    - Cannot be re-declared in the same scope, but can be re-assigned.
//    - Hoisted to the top of its block (but in a "temporal dead zone" - TDZ).
// =====================================

console.log("\n--- Demonstrating 'let' ---");

// 2.1. 'let' and Hoisting (Temporal Dead Zone)
// console.log("Value of p before declaration (let):", p); // Throws ReferenceError: Cannot access 'p' before initialization
let p = 100;
console.log("Value of p after declaration (let):", p); // Output: 100

// 2.2. 'let' and Block Scope
function demonstrateLetScope() {
    let q = 200;
    console.log("Inside function (let q):", q); // Output: 200

    if (true) {
        let r = 300; // 'let' is block-scoped
        console.log("Inside if block (let r):", r); // Output: 300
    }
    // console.log("Outside if block but inside function (let r):", r); // Throws ReferenceError: r is not defined
    // r is not accessible here
}
demonstrateLetScope();

// Example of 'let' in a loop (common 'var' pitfall solved)
console.log("\nLoop with 'var' vs 'let':");
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log("var loop (after 10ms):", i); // Output: 3, 3, 3 (i is function-scoped and modified by loop completion)
    }, 10);
}

for (let j = 0; j < 3; j++) {
    setTimeout(function() {
        console.log("let loop (after 20ms):", j); // Output: 0, 1, 2 (j is block-scoped, a new j for each iteration)
    }, 20);
}

// 2.3. 'let' Re-declaration and Re-assignment
let b = 50;
console.log("Initial let b:", b); // Output: 50
// let b = 55; // Throws SyntaxError: Identifier 'b' has already been declared
b = 60; // Re-assignment is allowed
console.log("Re-assigned let b:", b); // Output: 60

// =====================================
// 3. const Keyword
//    - Block-scoped.
//    - Cannot be re-declared and cannot be re-assigned after initialization.
//    - Hoisted to the top of its block (but in a Temporal Dead Zone - TDZ).
//    - MUST be initialized at declaration.
// =====================================

console.log("\n--- Demonstrating 'const' ---");

// 3.1. 'const' Initialization Requirement
// const uninitializedConst; // Throws SyntaxError: Missing initializer in const declaration

// 3.2. 'const' Re-assignment
const PI = 3.14159;
console.log("Value of const PI:", PI); // Output: 3.14159
// PI = 3.14; // Throws TypeError: Assignment to constant variable.

// 3.3. 'const' with Objects/Arrays (Important Nuance)
// 'const' prevents re-assignment of the variable itself,
// but NOT modification of the object/array properties it points to.
const user = { name: "Alice", age: 30 };
console.log("Initial const object:", user); // Output: { name: 'Alice', age: 30 }

user.age = 31; // This is allowed - modifying a property of the object
console.log("Modified property of const object:", user); // Output: { name: 'Alice', age: 31 }

// user = { name: "Bob", age: 25 }; // This is NOT allowed - re-assigning the 'user' variable itself
// Throws TypeError: Assignment to constant variable.

const colors = ["red", "green"];
console.log("Initial const array:", colors); // Output: [ 'red', 'green' ]

colors.push("blue"); // This is allowed - modifying the array
console.log("Modified const array:", colors); // Output: [ 'red', 'green', 'blue' ]

// colors = ["yellow", "purple"]; // This is NOT allowed - re-assigning the 'colors' variable itself
// Throws TypeError: Assignment to constant variable.

console.log("\n--- Summary ---");
console.log("var: Function-scoped, can be re-declared/re-assigned, hoisted (undefined).");
console.log("let: Block-scoped, cannot be re-declared, can be re-assigned, hoisted (TDZ).");
console.log("const: Block-scoped, cannot be re-declared/re-assigned, hoisted (TDZ), must be initialized.");

