document.addEventListener('DOMContentLoaded', () => {
    const pb = new PocketBase('http://127.0.0.1:8090');

    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        try {
            await pb.collection('users').create({
                email: email,
                password: password,
                passwordConfirm: password,
            });
            alert('Registration successful!');
        } catch (error) {
            console.error(error);
            alert('Registration failed.');
        }
    });

    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            await pb.collection('users').authWithPassword(email, password);
            alert('Login successful!');
            listTransactions();
        } catch (error) {
            console.error(error);
            alert('Login failed.');
        }
    });

    async function listTransactions() {
        const transactionsList = document.getElementById('transactionsList');
        transactionsList.innerHTML = '';

        try {
            const result = await pb.collection('trans_ext').getFullList({
                sort: '-created',
            });
            result.forEach(transaction => {
                const li = document.createElement('li');
                li.textContent = `ID: ${transaction.id}, Data: ${JSON.stringify(transaction)}`;
                transactionsList.appendChild(li);
            });
        } catch (error) {
            console.error(error);
            alert('Failed to fetch transactions.');
        }
    }
});
