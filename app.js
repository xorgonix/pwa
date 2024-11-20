// app.js

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme');
    let newTheme;

    if (currentTheme === 'dark') {
        newTheme = 'light';
    } else if (currentTheme === 'light') {
        newTheme = 'auto';
    } else {
        newTheme = 'dark';
    }

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    const themeIcon = document.querySelector('.theme-toggle');
    if (newTheme === 'dark') {
        themeIcon.textContent = '🌙';
    } else if (newTheme === 'light') {
        themeIcon.textContent = '☀️';
    } else {
        themeIcon.textContent = '🔄';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        const themeIcon = document.querySelector('.theme-toggle');
        if (savedTheme === 'dark') {
            themeIcon.textContent = '🌙';
        } else if (savedTheme === 'light') {
            themeIcon.textContent = '☀️';
        } else {
            themeIcon.textContent = '🔄';
        }
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            try {
                const pb = new PocketBase('/api');
                await pb.collection('users').authWithPassword(email, password);
                alert('Login successful!');
                // Redirect to home page or another protected route
                window.location.href = 'index.html';
            } catch (error) {
                console.error('Error logging in:', error);
                alert('Invalid email or password');
            }
        });
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;

            try {
                const pb = new PocketBase('/api');
                await pb.collection('users').create({ email, password });
                alert('Registration successful! Please log in.');
                // Redirect to login page
                window.location.href = 'login.html';
            } catch (error) {
                console.error('Error registering:', error);
                alert('Failed to register. Please try again.');
            }
        });
    }

    const loadTransactionsButton = document.getElementById('loadTransactionsButton');
    if (loadTransactionsButton) {
        loadTransactionsButton.addEventListener('click', async () => {
            try {
                const pb = new PocketBase('/api');
                const transactions = await pb.collection('transactions').getFullList();
                const transactionsList = document.getElementById('transactionsList');
                transactionsList.innerHTML = '';

                transactions.forEach(transaction => {
                    const listItem = document.createElement('li');
                    listItem.className = 'list-group-item';
                    listItem.textContent = `${transaction.description} - $${transaction.amount}`;
                    transactionsList.appendChild(listItem);
                });
            } catch (error) {
                console.error('Error loading transactions:', error);
                alert('Failed to load transactions.');
            }
        });
    }
});
