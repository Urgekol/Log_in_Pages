document.addEventListener("DOMContentLoaded", function () {
    
    const form = document.querySelector(".lower form");

    const usernameInput = document.querySelector('input[type="text"]');
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eye-icon');
    const eyeIconInner = eyeIcon.querySelector('i');

    eyeIcon.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        eyeIconInner.classList.toggle('fa-eye');
        eyeIconInner.classList.toggle('fa-eye-slash');
    });
});
