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
});
