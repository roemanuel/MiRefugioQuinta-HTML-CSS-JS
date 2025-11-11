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