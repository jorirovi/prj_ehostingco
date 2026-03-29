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
        $item.setAttribute("data-secondary", servicio.preciomes)
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

    //Animacion-galeria
    gsap.registerPlugin(Flip, ScrollTrigger)

    const items = gsap.utils.toArray(".item")
    //details = $detalle
    //detailContent = $contenido
    //detailImage = $imgDetalle
    //deatailTitle = $titulo
    //detailSecondary = $secundario
    //detailDescription = $descripcion
    let activeItem
    gsap.set($contenido, {yPercent: -100})

    function showDetails(item){
        if (activeItem) {
            return hideDetails()
        }
        let onLoad = () => {
            Flip.fit($detalle, item, {
                scale: true,
                fitChild: $imgDetalle
            })
            const state = Flip.getState($detalle)
            gsap.set($detalle, {clearProps: true})
            gsap.set($detalle, {
                xPercent: -50,
                top: "50%",
                yPercent: -50,
                visibility: "visible",
                overflow: "hidden"
            })
            Flip.from(state, {
                duration: .5,
                ease: "power2.inOut",
                scale: true,
                onComplete: () => gsap.set($detalle, {overflow: "auto"})
            })
            .to($contenido, {yPercent: 0}, 0.2)

            $imgDetalle.removeEventListener("load", onLoad)
            document.addEventListener('click', hideDetails)
        }
        const data = item.dataset;
        $imgDetalle.addEventListener("load", onLoad)
        $imgDetalle.src = item.querySelector('.img-servicio').src
        $titulo.innerText = data.title
        $secundario.innerText = `Precio desde: ${data.secondary} EUR al mes`
        $descripcion.innerText = data.text

        gsap.to(items, {
            opacity: 0.3,
            stagger: {
                amount: 1,
                from: items.indexOf(item),
                grid: "auto"
            }
        }).kill(item)
        gsap.to(".galeria", {
            backgroundColor: "#888",
            duration: 1,
            delay: 0.3
        })
        activeItem = item
    }

    function hideDetails() {
        document.removeEventListener('click', hideDetails)
        gsap.set($detalle, {overflow: "hidden"})

        const state = Flip.getState($detalle)

        Flip.fit($detalle, activeItem, {
            scale: true,
            fitChild: $imgDetalle
        })
        const tl = gsap.timeline()
        tl.set($detalle, {
            overflow: "hidden"
        }).to($contenido, {
            yPercent: -100
        }).to(items, {
            opacity: 1,
            stagger: {
                amount: 0.7,
                from: items.indexOf(activeItem),
                grid: "auto"
            }
        }).to(".galeria", {
            backgroundColor: "#D2CA9F"
        }, "<")

        Flip.from(state, {
            scale: true,
            duration: 0.5,
            delay: 0.2,
            onInterrupt: () => tl.kill()
        }).set($detalle, {
            visibility: "hidden"
        })
        activeItem = null
    }

    gsap.utils.toArray(".item").forEach(item => item.addEventListener('click', () => showDetails(item)))

    window.addEventListener('load', () => {
        gsap.to('.seccion-galeria', {
            autoAlpha: 1,
            duration: 0.2
        })
        gsap.from('.item', {
            autoAlpha: 1,
            yPercent: 30,
            stagger: 0.04,
            /*scrollTrigger: {
                trigger: ".seccion-galeria",
                start: "top top"
            }*/
        })
    })
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

