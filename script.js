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

// FIN DEL MENÚ //

// FILTRO SECCIÓN GALERÍA //

// Duraciones (ms)
const FADE_OUT_DURATION = 180;
const FLIP_DURATION = 330;

function getRectsMap(elements) {
    const map = new Map();
    elements.forEach(el => map.set(el, el.getBoundingClientRect()));
    return map;
}

function playFLIP(prevRects, afterElements) {
    const newRects = getRectsMap(afterElements);

    afterElements.forEach(el => {
        const prev = prevRects.get(el);
        const next = newRects.get(el);
        if (!prev || !next) return;

        const dx = prev.left - next.left;
        const dy = prev.top - next.top;

        if (dx === 0 && dy === 0) return;

        // Aplicar el transform inverso
        el.style.transform = `translate(${dx}px, ${dy}px)`;
        el.style.transition = 'transform 0s'; // sin transición todavía
        // forzamos reflow
        el.getBoundingClientRect();

        // En la siguiente frame, animamos a transform none
        requestAnimationFrame(() => {
            el.style.transition = `transform ${FLIP_DURATION}ms cubic-bezier(.2,.8,.2,1)`;
            el.style.transform = '';
        });

        // cleanup al terminar
        el.addEventListener('transitionend', function handler(e) {
            if (e.propertyName === 'transform') {
                el.style.transition = '';
                el.style.transform = '';
                el.removeEventListener('transitionend', handler);
            }
        });
    });
}

function filtrarPorClase(claseMostrar) {
    const items = Array.from(document.querySelectorAll('.contenedorIMGSeccionGaleria'));

    // Separar arrays
    const shouldShow = item => (claseMostrar === 'todo' || item.classList.contains(claseMostrar));
    const toHide = items.filter(i => !shouldShow(i) && i.style.display !== 'none');
    const stillOrWillShow = items.filter(i => shouldShow(i));

    // 1) Fade-out rápido de los que se van a ocultar
    toHide.forEach(el => {
        el.classList.add('fade-out');
    });

    // Esperamos a que termine el fade-out (FADE_OUT_DURATION)
    setTimeout(() => {
        // 2) Medir posiciones antes de cambiar el layout (FIRST)
        const beforeRects = getRectsMap(items.filter(i => i.style.display !== 'none')); // rects solo de los visibles ahora

        // 3) Cambiar layout: ocultar del DOM visual (display:none) los que no corresponden
        toHide.forEach(el => {
            el.style.display = 'none';
            el.classList.remove('fade-out');
        });

        // 3b) Aseguramos que los que deben mostrarse estén con display block (pero con pre-enter para fade-in)
        stillOrWillShow.forEach(el => {
            if (el.style.display === 'none') {
                // elemento que vuelve a mostrarse
                el.style.display = ''; // permite volver a su display por defecto (grid item)
                el.classList.add('pre-enter');
            }
        });

        // Forzamos un reflow para que el layout se recalcule
        document.body.getBoundingClientRect();

        // 4) Medir posiciones después del cambio (LAST) — tomamos sólo los elementos que quedan visibles ahora
        const afterElements = Array.from(document.querySelectorAll('.contenedorIMGSeccionGaleria'))
            .filter(el => el.style.display !== 'none');

        // 5) Ejecutar FLIP para animar reacomodo
        playFLIP(beforeRects, afterElements);

        // 6) Animar la entrada de elementos nuevos (si los hay)
        // quitamos la clase pre-enter con una pequeña delay para permitir la animación
        requestAnimationFrame(() => {
            afterElements.forEach(el => {
                if (el.classList.contains('pre-enter')) {
                    // animamos opacity+scale manualmente
                    el.style.transition = `opacity ${FADE_OUT_DURATION}ms ease, transform ${FADE_OUT_DURATION}ms ease`;
                    el.classList.remove('pre-enter');
                    // forzamos reflow y luego quitar transform para que aparezca
                    el.getBoundingClientRect();
                    // quitar inline transition después del end
                    el.addEventListener('transitionend', function handler(e) {
                        if (e.propertyName === 'opacity' || e.propertyName === 'transform') {
                            el.style.transition = '';
                            el.removeEventListener('transitionend', handler);
                        }
                    });
                }
            });
        });

    }, FADE_OUT_DURATION + 10); // pequeño buffer
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

// NO APARECE EN LA URL EL # //

document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // Evita que cambie la URL

        const destino = document.querySelector(this.getAttribute('href'));

        // Hace el scroll suave hacia el ID
        destino.scrollIntoView({ behavior: 'smooth' });
    });
});

// Función para formatear fecha de YYYY-MM-DD a DD/MM/YYYY
function formatearFecha(fechaISO) {
    if (!fechaISO) return "";
    const [año, mes, dia] = fechaISO.split("-");
    return `${dia}/${mes}/${año}`;
}

// FIN DEL NO APARECE EN LA URL EL # //

// LINK DE WHATSAPP //

document.querySelector(".formulario form").addEventListener("submit", function (e) {
    e.preventDefault(); // evita recargar la página

    // Obtener valores del formulario
    const nombre = document.getElementById("inputNombreApellido").value.trim();
    const tipoEvento = document.getElementById("inputTipoEvento").value.trim();
    const fecha = document.getElementById("inputFechaEstimada").value.trim();
    const invitados = document.getElementById("inputCantidadInvitados").value.trim();
    const telefono = document.getElementById("inputTelefono").value.trim();
    const mensaje = document.getElementById("floatingTextarea").value.trim();

    // Formatear fecha
    const fechaFormateada = formatearFecha(fecha);

    // Tu número de WhatsApp
    const numeroDestino = "5491133742086";

    let texto = "";

    // Si escribió mensaje → incluirlo
    if (mensaje.length > 0) {
        texto = `
Hola, quisiera solicitar un presupuesto. Dejo los datos:

* *Nombre y apellido:* ${nombre}
* *Tipo de evento:* ${tipoEvento}
* *Fecha estimada:* ${fechaFormateada}
* *Cantidad de invitados:* ${invitados}
* *Número de WhatsApp:* ${telefono}

* *Mensaje:*
${mensaje}`;
    }
    // Si NO escribió mensaje → versión sin mensaje
    else {
        texto = `
Hola, quisiera solicitar un presupuesto. Dejo los datos:

* *Nombre y apellido:* ${nombre}
* *Tipo de evento:* ${tipoEvento}
* *Fecha estimada:* ${fechaFormateada}
* *Cantidad de invitados:* ${invitados}
* *Número de WhatsApp:* ${telefono}`;
    }

    // Encode para WhatsApp
    const textoFinal = encodeURIComponent(texto);

    // Crear enlace
    const enlace = `https://wa.me/${numeroDestino}?text=${textoFinal}`;

    // Abrir WhatsApp
    window.open(enlace, "_blank");
});

// FIN DEL LINK DE WHATSAPP //