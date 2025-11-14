// MENÚ //

const btnHamburguesa = document.querySelector('.nav-container__hamburger');
const icono = btnHamburguesa.querySelector('i');
const menu = document.querySelector('.nav-container__menu');
const botonExtra = document.querySelector('.nav-container__button');
const enlacesMenu = document.querySelectorAll('.nav-container__menu li');

let menuAbierto = false;

function esMovil() {
    return window.innerWidth < 768;
}

// ABRIR / CERRAR MENÚ
btnHamburguesa.addEventListener('click', (e) => {
    if (!esMovil()) return;

    menuAbierto = !menuAbierto;

    if (menuAbierto) {
        menu.style.display = 'block';
        botonExtra.style.display = 'block';
        icono.classList.replace('bi-list', 'bi-x');
    } else {
        cerrarMenu();
    }

    e.stopPropagation(); // evitar que el clic del botón burbujee
});

// EVITAR CIERRE AL CLICKEAR DENTRO DEL MENÚ
menu.addEventListener('click', (e) => {
    e.stopPropagation(); // cualquier clic dentro del menú no cierra
});

// CERRAR AL CLICKEAR ENLACE
enlacesMenu.forEach(li => {
    const enlace = li.querySelector('a');
    if (enlace) {
        enlace.addEventListener('click', () => {
            if (esMovil()) cerrarMenu();
        });
    }
});

// CERRAR AL CLICKEAR FUERA DEL MENÚ
document.addEventListener('click', () => {
    if (!esMovil()) return;
    if (menuAbierto) cerrarMenu();
});

// FUNCIÓN PARA CERRAR
function cerrarMenu() {
    menuAbierto = false;
    menu.style.display = 'none';
    botonExtra.style.display = 'none';
    icono.classList.replace('bi-x', 'bi-list');
}

// AJUSTAR AL CAMBIO DE TAMAÑO
window.addEventListener('resize', () => {
    if (!esMovil()) {
        menu.style.display = '';
        botonExtra.style.display = '';
        icono.classList.replace('bi-x', 'bi-list');
        menuAbierto = false;
    } else {
        if (!menuAbierto) {
            menu.style.display = 'none';
            botonExtra.style.display = 'none';
        }
    }
});



// FILTRO SECCIÓN GALERÍA //

function filtrarPorClase(claseMostrar) {
    const imagenes = document.querySelectorAll('.contenedorIMGSeccionGaleria');

    imagenes.forEach(div => {
        if (claseMostrar === 'todo' || div.classList.contains(claseMostrar)) {
            div.style.display = 'block';
        } else {
            div.style.display = 'none';
        }
    });
}

document.querySelector('.buttonTodo').addEventListener('click', () => {
    filtrarPorClase('todo');
});

document.querySelector('.buttonDia').addEventListener('click', () => {
    filtrarPorClase('filtroDia');
});

document.querySelector('.buttonNoche').addEventListener('click', () => {
    filtrarPorClase('filtroNoche');
});

document.querySelector('.buttonEventos').addEventListener('click', () => {
    filtrarPorClase('filtroEventos');
});

// FIN DEL FILTRO SECCIÓN GALERÍA //


