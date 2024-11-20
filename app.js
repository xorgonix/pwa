function toggleTheme() {
    const body = document.body;
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Validate form inputs
            const emailInput = document.getElementById('loginEmail');
            const passwordInput = document.getElementById('loginPassword');

            if (!emailInput.value || !passwordInput.value) {
                alert('Please fill in all fields.');
                return;
            }

            try {
                // Initialize PocketBase client
                const pb = new PocketBase('http://localhost:8090'); // Update with your PocketBase URL

                // Authenticate the user
                const authData = await pb.collection('users').authWithPassword(emailInput.value, passwordInput.value);

                // Handle successful login
                console.log('Login successful:', authData);
                alert('Login successful!');
                window.location.href = 'index.html'; // Redirect to home page or another appropriate page

            } catch (error) {
                // Handle login error
                console.error('Login failed:', error);
                alert('Login failed. Please check your email and password.');
            }
        });
    }

    const loadTransactionsButton = document.getElementById('loadTransactionsButton');
    const transactionsList = document.getElementById('transactionsList');

    if (loadTransactionsButton && transactionsList) {
        loadTransactionsButton.addEventListener('click', async () => {
            try {
                // Initialize PocketBase client
                const pb = new PocketBase('http://localhost:8090'); // Update with your PocketBase URL

                // Fetch transactions
                const result = await pb.collection('transactions').getList(1, 50); // Adjust page and perPage as needed

                // Clear existing transactions
                transactionsList.innerHTML = '';

                // Display transactions
                result.items.forEach(transaction => {
                    const listItem = document.createElement('li');
                    listItem.className = 'list-group-item';
                    listItem.textContent = `Transaction ID: ${transaction.id}, Amount: $${transaction.amount}`;
                    transactionsList.appendChild(listItem);
                });

            } catch (error) {
                // Handle error
                console.error('Failed to load transactions:', error);
                alert('Failed to load transactions. Please try again later.');
            }
        });
    }
});
