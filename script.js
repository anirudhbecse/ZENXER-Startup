// Sample users data
const users = {
    admin: { password: 'admin123', role: 'admin' },
    employee: { password: 'employee123', role: 'employee' }
};

// Sample data
const investments = [
    { id: '001', name: 'Luxury Apartment', value: 1000000 },
    { id: '002', name: 'Beachfront Villa', value: 5000000 },
    { id: '003', name: 'City Center Condo', value: 750000 }
];

const expenses = [
    { description: 'Office Supplies', amount: 250 },
    { description: 'Business Travel', amount: 1200 }
];

// DOM Elements
const loginSection = document.getElementById('login-section');
const adminDashboard = document.getElementById('admin-dashboard');
const employeeDashboard = document.getElementById('employee-dashboard');
const loginForm = document.getElementById('login-form');
const loginMessage = document.getElementById('login-message');
const logoutAdminButton = document.getElementById('logout');
const logoutEmployeeButton = document.getElementById('logout-employee');
const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const investmentList = document.getElementById('investment-list');

adminDashboard.style.display="none";
employeeDashboard.style.display="none";

// Render investments
function renderInvestments() {
    investmentList.innerHTML = '';
    investments.forEach(investment => {
        const listItem = document.createElement('li');
        listItem.textContent = `${investment.name}: $${investment.value.toLocaleString()}`;
        investmentList.appendChild(listItem);
    });
}

// Render expenses
function renderExpenses() {
    expenseList.innerHTML = '';
    expenses.forEach(expense => {
        const listItem = document.createElement('li');
        listItem.textContent = `${expense.description}: $${expense.amount.toLocaleString()}`;
        expenseList.appendChild(listItem);
    });
}

// Show dashboard based on role
function showDashboard(role) {
    loginSection.classList.add('hidden');
    if (role === 'admin') {
        adminDashboard.style.display="block";
        loginForm.style.display="none";
        renderExpenses(); // Render expenses on the admin dashboard
    } else if (role === 'employee') {
        loginForm.style.display="none";
        employeeDashboard.style.display="block";
        renderInvestments(); // Render investments on the employee dashboard
    }
}

// Handle login form submission
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const user = users[username];
    if (user && user.password === password) {
        showDashboard(user.role);
    } else {
        loginMessage.textContent = 'Invalid username or password.';
    }
});

// Handle admin logout
logoutAdminButton.addEventListener('click', function() {
    adminDashboard.style.display="none";
    loginForm.style.display="block";
});

// Handle employee logout
logoutEmployeeButton.addEventListener('click', function() {
    employeeDashboard.style.display="none";
    loginForm.style.display="block";
});

// Handle expense form submission
expenseForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const description = document.getElementById('expense-description').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);

    if (description && amount > 0) {
        expenses.push({ description, amount });
        renderExpenses(); // Re-render expenses list
        expenseForm.reset();
        document.getElementById('expense-message').textContent = 'Expense added successfully.';
    } else {
        document.getElementById('expense-message').textContent = 'Please provide valid description and amount.';
    }
});

