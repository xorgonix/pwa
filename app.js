// Initialize PocketBase client
const pb = new PocketBase('http://localhost:8090'); // Update with your actual PocketBase URL

// Restore Auth Token and User Data
const savedToken = localStorage.getItem('pb_auth_token');
const savedUser = localStorage.getItem('pb_auth_user');

if (savedToken && savedUser) {
    try {
        // Validate and parse user data
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser && typeof parsedUser === 'object') {
            pb.authStore.save(savedToken, parsedUser);
        } else {
            throw new Error("Invalid user data in localStorage");
        }
    } catch (err) {
        console.error("Error restoring auth data:", err);
        // Clear corrupted data from localStorage
        localStorage.removeItem('pb_auth_token');
        localStorage.removeItem('pb_auth_user');
    }
}

// Update UI Based on Authentication State
function updateUserInfo() {
    const userInfo = document.getElementById('userInfo');
    const userIdElement = document.getElementById('userId');

    if (pb.authStore.isValid) {
        const userEmail = pb.authStore.model?.email || 'User';
        const userId = pb.authStore.model?.id || 'Unknown';
        userInfo.textContent = `Welcome, ${userEmail}`;
        userIdElement.textContent = `Your User ID: ${userId}`;
    } else {
        userInfo.textContent = 'Welcome, Guest';
        userIdElement.textContent = '';
    }
}

// Ensure updateUserInfo is called after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    updateUserInfo();

    // Registration Form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;

            try {
                const user = await pb.collection('users').create({
                    email,
                    password,
                    passwordConfirm: password,
                });
                alert('Registration successful!');
                console.log('Registered user:', user);
            } catch (err) {
                console.error('Registration error:', err);
                alert('Failed to register. Check the console for details.');
            }
        });
    }

    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            try {
                console.log("Attempting to log in with email:", email);
                const authData = await pb.collection('users').authWithPassword(email, password);
                console.log("Login successful. Auth data:", authData);

                alert('Login successful!');
                console.log('Logged in user:', authData.user);

                // Store auth token and user info
                localStorage.setItem('pb_auth_token', authData.token);
                localStorage.setItem('pb_auth_user', JSON.stringify(authData.user));

                updateUserInfo(); // Update UI with user data

                // Redirect to transactions page after login
                window.location.href = 'transactions.html';
            } catch (err) {
                console.error('Login error:', err);
                alert('Failed to log in. Check the console for details.');
            }
        });
    }

    // Load Transactions
    async function loadTransactions() {
        const transactionsList = document.getElementById('transactionsList');
        if (!transactionsList) return;

        transactionsList.innerHTML = ''; // Clear the list

        if (!pb.authStore.isValid) {
            console.error("User is not authenticated.");
            alert("Please log in first.");
            return;
        }

        try {
            console.log("AuthStore Model:", pb.authStore.model);
            console.log("Fetching transactions for user:", pb.authStore.model?.id);

            // Fetch records for the authenticated user
            const records = await pb.collection('trans_ext').getFullList(200, {
                filter: `user_id = "${pb.authStore.model.id}"`,
            });
            console.log("Fetched Records:", records);

            if (records.length === 0) {
                console.warn("No transactions found for this user.");
                transactionsList.innerHTML = '<li>No transactions available.</li>';
                return;
            }

            // Render transactions
            records.forEach((record) => {
                const li = document.createElement('li');
                li.textContent = `${record.video_title}: ${record.status}`;
                transactionsList.appendChild(li);
            });
        } catch (err) {
            console.error("Error loading transactions:", err);
            alert("Failed to load transactions. Check the console for details.");
        }
    }

    // Button to Load Transactions
    const loadTransactionsButton = document.getElementById('loadTransactionsButton');
    if (loadTransactionsButton) {
        loadTransactionsButton.addEventListener('click', () => {
            console.log('Load Transactions button clicked');
            loadTransactions();
        });
    }
});
