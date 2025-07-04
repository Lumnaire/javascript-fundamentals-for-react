console.log("--- ES6 'this' Keyword and Context ---");

// =====================================
// Understanding 'this'
// 'this' is a special keyword that refers to the context in which a function is executed.
// Its value is determined by HOW a function is called, not where it's defined.
// =====================================

// =====================================
// 1. Global Context
//    - In the global scope (outside any function), 'this' refers to the global object.
//    - In browsers, this is `window`. In Node.js, it's `global` or `undefined` in strict mode.
// =====================================

console.log("\n--- 1. Global Context ---");
console.log("Global 'this' (outside any function):", this); // In Node.js, this might be {} or global object

// In a browser, uncommenting the line below would show `window`
// console.log("Global 'this' in browser:", window === this);


// =====================================
// 2. Function Context (Regular Functions)
//    - In non-strict mode, 'this' defaults to the global object (`window` or `global`).
//    - In strict mode, 'this' is `undefined`.
// =====================================

console.log("\n--- 2. Function Context (Regular Functions) ---");

function showThis() {
    console.log("Regular function 'this':", this);
}

showThis(); // Called directly, 'this' refers to global object (or undefined in strict mode)

// Example with strict mode (add 'use strict' at the top of a file or function)
function showThisStrict() {
    "use strict";
    console.log("Regular function 'this' (strict mode):", this); // Output: undefined
}
showThisStrict();

// =====================================
// 3. Method Context (Functions as Object Properties)
//    - When a function is called as a method of an object, 'this' refers to the object itself.
// =====================================

console.log("\n--- 3. Method Context ---");

const car = {
    brand: "Toyota",
    model: "Camry",
    drive: function() {
        console.log(`Driving a ${this.brand} ${this.model}.`); // 'this' refers to 'car' object
    },
    owner: {
        name: "John",
        getOwnerName: function() {
            console.log(`Owner is ${this.name}.`); // 'this' refers to 'owner' object
        }
    }
};

car.drive();        // Output: Driving a Toyota Camry.
car.owner.getOwnerName(); // Output: Owner is John.

// Problem: Losing 'this' context when method is extracted
const standaloneDrive = car.drive;
// standaloneDrive(); // If run directly, 'this' will be global/undefined, causing error: Cannot read properties of undefined (reading 'brand')


// =====================================
// 4. Constructor Context (Functions called with 'new')
//    - When a function is used as a constructor (with `new` keyword), 'this' refers to the newly created instance.
// =====================================

console.log("\n--- 4. Constructor Context ---");

function Person(name, age) {
    this.name = name; // 'this' refers to the new Person instance
    this.age = age;
    this.introduce = function() {
        console.log(`Hi, my name is ${this.name} and I am ${this.age} years old.`);
    };
}

const p1 = new Person("Alice", 30);
p1.introduce(); // Output: Hi, my name is Alice and I am 30 years old.

const p2 = new Person("Bob", 25);
p2.introduce(); // Output: Hi, my name is Bob and I am 25 years old.


// =====================================
// 5. Explicit Binding (`call`, `apply`, `bind`)
//    - These methods allow you to explicitly set the value of 'this' for a function.
// =====================================

console.log("\n--- 5. Explicit Binding ---");

function greetUser(greeting, punctuation) {
    console.log(`${greeting}, ${this.name}${punctuation}`);
}

const user1 = { name: "Charlie" };
const user2 = { name: "Diana" };

// 5.1. `call()`: Invokes the function immediately with a specified 'this' context and arguments passed individually.
greetUser.call(user1, "Hello", "!"); // Output: Hello, Charlie!

// 5.2. `apply()`: Invokes the function immediately with a specified 'this' context and arguments as an array.
greetUser.apply(user2, ["Hi", "."]); // Output: Hi, Diana.

// 5.3. `bind()`: Returns a NEW function with 'this' permanently bound to a specified value. Does not invoke immediately.
const greetCharlie = greetUser.bind(user1, "Hey");
greetCharlie("??"); // Output: Hey, Charlie??

const greetDiana = greetUser.bind(user2);
greetDiana("Greetings", "..."); // Output: Greetings, Diana...


// =====================================
// 6. Arrow Functions and `this` (Lexical 'this')
//    - Arrow functions do NOT have their own 'this' binding.
//    - They inherit 'this' from their parent (enclosing) scope at the time they are defined.
//    - This is called "lexical this".
// =====================================

console.log("\n--- 6. Arrow Functions and 'this' ---");

const manager = {
    name: "Michael",
    team: ["Employee A", "Employee B"],
    // Traditional method
    reportTeamTraditional: function() {
        console.log(`\nManager (Traditional): ${this.name}`); // 'this' is 'manager'
        this.team.forEach(function(employee) {
            // 'this' here is NOT 'manager', it's global/undefined in strict mode
            // console.log(`${this.name} manages ${employee}`); // This would fail
        });
    },
    // Arrow function as a method property
    reportTeamArrow: function() {
        console.log(`\nManager (Arrow Method): ${this.name}`); // 'this' is 'manager'
        this.team.forEach(employee => {
            // 'this' here is inherited from the parent `reportTeamArrow`'s scope, which is 'manager'
            console.log(`${this.name} manages ${employee}`);
        });
    },
    // Arrow function defined directly as an object property (not recommended if `this` needs to be the object)
    // 'this' would be global/undefined here, as its parent scope is global
    arrowMethodProperty: () => {
        console.log("Arrow function as direct property 'this':", this);
    }
};

manager.reportTeamTraditional(); // Shows issue if inner function uses 'this'
manager.reportTeamArrow();
/* Output:
Manager (Arrow Method): Michael
Michael manages Employee A
Michael manages Employee B
*/

manager.arrowMethodProperty(); // Output: Arrow function as direct property 'this': {} (global object in Node)


console.log("\n--- Summary ---");
console.log("'this' depends on how a function is called.");
console.log("Global: global object (window/global).");
console.log("Function: global object (or undefined in strict mode).");
console.log("Method: the object itself.");
console.log("Constructor: the new instance.");
console.log("Explicit: set by call(), apply(), bind().");
console.log("Arrow Functions: Lexically inherit 'this' from parent scope.");
console.log("Understanding 'this' is crucial for managing context in React class components and callbacks.");
