// index.js for 05-template-literals

console.log("--- ES6 Template Literals ---");

// =====================================
// 1. Basic Usage
//    - Use backticks (`) instead of single or double quotes.
// =====================================

console.log("\n--- Basic Usage ---");

const name = "Alice";
const greeting = `Hello, ${name}!`; // Simple string interpolation
console.log("Simple interpolation:", greeting); // Output: Hello, Alice!

// 1.1. Multi-line Strings
// No need for \n or string concatenation for new lines
const multiLineString = `
This is a string
that spans multiple
lines.
`;
console.log("Multi-line string:", multiLineString);
/* Output:
This is a string
that spans multiple
lines.
*/

// 1.2. Embedded Expressions
const a = 10;
const b = 5;
const result = `The sum of ${a} and ${b} is ${a + b}.`;
console.log("Embedded expressions:", result); // Output: The sum of 10 and 5 is 15.

// You can embed function calls
const getRandomNumber = () => Math.floor(Math.random() * 100);
const randomMsg = `Your lucky number is ${getRandomNumber()}.`;
console.log("Embedded function call:", randomMsg); // Output: Your lucky number is [random number].

// You can embed conditional (ternary) expressions
const age = 18;
const eligibility = `You are ${age} years old. You are ${age >= 18 ? 'eligible' : 'not eligible'} to vote.`;
console.log("Embedded conditional:", eligibility); // Output: You are 18 years old. You are eligible to vote.


// =====================================
// 2. Tagged Templates (Advanced)
//    - A function called before the template literal.
//    - Allows for advanced parsing and manipulation of template strings.
// =====================================

console.log("\n--- Tagged Templates ---");

// 2.1. Simple Tag Function
// The first argument is an array of string parts
// Subsequent arguments are the values of the embedded expressions
function highlight(strings, ...values) {
    let str = '';
    strings.forEach((string, i) => {
        str += string;
        if (values[i] !== undefined) {
            str += `[${values[i]}]`; // Wrap value in brackets for highlighting
        }
    });
    return str;
}

const product = "Laptop";
const price = 1200;
const inventory = 50;

const productInfo = highlight`Product: ${product}, Price: $${price}, In Stock: ${inventory}.`;
console.log("Tagged template (highlight):", productInfo);
// Output: Product: [Laptop], Price: $[1200], In Stock: [50].

// 2.2. Another Tag Example: HTML Escaping
function safeHtml(strings, ...values) {
    let result = '';
    strings.forEach((str, i) => {
        result += str;
        if (i < values.length) {
            // Basic HTML escaping for demonstration
            const value = String(values[i]).replace(/&/g, '&amp;')
                                          .replace(/</g, '&lt;')
                                          .replace(/>/g, '&gt;')
                                          .replace(/"/g, '&quot;')
                                          .replace(/'/g, '&#039;');
            result += value;
        }
    });
    return result;
}

const userInput = '<script>alert("XSS Attack!");</script>';
const username = "John & Doe";
const safeMessage = safeHtml`<p>Hello, ${username}! Your message: ${userInput}</p>`;
console.log("Tagged template (safeHtml):\n", safeMessage);
// Output: <p>Hello, John &amp; Doe! Your message: &lt;script&gt;alert(&quot;XSS Attack!&quot;);&lt;/script&gt;</p>


console.log("\n--- Summary ---");
console.log("Template literals simplify string manipulation, multi-line strings, and variable interpolation.");
console.log("They are extensively used in React for dynamic content in JSX and component logic.");
