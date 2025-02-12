document.addEventListener("DOMContentLoaded", loadTransactions);

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction() {
    let name = document.getElementById("expenseName").value;
    let amount = document.getElementById("expenseAmount").value;

    if (name === "" || amount === "") return;

    let transaction = { id: Date.now(), name, amount };
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    renderTransactions();
    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";
}

function renderTransactions() {
    let list = document.getElementById("transactionsList");
    list.innerHTML = "";

    transactions.forEach(transaction => {
        let li = document.createElement("li");
        li.innerHTML = `${transaction.name}: $${transaction.amount}
            <button class="edit" onclick="editTransaction(${transaction.id})">Edit</button>
            <button class="delete" onclick="deleteTransaction(${transaction.id})">Delete</button>`;
        list.appendChild(li);
    });
}

function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    renderTransactions();
}

function editTransaction(id) {
    let transaction = transactions.find(t => t.id === id);
    let newName = prompt("Update Expense Name", transaction.name);
    let newAmount = prompt("Update Expense Amount", transaction.amount);

    if (newName && newAmount) {
        transaction.name = newName;
        transaction.amount = newAmount;
        localStorage.setItem("transactions", JSON.stringify(transactions));
        renderTransactions();
    }
}

function loadTransactions() {
    renderTransactions();
}
