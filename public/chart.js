// Using Chart.js to create dummy graphs for Sales and Stock data

// Dummy Data for Sales Over Time
var salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        label: 'Sales',
        data: [300, 450, 500, 600, 700, 800],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
    }]
};

// Sales Graph
var ctx1 = document.getElementById('sales-graph').getContext('2d');
var salesChart = new Chart(ctx1, {
    type: 'line',
    data: salesData,
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Dummy Data for Stock Levels
var stockData = {
    labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
    datasets: [{
        label: 'Stock Levels',
        data: [120, 200, 300, 150, 500],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
    }]
};

// Stock Levels Graph
var ctx2 = document.getElementById('stock-graph').getContext('2d');
var stockChart = new Chart(ctx2, {
    type: 'bar',
    data: stockData,
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
