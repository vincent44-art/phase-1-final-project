
const apiUrl = "https://json-jet-xi.vercel.app/sales"; // JSON Server API URL
const salesTable = document.getElementById("salesTable");
const salesForm = document.getElementById("sales-form");
const grandTotalDisplay = document.getElementById("grandTotal");


// Load sales from localStorage
function loadSales() {
    let sales = JSON.parse(localStorage.getItem("sales")) || [];
    sales.forEach(sale => addSaleToTable(sale));
    updateGrandTotal();
}

document.addEventListener("DOMContentLoaded", loadSales);

function addSale() {
    let productName = document.getElementById("productName").value;
    let productPrice = parseFloat(document.getElementById("productPrice").value);
    let productQuantity = parseInt(document.getElementById("productQuantity").value);
    let paymentMode = document.getElementById("Payment").value;

    if (productName === "" || isNaN(productPrice) || isNaN(productQuantity)) {
        alert("Please fill in all fields with valid values.");
        return;
    }

    const saleData = {
        productName,
        productPrice,
        productQuantity,
        paymentMode
    };

    let sales = JSON.parse(localStorage.getItem("sales")) || [];
    sales.push(saleData);
    localStorage.setItem("sales", JSON.stringify(sales));

    addSaleToTable(saleData);
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productQuantity").value = "";
    document.getElementById("Payment").value = "cash";
    updateGrandTotal();
}

function addSaleToTable(sale) {
    let table = document.getElementById("salesTable");
    let row = table.insertRow();
    let total = (sale.productPrice * sale.productQuantity).toFixed(2);

    row.innerHTML = `
        <td>${sale.productName}</td>
        <td>$${sale.productPrice.toFixed(2)}</td>
        <td>${sale.productQuantity}</td>
        <td>$${total}</td>
        <td>${sale.paymentMode}</td>
        <td><button class="btn btn-danger btn-sm" onclick="deleteSale(this, '${sale.productName}')">Delete</button></td>
    `;
}

function deleteSale(button, productName) {
    let row = button.parentElement.parentElement;
    row.remove();

    let sales = JSON.parse(localStorage.getItem("sales")) || [];
    sales = sales.filter(sale => sale.productName !== productName);
    localStorage.setItem("sales", JSON.stringify(sales));

    updateGrandTotal();
}

function updateGrandTotal() {
    const rows = document.querySelectorAll("#salesTable tr");
    let grandTotal = 0;
    
    rows.forEach(row => {
        const price = parseFloat(row.cells[1].textContent.replace('$', ''));
        const quantity = parseInt(row.cells[2].textContent);
        grandTotal += price * quantity;
    });
    
    document.getElementById("grandTotal").textContent = `$${grandTotal.toFixed(2)}`;
}
