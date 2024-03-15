document.getElementById('color-mode-toggle').addEventListener('click', function() {
    if (document.body.getAttribute('data-bs-theme') === 'dark') {
        document.body.setAttribute('data-bs-theme', 'light');
        this.textContent = 'dark_mode';
    } else {
        document.body.setAttribute('data-bs-theme', 'dark');
        this.textContent = 'light_mode';
    }
});

function signUp(){
    document.getElementById("sign-up").style.display = "flex";
    document.getElementById("sign-in").style.display = "none";
}

function signIn(){
    document.getElementById("sign-up").style.display = "none";
    document.getElementById("sign-in").style.display = "flex";
}

function register(){
    event.preventDefault();

    let password = document.getElementById("password").value;
    let confirm_password = document.getElementById("confirm_password").value;

    if (password !== confirm_password) {
        document.getElementById("password-confirm-warning").style.display = "inline-block";
        setTimeout(function() {
            document.getElementById("password-confirm-warning").style.display = "none";
        }, 5000);
    } else {
        console.log("Password OK!");
    }
}