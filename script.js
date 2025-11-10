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