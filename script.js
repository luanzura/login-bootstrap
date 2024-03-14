document.getElementById('color-mode-toggle').addEventListener('click', function() {
    if (document.body.getAttribute('data-bs-theme') === 'dark') {
        document.body.setAttribute('data-bs-theme', 'light');
        this.textContent = 'dark_mode';
    } else {
        document.body.setAttribute('data-bs-theme', 'dark');
        this.textContent = 'light_mode';
    }
});