Array Methods (map, filter, reduce)
This section focuses on three of the most fundamental and widely used array iteration methods in modern JavaScript: map(), filter(), and reduce(). These methods are cornerstone tools for functional programming paradigms and are indispensable for manipulating data immutably, which is a core principle in React development.

🎯 Concept Explanation
All three methods (map, filter, reduce) are higher-order functions, meaning they accept a function as an argument. Critically, none of these methods modify the original array; they always return a new array (or a single value for reduce()), thus promoting immutability.

Array.prototype.map()
Purpose: To transform each element in an array and return a new array containing the results of applying a provided function to every element.
Signature: array.map(callback(currentValue, index, array), thisArg)
Returns: A new array of the same length as the original, with each element being the result of the callback function.
Use Cases: Changing data types, reformatting objects, rendering lists of UI elements.
Array.prototype.filter()
Purpose: To create a new array containing only the elements for which the provided callback function returns true.
Signature: array.filter(callback(currentValue, index, array), thisArg)
Returns: A new array containing a subset of the original array's elements. If no elements pass the test, an empty array is returned.
Use Cases: Selecting specific items from a list, searching, removing unwanted data.
Array.prototype.reduce()
Purpose: To execute a "reducer" callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element. The final result is a single value.
Signature: array.reduce(callback(accumulator, currentValue, index, array), initialValue)
accumulator: The value resulting from the previous call to callbackFn.
currentValue: The current element being processed in the array.
initialValue (Optional): A value to use as the first argument to the first call of the callbackFn. If no initialValue is provided, the first element of the array is used as the accumulator, and currentValue starts from the second element.
Returns: A single value (e.g., a number, an object, an array) that is the accumulated result.
Use Cases: Summing values, counting occurrences, flattening arrays, grouping data, transforming data into different structures.
📝 Key Syntaxes & Examples
Refer to the index.js file in this folder for practical code examples demonstrating:

How map() transforms array elements and objects into new arrays
How filter() selects subsets of arrays based on conditions
How reduce() accumulates values, counts occurrences, and flattens arrays
An example of chaining these methods together
Running the Examples
bash
node index.js
⚛️ Why it's Important for React
These array methods are absolutely essential for React development because they align perfectly with React's philosophy of immutability and functional programming.

Rendering Lists with map()
The most common use case in React is rendering lists of components. map() transforms an array of data into an array of JSX elements.

javascript
function ProductList({ products }) {
  return (
    <div>
      {products.map(product => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}
Filtering Data with filter()
Often you need to display only certain items based on user input or application state. filter() creates a new array with only the items that meet your criteria.

javascript
function TodoList({ todos, showCompleted }) {
  const visibleTodos = showCompleted 
    ? todos 
    : todos.filter(todo => !todo.completed);

  return (
    <ul>
      {visibleTodos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
Aggregating Data with reduce()
reduce() is perfect for calculating totals, counts, or transforming data structures in React components.

javascript
function ShoppingCart({ items }) {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <div>
      <p>Items: {itemCount}</p>
      <p>Total: ${total.toFixed(2)}</p>
    </div>
  );
}
Chaining Methods for Complex Transformations
You can chain these methods together for powerful data transformations while maintaining immutability.

javascript
function ExpensiveItemsList({ products, minPrice = 100 }) {
  const expensiveItems = products
    .filter(product => product.price >= minPrice)
    .map(product => ({
      ...product,
      discountedPrice: product.price * 0.9
    }))
    .sort((a, b) => b.price - a.price);

  return (
    <div>
      {expensiveItems.map(item => (
        <div key={item.id}>
          <h4>{item.name}</h4>
          <p>Original: ${item.price}</p>
          <p>Sale: ${item.discountedPrice.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}
State Updates with Array Methods
When updating state that contains arrays, these methods help you create new arrays rather than mutating existing ones.

javascript
function useShoppingCart() {
  const [items, setItems] = useState([]);

  const addItem = (newItem) => {
    setItems(prevItems => [...prevItems, newItem]);
  };

  const removeItem = (itemId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  return { items, addItem, removeItem, updateQuantity };
}
By mastering these array methods, you'll write more functional, predictable, and maintainable React code that follows modern JavaScript best practices.

