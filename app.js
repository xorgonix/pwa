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
});
