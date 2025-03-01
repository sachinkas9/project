document.getElementById("invoiceForm").addEventListener("submit", function(event) {
    event.preventDefault();
    if (selectedRow == null) {
        addInvoice();
    } else {
        updateInvoice();
    }
});

let selectedRow = null;

function addInvoice() {
    const invoiceNumber = document.getElementById("invoiceNumber").value;
    const clientName = document.getElementById("clientName").value;
    const amount = document.getElementById("amount").value;
    const dueDate = document.getElementById("dueDate").value;
    const status = document.getElementById("status").value;

    const table = document.getElementById("invoiceList").getElementsByTagName("tbody")[0];
    const newRow = table.insertRow(table.length);
    newRow.innerHTML = `
        <td>${invoiceNumber}</td>
        <td>${clientName}</td>
        <td>$${amount}</td>
        <td>${dueDate}</td>
        <td>${status}</td>
        <td>
            <button class="edit" onclick="editInvoice(this)">Edit</button>
            <button class="delete" onclick="deleteInvoice(this)">Delete</button>
        </td>
    `;

    document.getElementById("invoiceForm").reset();
}

function editInvoice(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("invoiceNumber").value = selectedRow.cells[0].innerHTML;
    document.getElementById("clientName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("amount").value = selectedRow.cells[2].innerHTML.replace("$", "");
    document.getElementById("dueDate").value = selectedRow.cells[3].innerHTML;
    document.getElementById("status").value = selectedRow.cells[4].innerHTML;

    document.getElementById("submitButton").value = "Update Invoice";  
}

function updateInvoice() {
    selectedRow.cells[0].innerHTML = document.getElementById("invoiceNumber").value;
    selectedRow.cells[1].innerHTML = document.getElementById("clientName").value;
    selectedRow.cells[2].innerHTML = `$${document.getElementById("amount").value}`;
    selectedRow.cells[3].innerHTML = document.getElementById("dueDate").value;
    selectedRow.cells[4].innerHTML = document.getElementById("status").value;

    document.getElementById("submitButton").value = "Add Invoice";  
    selectedRow = null;
    document.getElementById("invoiceForm").reset();
}

function deleteInvoice(td) {
    if (confirm("Are you sure you want to delete this invoice?")) {
        const row = td.parentElement.parentElement;
        document.getElementById("invoiceList").deleteRow(row.rowIndex);
    }
}

function resetForm() {
    selectedRow = null;
    document.getElementById("submitButton").value = "Add Invoice";  
}