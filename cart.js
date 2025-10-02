const cart = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Headphones", price: 200 }
];

function calculateTotal(cartItems) {
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) { // Bug: <= should be <
      total += cartItems[i].price; // Bug: cartItems[i] is undefined on the last iteration
  }
  return total;
}

function applyDiscount(total, discountRate) {
  if(typeof discountRate !== "number" || discountRate > 1 || discountRate < 0){
    return null;
  }
  return total - total * discountRate; // Bug: Missing validation for discountRate
}

function generateReceipt(cartItems, total) {
  if(typeof total !== "number" || isNaN(total)){
    throw new Error("Invalid total");
  }
  let receipt = "Items:\n";
  cartItems.forEach(item => {
      receipt += `${item.name}: $${item.price}\n`;
  });
  receipt += `Total: $${Number(total).toFixed(2)}`; // Bug: total may not be a number
  return receipt;
};


// Debugging entry point
console.log("Starting shopping cart calculation...");
const total = calculateTotal(cart);
const discountedTotal = applyDiscount(total, 0.2); // 20% discount
const receipt = generateReceipt(cart, discountedTotal);

document.getElementById("total").textContent = `Total: $${discountedTotal}`;
document.getElementById("receipt").textContent = receipt;

// SUMMARY

// Bug: <= should be <
// I replaced <= with < because the previous condition was allowing the loop to continue to the length of the array which would be an undefined index and not provide a valid result

// Bug: cartItems[i] is undefined on the last iteration
// Replacing <= with < fixed the bug and allowed code to run as intended.

// Bug: Missing validation for discountRate
// Using the scope window on the side, I can see that adding a number greater than 1 would result in a negative total which doesn't make sense
// Using a negative number would result in a total that is greater than the cost of the items.
// A string would produce a total of $NaN.
// Therefore I had to introduce additional logic to handle invalid discount rates.

 // Bug: total may not be a number
//  Code was allowing for non numbers to be represented in the total so I added Number() around total to make the explicit conversion when appropriate.

// Bug: generateReceipt can still accept non-numbers
// Produces total $NaN to final output
// Fixed by adding additional validation to check and throw error as needed/
