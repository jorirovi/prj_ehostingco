const $navSecundario = document.getElementById('navsecundario');
const $menumov = document.getElementById('menumov');
const $secImagen = document.getElementById('seccionuno');
const $secGaleria = document.getElementById('secciondos');

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

const $imgcont = document.createElement('div');
$imgcont.classList.add('seccion-uno-img');
$secImagen.appendChild($imgcont);
animacionImagen()
