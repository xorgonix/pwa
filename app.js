document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded event fired");
    const pb = new PocketBase('http://127.0.0.1:8090');
    console.log("PocketBase instance created", pb);

    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        try {
            console.log(`Registering user with email: ${email}`);
            await pb.collection('users').create({
                email: email,
                password: password,
                passwordConfirm: password,
            });
            alert('Registration successful!');
        } catch (error) {
            console.error("Registration failed", error);
            alert('Registration failed.');
        }
    });

    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            console.log(`Logging in user with email: ${email}`);
            await pb.collection('users').authWithPassword(email, password);
            alert('Login successful!');
            listTransactions();
        } catch (error) {
            console.error("Login failed", error);
            alert('Login failed.');
        }
    });

    async function listTransactions() {
        const transactionsList = document.getElementById('transactionsList');
        transactionsList.innerHTML = '';
        console.log("Fetching transactions...");

        try {
            const result = await pb.collection('trans_ext').getFullList({
                sort: '-created',
            });
            console.log("Transactions fetched successfully", result);
            result.forEach(transaction => {
                const li = document.createElement('li');
                li.textContent = `ID: ${transaction.id}, Data: ${JSON.stringify(transaction)}`;
                transactionsList.appendChild(li);
            });
        } catch (error) {
            console.error("Failed to fetch transactions", error);
            alert('Failed to fetch transactions.');
        }
    }
});
