document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');
    const verProfileBtn = document.getElementById('verProfileBtn');
    const verOffersBtn = document.getElementById('verOffersBtn');
    const verCompaniesBtn = document.getElementById('verCompaniesBtn');
    const nombreUsuarioSpan = document.getElementById('nombreUsuario');
    const tablaPerfilDiv = document.querySelector('.tabla-perfil');

    const googleSheetsUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTHWXa0BPuIP3jwLcM6-MSPP7O9AX1n03Sa61HKkRdyjbkxG0a-v1UbeRmuelS6nnz5zYpWqI1G-z6R/pub?gid=0&single=true&output=tsv';

    const emailUsuario = localStorage.getItem('email_usuario');
    if (!emailUsuario) {
        window.location.href = '../html/login.html';
    } else {
        fetch(googleSheetsUrl)
            .then(response => response.text())
            .then(data => {
                const parseData = parseTSV(data);
                console.log('Datos Obtenidos: ', parseData);
                const usuario = parseData.find(u => u.usuario === emailUsuario);
                console.log('Usuario: ', usuario);
                if (usuario) {
                    nombreUsuarioSpan.textContent = `Bienvenido Administrador, ${usuario.nombre}`;
                    mostrarTablaUsuarios(parseData);
                } else {
                    alert("No se pudo encontrar el usuario.");
                    window.location.href = '../html/login.html';
                }
            })
            .catch(error => console.error('Error al cargar el archivo TSV', error));
    }

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('email_usuario');
        window.location.href = '../html/login.html';
    });

    verProfileBtn.addEventListener('click', () => {
        location.href = '../html/pgnAdmin-vperfil.html';
    });

    verOffersBtn.addEventListener('click', () => {
        location.href = '../html/pgnAdmin-vofertas.html';
    });

    verCompaniesBtn.addEventListener('click', () => {
        location.href = '../html/pgnAdmin-vempresas.html';
    });
});

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
};

const mostrarTablaUsuarios = (usuarios) => {
    const tablaPerfilDiv = document.querySelector('.tabla-perfil');
    const tabla = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headers = ['usuario', 'password', 'nombre'];
    const rowHeader = document.createElement('tr');
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        rowHeader.appendChild(th);
    });
    thead.appendChild(rowHeader);

    usuarios.forEach(usuario => {
        const row = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = usuario[header.toLowerCase()];
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });

    tabla.appendChild(thead);
    tabla.appendChild(tbody);
    tablaPerfilDiv.appendChild(tabla);
};
