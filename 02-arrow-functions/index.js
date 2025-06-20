console.log("--- ES6 Arrow Functions ---");

// =====================================
// 1. Basic Syntax Variations
// =====================================

console.log("\n--- Basic Syntax ---");

// 1.1. No parameters, single expression
const greet = () => "Hello!";
console.log("No params:", greet()); // Output: Hello!

// 1.2. One parameter, single expression (parentheses optional)
const double = number => number * 2;
console.log("One param (no parens):", double(5)); // Output: 10

// 1.3. Multiple parameters, single expression (parentheses required)
const add = (a, b) => a + b;
console.log("Multiple params:", add(3, 7)); // Output: 10

// 1.4. Single expression, implicit return (no `return` keyword needed)
const square = num => num * num;
console.log("Implicit return:", square(4)); // Output: 16

// 1.5. Block body (curly braces), explicit return required
const calculateSum = (x, y) => {
    let sum = x + y;
    return sum;
};
console.log("Block body (explicit return):", calculateSum(10, 20)); // Output: 30

// 1.6. Returning an object literal
//    - Must wrap the object literal in parentheses to avoid ambiguity with block body.
const createUser = (name, age) => ({
    name: name,
    age: age
});
console.log("Returning object literal:", createUser("Charlie", 25)); // Output: { name: 'Charlie', age: 25 }


// =====================================
// 2. The Crucial Difference: `this` Binding (Lexical `this`)
//    - Arrow functions do NOT bind their own `this`.
//    - They inherit `this` from their parent (enclosing) scope at the time they are defined.
// =====================================

console.log("\n--- 'this' Binding ---");

// 2.1. Traditional Function vs. Arrow Function `this`
function Person(name) {
    this.name = name;
    this.traditionalGreet = function() {
        console.log("Traditional greet: My name is " + this.name);
    };
    this.arrowGreet = () => {
        console.log("Arrow greet: My name is " + this.name);
    };
}

const person1 = new Person("Alice");
person1.traditionalGreet(); // Output: Traditional greet: My name is Alice
person1.arrowGreet();     // Output: Arrow greet: My name is Alice

// Problem with traditional function `this` in callbacks
function Counter() {
    this.count = 0;
    setInterval(function() {
        // 'this' here refers to the global object (window in browser, undefined in strict mode Node.js)
        // NOT the Counter instance
        // console.log("Traditional callback 'this.count':", this.count++); // This would fail or modify global object
    }, 1000);
}
// new Counter(); // Uncomment to see the issue with `this` in traditional callbacks

function ArrowCounter() {
    this.count = 0;
    setInterval(() => {
        // 'this' here correctly refers to the ArrowCounter instance
        this.count++;
        // console.log("Arrow callback 'this.count':", this.count); // Uncomment to see it work correctly
    }, 100); // Shorter interval for quicker demo
}
// const arrowCountInstance = new ArrowCounter(); // Uncomment and run to see correct `this` binding

console.log("\nLexical 'this' example (more explicit):");
const user = {
    name: "Bob",
    regularMethod: function() {
        console.log("Regular method 'this.name':", this.name); // 'this' is `user` object
    },
    arrowMethod: () => {
        // 'this' here is inherited from the global scope (e.g., `window` or `undefined` in strict mode)
        // NOT the `user` object.
        console.log("Arrow method 'this.name':", this.name);
    }
};

user.regularMethod(); // Output: Regular method 'this.name': Bob
user.arrowMethod();   // Output: Arrow method 'this.name': undefined (or window.name if in browser)

// =====================================
// 3. Other Differences
// =====================================

console.log("\n--- Other Differences ---");

// 3.1. No `arguments` object
// Traditional function has its own `arguments` object
function oldFunction() {
    // console.log("Old function arguments:", arguments);
}
oldFunction(1, 2, 3); // Output: Old function arguments: [Arguments] { '0': 1, '1': 2, '2': 3 }

// Arrow functions do NOT have their own `arguments` object.
// If you try to access `arguments`, it will refer to the arguments of the enclosing non-arrow function.
const newFunction = () => {
    // console.log("Arrow function arguments:", arguments); // Throws ReferenceError: arguments is not defined (if not nested)
};
// newFunction(4, 5, 6);

function wrapArrowFunction() {
    const innerArrow = () => {
        // 'arguments' here refers to `wrapArrowFunction`'s arguments
        console.log("Nested arrow function arguments:", arguments);
    };
    innerArrow(7, 8);
}
wrapArrowFunction("a", "b", "c"); // Output: Nested arrow function arguments: [Arguments] { '0': 'a', '1': 'b', '2': 'c' }


// 3.2. Cannot be used as Constructors
// Arrow functions do not have a `prototype` property and cannot be invoked with `new`.
// const MyArrowClass = () => {};
// const instance = new MyArrowClass(); // Throws TypeError: MyArrowClass is not a constructor

// 3.3. No `super`
// Arrow functions do not have their own `super` binding.

// 3.4. No `new.target`
// Arrow functions do not have `new.target`.

console.log("\n--- Summary ---");
console.log("Arrow functions provide concise syntax and lexical 'this' binding.");
console.log("They are especially useful for callbacks where `this` context needs to be preserved.");
console.log("Avoid them for object methods that need `this` to refer to the object itself.");
