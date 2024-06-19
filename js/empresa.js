const menuItems = document.querySelectorAll('.menu li');

menuItems.forEach(menuItem => {
    menuItem.addEventListener('click', function() {
        // Eliminar la clase "active" de todos los elementos del menú
        menuItems.forEach(item => item.classList.remove('active'));

        // Agregar la clase "active" al elemento actual
        this.classList.add('active');
    });
});