
const redirectToLogin = () => {
    location.href = '../Proyecto/html/login.html'; 
};

const redirectToRegister = () => {
    location.href = '../Proyecto/html/registrarce.html';
};

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('.button-login');
    const registerButton = document.querySelector('.button-register');

    if (loginButton) {
        loginButton.addEventListener('click', redirectToLogin);
    }

    if (registerButton) {
        registerButton.addEventListener('click', redirectToRegister);
    }
});
