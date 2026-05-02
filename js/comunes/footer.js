const direccion = 'C. de Basauri, 17, Moncloa - Aravaca, 28023 Madrid';
const derechos = "Todos los derechos reservados © 2026";
const $contenedorFooter = d.querySelector('footer');
const $titulopie = d.getElementById('pie');
const $direccion = d.getElementById('direccion');
const $iconosRS = d.getElementById('iconos');
const $derechos = d.getElementById('derechos');

const itemsFooter = [
    {
        id: "whatsapp",
        ico: "fa-brands fa-whatsapp",
        url: "#"
    },
    {
        id: "instagram",
        ico: "fa-brands fa-instagram",
        url: "#"
    },
    {
        id: "facebook",
        ico: "fa-brands fa-facebook",
        url: "#"
    },
    {
        id: "x",
        ico: "fa-brands fa-x",
        url: "#"
    }
];


$titulopie.textContent = nombreEmpresa;
$direccion.textContent = direccion;
itemsFooter.forEach(item => {
   const $linkRS = d.createElement('a');
    $linkRS.href = item.url
    const $icono = d.createElement('i');
    $icono.classList.add(...item.ico.split(" "));
    $linkRS.appendChild($icono);
    $iconosRS.appendChild($linkRS); 
});
$derechos.textContent = derechos;
$contenedorFooter.append($titulopie, $direccion, $iconosRS, $derechos);