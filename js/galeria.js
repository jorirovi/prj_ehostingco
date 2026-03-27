const $navSecundario = document.getElementById('navsecundario');
const $menumov = document.getElementById('menumov');
const $secImagen = document.getElementById('seccionuno');
const $secGaleria = document.getElementById('galeria');

itemsMenu.forEach(m => {
    const $a = document.createElement('a');
    $a.href = m.ruta;
    $a.textContent = m.item
    $navSecundario.appendChild($a);
});
$menumov.style.display = 'none';

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        $menumov.style.display = 'flex';
    } else {
        $menumov.style.display = 'none';
    }
});

async function obtenerServicios() {
    const url = '../data/servicios.json'
    const res = await fetch(url)
    const datos = await res.json()

    console.log(datos.servicios)
    
    datos.servicios.forEach((servicio) => {
        const $item = document.createElement('div')
        $item.classList.add('item')
        $item.setAttribute("data-title", servicio.nombre)
        $item.setAttribute("data-secundary", servicio.preciomes)
        $item.setAttribute("data-text", servicio.descripcion)
        const $imgServicio = document.createElement('img')
        $imgServicio.classList.add('img-servicio')
        $imgServicio.src = servicio.url
        $imgServicio.alt = servicio.nombre
        $item.appendChild($imgServicio)
        $secGaleria.appendChild($item)
    })
    const $detalle = document.createElement('div')
    $detalle.classList.add('detail')
    const $imgDetalle = document.createElement('img')
    const $contenido = document.createElement('div')
    $contenido.classList.add('content')
    const $titulo = document.createElement('div')
    $titulo.classList.add('title')
    const $secundario = document.createElement('div')
    $secundario.classList.add('secondary')
    const $descripcion = document.createElement('div')
    $descripcion.classList.add('description')
    $contenido.append($titulo, $secundario, $descripcion)
    $detalle.append($imgDetalle, $contenido)
    const $app = document.querySelector('.seccion-galeria')
    $app.appendChild($detalle)
}

obtenerServicios()


// Animaciones
function animacionImagen() {
    let imagen = document.querySelector(".seccion-uno-img")

    gsap.from(imagen, {
        bacground: "red",
        x: -3000,
        scale: 1,
        duration: 2,
        delay: 1,
        ease: "elastic.out(1,.5)"
    })
}

/*const contBoton = document.createElement('div')
const boton = document.createElement('button')
const contCajas = document.createElement('div')
const caja1 = document.createElement('div')
const caja2 = document.createElement('div')
contBoton.classList.add('contenedor-boton')
boton.classList.add('boton')
boton.id = 'btnflip'
boton.textContent = "FLIP"
contBoton.appendChild(boton)
contCajas.classList.add('contenedor-cajas')
caja1.classList.add('caja1', 'caja')
caja2.classList.add('caja2', 'caja')
contCajas.append(caja1, caja2)
$secGaleria.append(contBoton, contCajas)

const $imgcont = document.createElement('div');
$imgcont.classList.add('seccion-uno-img');
$secImagen.appendChild($imgcont);
animacionImagen()


gsap.registerPlugin(Flip)
const squares = gsap.utils.toArray(".caja")

function doFlip() {
    const state = Flip.getState(squares)
    swap(squares)
    Flip.from(state, {duration: 5, ease:"back.out"});
}

function swap([a, b]) {
  a.parentNode.children[0] === a ? a.parentNode.appendChild(a) : a.parentNode.appendChild(b);
}

document.getElementById('btnflip').addEventListener('click', doFlip)*/

