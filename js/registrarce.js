document.addEventListener('DOMContentLoaded', () => {
    const nombreInput = document.getElementById('nombre');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const tipoUsuarioSelect = document.getElementById('tipoUsuario');
    const usuarioInput = document.getElementById('usuario');
    const registrarBtn = document.getElementById('registrarBtn');
    const regresarBtn = document.getElementById('regresarBtn');

    const generateEmail = () => {
        const nombre = nombreInput.value.replace(/\s+/g, '').toLowerCase();
        const tipoUsuario = tipoUsuarioSelect.value;
        let email = '';

        if (tipoUsuario === 'empresa') {
            email = `${nombre}@unibarranquilla.empresa.co`;
        } else if (tipoUsuario === 'estudiante') {
            email = `${nombre}@unibarranquilla.edu.co`;
        }
        
        usuarioInput.value = email;
    };

    tipoUsuarioSelect.addEventListener('change', generateEmail);
    nombreInput.addEventListener('input', generateEmail);

    const validateForm = () => {
        if (!nombreInput.value.trim()) {
            alert('Por favor, ingrese su nombre');
            return false;
        }
        if (!passwordInput.value.trim()) {
            alert('Por favor, ingrese su contraseña');
            return false;
        }
        if (!confirmPasswordInput.value.trim()) {
            alert('Por favor, confirme su contraseña');
            return false;
        }
        if (passwordInput.value !== confirmPasswordInput.value) {
            alert('Las contraseñas no coinciden');
            return false;
        }
        if (!tipoUsuarioSelect.value.trim()) {
            alert('Por favor, seleccione un tipo de usuario');
            return false;
        }
        if (!usuarioInput.value.trim()) {
            alert('El campo de usuario no puede estar vacío');
            return false;
        }
        return true;
    };

    registrarBtn.addEventListener('click', () => {
        if (validateForm()) {
            alert('Registrado correctamente');
        }
    });

    regresarBtn.addEventListener('click', () => {
        window.location.href = '../principal.html';
    });
});
