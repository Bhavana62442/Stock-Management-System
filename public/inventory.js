// Get elements
const itemNameInput = document.getElementById("itemName");
const stockQuantityInput = document.getElementById("stockQuantity");
const categoryInput = document.getElementById("category");
const inventoryTable = document.getElementById("inventoryTable");

// Load inventory from local storage on page load
document.addEventListener("DOMContentLoaded", loadInventory);

// Function to add item
function addItem() {
    const itemName = itemNameInput.value.trim();
    const stockQuantity = stockQuantityInput.value.trim();
    const category = categoryInput.value;

    if (itemName === "" || stockQuantity === "" || isNaN(stockQuantity) || stockQuantity <= 0) {
        alert("Please enter valid item details.");
        return;
    }

    const itemData = { itemName, stockQuantity, category };

    // Add item to the table
    addItemToTable(itemData);

    // Save to local storage
    saveItem(itemData);

    // Clear input fields
    itemNameInput.value = "";
    stockQuantityInput.value = "";
}

// Function to add item to the table
function addItemToTable(itemData) {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${itemData.itemName}</td>
        <td>${itemData.stockQuantity}</td>
        <td>${itemData.category}</td>
        <td><button class="delete-btn" onclick="deleteItem(this)">❌ Delete</button></td>
    `;

    inventoryTable.appendChild(row);
}

// Function to delete an item
function deleteItem(button) {
    const row = button.parentElement.parentElement;
    const itemName = row.cells[0].textContent;
    row.remove();
    
    // Remove item from local storage
    removeItem(itemName);
}

// Function to save item to local storage
function saveItem(itemData) {
    let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
    inventory.push(itemData);
    localStorage.setItem("inventory", JSON.stringify(inventory));
}

// Function to remove item from local storage
function removeItem(itemName) {
    let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
    inventory = inventory.filter(item => item.itemName !== itemName);
    localStorage.setItem("inventory", JSON.stringify(inventory));
}

// Function to load inventory from local storage
function loadInventory() {
    let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
    inventory.forEach(item => addItemToTable(item));
}
