// Initialize PocketBase client
const pb = new PocketBase('http://localhost:8090'); // Update with your actual PocketBase URL

// Check if there's an existing auth token and set it
if (localStorage.getItem('pb_auth_token')) {
    pb.authStore.save(null, localStorage.getItem('pb_auth_token'));
}

// Registration Form
const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        // Create a new user
        const user = await pb.collection('users').create({
            email,
            password,
            passwordConfirm: password, // Confirm password (required by PocketBase)
        });
        alert('Registration successful!');
        console.log('Registered user:', user);
    } catch (err) {
        console.error('Registration error:', err);
        alert('Failed to register. Check the console for details.');
    }
});

// Login Form
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        // Authenticate the user
        const authData = await pb.collection('users').authWithPassword(email, password);
        alert('Login successful!');
        console.log('Logged in user:', authData.user);

        // Store the auth token in localStorage
        localStorage.setItem('pb_auth_token', authData.token);

        loadTransactions(); // Load transactions after successful login
    } catch (err) {
        console.error('Login error:', err);
        alert('Failed to log in. Check the console for details.');
    }
});

// Load Transactions
async function loadTransactions() {
    const transactionsList = document.getElementById('transactionsList');
    transactionsList.innerHTML = ''; // Clear the list

    try {
        // Fetch all records from the 'trans_ext' collection without filtering by user ID
        const records = await pb.collection('trans_ext').getFullList(); // Update 'transactions' to match your collection name

        // Render each transaction as a list item
        records.forEach((record) => {
            const li = document.createElement('li');
            li.textContent = `${record.description}: $${record.amount}`; // Adjust field names based on your schema
            transactionsList.appendChild(li);
        });
    } catch (err) {
        console.error('Error loading transactions:', err);
        alert('Failed to load transactions. Check the console for details.');
    }
}

// Button to load transactions
const loadTransactionsButton = document.getElementById('loadTransactionsButton');
loadTransactionsButton.addEventListener('click', () => {
    if (!pb.authStore.isValid) {
        alert('Please log in first.');
        return;
    }
    loadTransactions();
});
