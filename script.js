// MENÚ //

// ELEMENTOS
const btnHamburguesa = document.querySelector('.nav-container__hamburger');
const icono = btnHamburguesa.querySelector('i');
const menu = document.querySelector('.nav-container__menu');
const botonExtra = document.querySelector('.nav-container__button');
const enlacesMenu = document.querySelectorAll('.nav-container__menu ul li');

// ESTADO
let menuAbierto = false;

// ABRIR / CERRAR MENÚ
btnHamburguesa.addEventListener('click', () => {
    menuAbierto = !menuAbierto;

    if (menuAbierto) {
        menu.style.display = 'block';
        botonExtra.style.display = 'block';

        icono.classList.remove('bi-list');
        icono.classList.add('bi-x');
    } else {
        menu.style.display = 'none';
        botonExtra.style.display = 'none';

        icono.classList.remove('bi-x');
        icono.classList.add('bi-list');
    }
});

// CERRAR AL CLICKEAR UN ENLACE
enlacesMenu.forEach(enlace => {
    enlace.addEventListener('click', () => {
        cerrarMenu();
    });
});

// CERRAR AL CLICKEAR FUERA
document.addEventListener('click', (e) => {
    const clicEnMenu = menu.contains(e.target);
    const clicEnBoton = btnHamburguesa.contains(e.target);

    if (menuAbierto && !clicEnMenu && !clicEnBoton) {
        cerrarMenu();
    }
});

// FUNCIÓN PARA CERRAR
function cerrarMenu() {
    menuAbierto = false;

    menu.style.display = 'none';
    botonExtra.style.display = 'none';

    icono.classList.remove('bi-x');
    icono.classList.add('bi-list');
}

// FIN DEL MENÚ //

// FILTRO SECCIÓN GALERÍA //

function filtrarPorClase(claseMostrar) {
    const imagenes = document.querySelectorAll('.contenedorIMGSeccionGaleria');

    imagenes.forEach(div => {
        if (claseMostrar === 'todo') {
            div.style.display = 'block';
        }
        else if (div.classList.contains(claseMostrar)) {
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