document.getElementById("orderForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get input values
    const product = document.getElementById("product").value;
    const quantity = document.getElementById("quantity").value;
    const customer = document.getElementById("customer").value;
    const transactionId = generateTransactionId();
    const status = "Pending";

    // Add to order table
    const table = document.getElementById("orderTable");
    const row = table.insertRow();
    row.innerHTML = `<td>${transactionId}</td><td>${product}</td><td>${quantity}</td><td>${customer}</td><td>${status}</td>`;

    // Store order data
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push({ transactionId, product, quantity, customer, status });
    localStorage.setItem("orders", JSON.stringify(orders));

    // Clear form
    document.getElementById("orderForm").reset();
});

// Generate a random Transaction ID
function generateTransactionId() {
    return "TXN-" + Math.floor(100000 + Math.random() * 900000);
}

// Load existing orders from localStorage on page load
document.addEventListener("DOMContentLoaded", function() {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    const table = document.getElementById("orderTable");

    orders.forEach(order => {
        const row = table.insertRow();
        row.innerHTML = `<td>${order.transactionId}</td><td>${order.product}</td><td>${order.quantity}</td><td>${order.customer}</td><td>${order.status}</td>`;
    });
});

// Track Order Function
function trackOrder() {
    const orderId = document.getElementById("orderId").value;
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const order = orders.find(o => o.transactionId === orderId);

    if (order) {
        document.getElementById("orderStatus").innerHTML = `<p>Order Found: <strong>${order.product}</strong> for <strong>${order.customer}</strong> is currently <strong>${order.status}</strong>.</p>`;
    } else {
        document.getElementById("orderStatus").innerHTML = "<p>Order not found!</p>";
    }
}
