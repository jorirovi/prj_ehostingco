const d = document;
const nombreEmpresa = "eHostingCO";
const enVistas = window.location.pathname.includes("/views/");
const base = enVistas ? ".." : ".";
const itemsMenu = [
    {
        item: "Inicio",
        ruta: `${base}/index.html`
    },
    {
        item: "Galeria",
        ruta: `${base}/views/galeria.html`
    },
    {
        item: "Presupuesto",
        ruta: `${base}/views/presupuesto.html`
    },
    {
        item: "contacto",
        ruta: `${base}/views/contacto.html`
    }
];
function animacionCabecera() {
    let titulo = document.getElementById('titulo')
    gsap.from(titulo, {
        y: -200,
        duration: 1,
        delay: .5,
        ease: "power3.out"
    })
    gsap.from(".menu-item", {
        y: -200,
        duration: 1,
        delay: .5,
        ease: "power3.out",
        stagger: 0.05
    })
}

const $cabecera = d.querySelector('header')
const $titulo = d.getElementById('titulo');
$titulo.textContent = nombreEmpresa;
const $navegador = d.getElementById('menu');

itemsMenu.forEach(item => {
    const $ancla = d.createElement('a');
    $ancla.classList.add('menu-item')
    $ancla.href = item.ruta;
    $ancla.textContent = item.item;
    $navegador.appendChild($ancla);
});
$cabecera.append($titulo, $navegador);
animacionCabecera()