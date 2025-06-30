console.log("--- ES6 Promises & Async/Await ---");

// =====================================
// 1. Promises
//    - An object representing the eventual completion or failure of an asynchronous operation.
//    - States: pending -> fulfilled (resolved) or rejected.
//    - Methods: .then() for success, .catch() for error, .finally() for completion.
// =====================================

console.log("\n--- Demonstrating Promises ---");

// 1.1. Creating a Promise
// A promise that resolves after a delay
const myPromise = new Promise((resolve, reject) => {
    const success = true; // Simulate an async operation result
    setTimeout(() => {
        if (success) {
            resolve("Data fetched successfully!"); // Operation succeeded
        } else {
            reject("Failed to fetch data."); // Operation failed
        }
    }, 1000); // Simulate network delay of 1 second
});

// 1.2. Consuming a Promise with .then() and .catch()
console.log("Promise state: Pending...");
myPromise
    .then(message => {
        console.log("Promise Resolved:", message); // Runs if promise is fulfilled
    })
    .catch(error => {
        console.error("Promise Rejected:", error); // Runs if promise is rejected
    })
    .finally(() => {
        console.log("Promise operation finished (finally block)."); // Always runs regardless of outcome
    });

// 1.3. Chaining Promises
// Simulate sequential async operations
function fetchData(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id === 1) {
                resolve({ id: 1, name: "Product A" });
            } else if (id === 2) {
                resolve({ id: 2, name: "Product B" });
            } else {
                reject("Product not found.");
            }
        }, 500);
    });
}

function processData(data) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`Processing data for: ${data.name}`);
            resolve(`Processed: ${data.name.toUpperCase()}`);
        }, 300);
    });
}

fetchData(1)
    .then(data => {
        console.log("Fetched data:", data);
        return processData(data); // Return another promise for chaining
    })
    .then(processedResult => {
        console.log("Final result after chaining:", processedResult);
    })
    .catch(error => {
        console.error("Chaining error:", error);
    });

fetchData(99) // This will cause a rejection
    .then(data => {
        console.log("Fetched data (error path):", data);
        return processData(data);
    })
    .catch(error => {
        console.error("Chaining error (expected):", error); // Catches "Product not found."
    });

// 1.4. Promise.all()
// Waits for all promises to resolve, or rejects if any one fails.
const promise1 = Promise.resolve(3);
const promise2 = 42; // Non-promise values are treated as resolved promises
const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3])
    .then(values => {
        console.log("Promise.all results:", values); // Output: [3, 42, "foo"]
    })
    .catch(error => {
        console.error("Promise.all error:", error);
    });

const failingPromise = new Promise((resolve, reject) => setTimeout(reject, 50, 'bar'));
Promise.all([promise1, failingPromise, promise3])
    .then(values => {
        console.log("Promise.all with failure results:", values);
    })
    .catch(error => {
        console.error("Promise.all with failure error (expected):", error); // Output: bar
    });


// =====================================
// 2. Async/Await
//    - Syntactic sugar built on top of Promises to make asynchronous code
//      look and behave more like synchronous code.
//    - `async` keyword makes a function return a Promise.
//    - `await` keyword pauses the execution of an `async` function until
//      a Promise settles (resolves or rejects).
// =====================================

console.log("\n--- Demonstrating Async/Await ---");

// 2.1. Basic Async Function
async function greetingAsync() {
    return "Hello from async!"; // This function implicitly returns a Promise that resolves with "Hello from async!"
}
greetingAsync().then(msg => console.log("Async function result:", msg));

// 2.2. Using `await` with a Promise
async function performAsyncOperation() {
    console.log("Starting async operation...");
    try {
        const result = await myPromise; // Pauses here until myPromise resolves or rejects
        console.log("Async/Await Success:", result);
    } catch (error) {
        console.error("Async/Await Error:", error);
    } finally {
        console.log("Async/Await operation finished.");
    }
}
performAsyncOperation();

// 2.3. Chaining with Async/Await (looks synchronous)
async function getProductAndProcess(productId) {
    console.log(`\nFetching and processing product ${productId}...`);
    try {
        const product = await fetchData(productId); // Await first async call
        console.log("Fetched product:", product);
        const processed = await processData(product); // Await second async call
        console.log("Processed product result:", processed);
        return processed;
    } catch (error) {
        console.error(`Error in getProductAndProcess for ID ${productId}:`, error);
        // Re-throw the error if you want calling code to handle it
        throw error;
    }
}

getProductAndProcess(2);
getProductAndProcess(100) // This will trigger the catch block
    .catch(() => console.log("Caught error from getProductAndProcess(100) in calling code."));


// 2.4. Await in loops
async function fetchMultipleProducts(ids) {
    const results = [];
    for (const id of ids) {
        try {
            const product = await fetchData(id); // Awaits sequentially for each product
            results.push(product.name);
        } catch (error) {
            results.push(`Error for ID ${id}`);
        }
    }
    console.log("\nSequential fetch results (await in loop):", results);
}
fetchMultipleProducts([1, 99, 2]);

// For parallel execution, use Promise.all with map
async function fetchMultipleProductsParallel(ids) {
    console.log("\nParallel fetch results (Promise.all with map):");
    try {
        const promises = ids.map(id => fetchData(id));
        const products = await Promise.all(promises);
        const names = products.map(p => p.name);
        console.log(names);
    } catch (error) {
        console.error("Parallel fetch error:", error);
    }
}
fetchMultipleProductsParallel([1, 2]); // All resolve
fetchMultipleProductsParallel([1, 99, 2]); // One rejects, so all reject


console.log("\n--- Summary ---");
console.log("Promises provide a structured way to handle async operations.");
console.log("Async/Await simplifies Promise syntax, making async code more readable and maintainable.");
console.log("Both are fundamental for data fetching and managing side effects in React.");
