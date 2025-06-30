# 📦 Promises & Async/Await in JavaScript

This section explores **Promises** and the **async/await** syntax — essential for handling asynchronous operations in modern JavaScript. Understanding these concepts is crucial for tasks like data fetching from APIs, which are foundational in interactive web apps built with React.

---

## 🎯 Concept Explanation

In JavaScript, many operations (like network requests, reading files, or timers) are **asynchronous**. This means they don't block the main execution thread and complete later. Promises and async/await offer a structured and readable way to manage these operations.

---

### 🔗 Promises

A **Promise** is an object representing the eventual completion (or failure) of an async operation and its resulting value.

A Promise can be in one of three states:

- `pending`: Initial state
- `fulfilled`: Operation completed successfully
- `rejected`: Operation failed

#### Common Promise Methods

- `.then(onFulfilled, onRejected)`: Registers success or error callbacks. Returns a new Promise.
- `.catch(onRejected)`: Shorthand for handling errors (`.then(null, onRejected)`).
- `.finally(onFinally)`: Executes a callback after the Promise settles (success or failure).

> Promises help avoid "callback hell" by allowing chaining of async operations.

---

### ⏱️ Async/Await

`async` and `await` are modern JavaScript keywords (ES2017) that make asynchronous code look synchronous and easier to read.

#### `async` keyword

- Declares an async function
- Always returns a Promise
- Throws inside the function result in a rejected Promise

#### `await` keyword

- Can only be used inside `async` functions
- Pauses function execution until the awaited Promise resolves or rejects
- Returns the resolved value, or throws the error

> `async/await` simplifies Promise chaining and error handling.

---

## 📝 Key Syntaxes & Examples

Refer to the `index.js` file for practical examples:

- Creating and consuming Promises with `.then()`, `.catch()`, and `.finally()`
- Chaining multiple Promises
- Using `Promise.all()` for parallel operations
- Declaring and using `async` functions
- Error handling with `try...catch`
- Sequential `await` vs. parallel `Promise.all()` with `.map()`

To run the examples:

```bash
node index.js
```

## ⚛️ Why It's Important for React
Asynchronous code is essential in React — especially for data fetching and handling user interactions.

👤 Example: Data Fetching with useEffect
```bash
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <div>Loading user profile...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>No user found.</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Age: {user.age}</p>
    </div>
  );
}
```

# 🔄 Using async/await Inside useEffect
```bash
useEffect(() => {
  const loadData = async () => {
    // your async code
  };
  loadData();
}, []);
```

# 🖱️ Async in Event Handlers
```bash
import React, { useState } from 'react';

function SubmitForm() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('Submitting...');
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify({ /* form data */ }),
      });
      if (!response.ok) {
        throw new Error('Submission failed!');
      }
      setStatus('Submission successful!');
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit">Submit</button>
      <p>{status}</p>
    </form>
  );
}
```

# ✅ Summary
By mastering `Promises` and `async/await`, you can:

- Write cleaner, more readable async code

- Handle data fetching gracefully in React

- Build responsive, maintainable, and user-friendly apps