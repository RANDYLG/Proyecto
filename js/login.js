const verificar = () => {
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;

    console.log('Ingrese usuario: ', usuario);
    console.log('Ingrese contraseña: ', password);

    const googleSheetsUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTHWXa0BPuIP3jwLcM6-MSPP7O9AX1n03Sa61HKkRdyjbkxG0a-v1UbeRmuelS6nnz5zYpWqI1G-z6R/pub?gid=0&single=true&output=tsv';

    fetch(googleSheetsUrl)
        .then(response => response.text())
        .then(data => {
            const parseData = parseTSV(data);
            console.log('Datos Obtenidos: ', parseData);
            const usuarioValido = parseData.find(u => u.usuario === usuario && u.password === password);
            console.log('Usuario valido: ', usuarioValido);
            if (usuarioValido) {
                localStorage.setItem('email_usuario', usuarioValido.usuario);
                if (usuario.endsWith('@unibarranquilla.edu.co')) {
                    window.location.href = "../html/pgnUsuarios.html";
                } else if (usuario.endsWith('@unibarranquilla.admin.co')) {
                    window.location.href = "../html/pgnAdmin.html";
                } else if (usuario.endsWith('@unibarranquilla.empresa.co')) {
                    window.location.href = "../html/empresa.html";
                } else {
                    alert("Usuario con dominio desconocido.");
                }
            } else {
                alert("Usuario o contraseña incorrecta.");
            }
        })
        .catch(error => console.error('Error al cargar el archivo TSV', error));
}

const parseTSV = (data) => {
    const rows = data.split('\n');
    const headers = rows[0].split('\t');
    return rows.slice(1).map(row => {
        const values = row.split('\t');
        let obj = {};
        headers.forEach((header, index) => {
            obj[header.trim()] = values[index] ? values[index].trim() : '';
        });
        return obj;
    });
}

const regresar = () => {
    window.location.href = "../principal.html";
}

document.addEventListener('DOMContentLoaded', () => {
    const ingresarBtn = document.getElementById('ingresarBtn');
    const regresarBtn = document.getElementById('regresarBtn');
    
    if (ingresarBtn) {
        ingresarBtn.addEventListener('click', verificar);
    }
    
    if (regresarBtn) {
        regresarBtn.addEventListener('click', regresar);
    }
});
