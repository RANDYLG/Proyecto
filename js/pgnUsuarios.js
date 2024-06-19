document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');
    const profileBtn = document.getElementById('profileBtn');
    const offersBtn = document.getElementById('offersBtn');
    const nombreUsuarioSpan = document.getElementById('nombreUsuario');

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
                    nombreUsuarioSpan.textContent = `Bienvenido/a, ${usuario.nombre}`;
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

    profileBtn.addEventListener('click', () => {
        location.href = '../html/pgnUsuarios-perfil.html';
    });

    offersBtn.addEventListener('click', () => {
        location.href = 'ofertas.html';
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

const agregarFormacion = () => {
    const formacionFieldset = document.getElementById('formacionFieldset');
    const newFormacion = document.createElement('div');
    newFormacion.innerHTML = `
        <label>Formación:</label>
        <select class="formacion">
            <option value="">Seleccione</option>
            <option value="Bachiller">Bachiller</option>
            <option value="Técnico">Técnico</option>
        </select><br>
        <label>Institución:</label>
        <input type="text" class="institucion"><br>
        <label>Localidad:</label>
        <input type="text" class="localidad"><br>
        <label>Fecha de inicio:</label>
        <input type="date" class="fechaInicio"><br>
        <label>Fecha de fin:</label>
        <input type="date" class="fechaFin"><br>
        <label>Aún presente:</label>
        <input type="checkbox" class="aunPresente"><br>
    `;
    formacionFieldset.appendChild(newFormacion);
}

const agregarExperiencia = () => {
    const experienciaFieldset = document.getElementById('experienciaFieldset');
    const newExperiencia = document.createElement('div');
    newExperiencia.innerHTML = `
        <label>Puesto:</label>
        <input type="text" class="puesto"><br>
        <label>Empresa:</label>
        <input type="text" class="empresa"><br>
        <label>Localidad:</label>
        <input type="text" class="localidadExp"><br>
        <label>Fecha de inicio:</label>
        <input type="date" class="fechaInicioExp"><br>
        <label>Fecha de fin:</label>
        <input type="date" class="fechaFinExp"><br>
        <label>Aún presente:</label>
        <input type="checkbox" class="aunPresenteExp"><br>
        <label>Descripción:</label>
        <textarea class="descripcionExp"></textarea><br>
    `;
    experienciaFieldset.appendChild(newExperiencia);
}

const agregarCompetencia = () => {
    const competenciasFieldset = document.getElementById('competenciasFieldset');
    const newCompetencia = document.createElement('div');
    newCompetencia.innerHTML = `
        <label>Competencia:</label>
        <input type="text" class="competencia"><br>
        <label>Nivel:</label>
        <select class="nivelCompetencia">
            <option value="">Seleccione</option>
            <option value="Bajo">Bajo</option>
            <option value="Medio">Medio</option>
            <option value="Alto">Alto</option>
            <option value="Nativo">Nativo</option>
        </select><br>
    `;
    competenciasFieldset.appendChild(newCompetencia);
}

const agregarIdioma = () => {
    const idiomasFieldset = document.getElementById('idiomasFieldset');
    const newIdioma = document.createElement('div');
    newIdioma.innerHTML = `
        <label>Idioma:</label>
        <input type="text" class="idioma"><br>
        <label>Nivel:</label>
        <select class="nivelIdioma">
            <option value="">Seleccione</option>
            <option value="Bajo">Bajo</option>
            <option value="Medio">Medio</option>
            <option value="Alto">Alto</option>
            <option value="Nativo">Nativo</option>
        </select><br>
    `;
    idiomasFieldset.appendChild(newIdioma);
}

const agregarReferencia = () => {
    const referenciasFieldset = document.getElementById('referenciasFieldset');
    const newReferencia = document.createElement('div');
    newReferencia.innerHTML = `
        <label>Nombre:</label>
        <input type="text" class="nombreReferencia"><br>
        <label>Empresa:</label>
        <input type="text" class="empresaReferencia"><br>
        <label>Localidad:</label>
        <input type="text" class="localidadReferencia"><br>
        <label>Teléfono:</label>
        <input type="tel" class="telefonoReferencia"><br>
        <label>Correo:</label>
        <input type="email" class="correoReferencia"><br>
    `;
    referenciasFieldset.appendChild(newReferencia);
}

const guardarFormulario = () => {
    const form = document.getElementById('perfilForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (input.value.trim() === '' && !input.classList.contains('aunPresente') && !input.classList.contains('correoReferencia') && !input.classList.contains('carneConducir')) {
            isValid = false;
            input.style.border = '2px solid red';
        } else {
            input.style.border = '1px solid #ccc';
        }
    });

    if (isValid) {
        alert('Guardado correctamente');
    } else {
        alert('Un campo obligatorio está vacío');
    }
}

