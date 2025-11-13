// AJUSTE AUTOMATICO DE LA NAV CON EL HERO //

function ajustarHero() {
    const nav = document.querySelector('.seccionBarraNav');
    const hero = document.querySelector('.seccionHero');
    if (nav && hero) {
        const navAltura = nav.offsetHeight;
        hero.style.marginTop = navAltura + 'px';
    }
}

// Ejecutar cuando se carga la página
window.addEventListener('DOMContentLoaded', ajustarHero);
// Ejecutar cuando se redimensiona (por si cambia la altura del nav)
window.addEventListener('resize', ajustarHero);

// FIN DEL AJUSTE AUTOMATICO DE LA NAV CON EL HERO //

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

// CAMBIO DE ÍCONO EN BOTÓN HAMBURGUESA //
const botonHamburguesa = document.querySelector('.botonHamburguesa');
const iconoHamburguesa = botonHamburguesa.querySelector('i');
const navCollapse = document.querySelector('#navbarSupportedContent');

// Alternar ícono cuando se abre/cierra manualmente
botonHamburguesa.addEventListener('click', () => {
    if (iconoHamburguesa.classList.contains('bi-list')) {
        iconoHamburguesa.classList.remove('bi-list');
        iconoHamburguesa.classList.add('bi-x');
    } else {
        iconoHamburguesa.classList.remove('bi-x');
        iconoHamburguesa.classList.add('bi-list');
    }
});

// 1️⃣ Cerrar el menú cuando se hace clic en un enlace del menú
const enlacesMenu = document.querySelectorAll('.navbar-nav .nav-link');
enlacesMenu.forEach(enlace => {
    enlace.addEventListener('click', () => {
        const bsCollapse = new bootstrap.Collapse(navCollapse, { toggle: false });
        bsCollapse.hide();
        iconoHamburguesa.classList.remove('bi-x');
        iconoHamburguesa.classList.add('bi-list');
    });
});

// 2️⃣ Cerrar el menú al hacer clic fuera de él
document.addEventListener('click', (e) => {
    const menuAbierto = navCollapse.classList.contains('show');
    const clicDentroMenu = navCollapse.contains(e.target);
    const clicEnBoton = botonHamburguesa.contains(e.target);

    if (menuAbierto && !clicDentroMenu && !clicEnBoton) {
        const bsCollapse = new bootstrap.Collapse(navCollapse, { toggle: false });
        bsCollapse.hide();
        iconoHamburguesa.classList.remove('bi-x');
        iconoHamburguesa.classList.add('bi-list');
    }
});