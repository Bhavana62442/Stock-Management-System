document.addEventListener("DOMContentLoaded", () => {
    const stockForm = document.getElementById("stockForm");
    const stockTable = document.getElementById("stockTable");
    const totalStockSpan = document.getElementById("totalStock");
    const lowStockCountSpan = document.getElementById("lowStockCount");

    let stockData = [];

    function updateStockDisplay() {
        stockTable.innerHTML = "";
        let totalStock = 0;
        let lowStockCount = 0;

        stockData.forEach((item, index) => {
            totalStock += item.quantity;
            if (item.quantity < 5) lowStockCount++;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.product}</td>
                <td>${item.quantity}</td>
                <td>${item.supplier}</td>
                <td>${item.category}</td>
                <td>${new Date().toLocaleString()}</td>
                <td><button class="delete-btn" onclick="removeStockItem(${index})">❌</button></td>
            `;
            stockTable.appendChild(row);
        });

        totalStockSpan.textContent = totalStock;
        lowStockCountSpan.textContent = lowStockCount;

        updateStockChart();
    }

    stockForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const product = document.getElementById("product").value;
        const quantity = parseInt(document.getElementById("quantity").value);
        const supplier = document.getElementById("supplier").value;
        const category = document.getElementById("category").value;
        const action = document.getElementById("action").value;

        const existingItem = stockData.find(item => item.product === product);
        
        if (existingItem) {
            existingItem.quantity = action === "add" 
                ? existingItem.quantity + quantity 
                : Math.max(existingItem.quantity - quantity, 0);
        } else {
            stockData.push({ product, quantity, supplier, category });
        }

        updateStockDisplay();
        stockForm.reset();
    });

    window.removeStockItem = (index) => {
        stockData.splice(index, 1);
        updateStockDisplay();
    };

    let stockChart;
    function updateStockChart() {
        const ctx = document.getElementById("stockChart").getContext("2d");
        const labels = stockData.map(item => item.product);
        const values = stockData.map(item => item.quantity);

        if (stockChart) stockChart.destroy();

        stockChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{
                    label: "Stock Levels",
                    data: values,
                    backgroundColor: "rgba(88, 86, 214, 0.7)",
                    borderColor: "rgba(88, 86, 214, 1)",
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    updateStockDisplay();
});
