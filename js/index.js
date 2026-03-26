const $navSecundario = document.getElementById('navsecundario');
const $menumov = document.getElementById('menumov')
const eslogan = "Empresa líder en soluciones 360º dentro de la industria de tecnologia."
const vision = "<span class='sub-titulo'>Vision</span>: Transformamos la manera en que las <strong>empresas</strong> y <strong>emprendedores</strong> construyen su presencia digital. Somos una compañía especializada en servicios de <strong>Hosting</strong>, <strong>desarrollo web</strong>, <strong>soluciones en la nube</strong> y <strong>arquitectura tecnológica personalizada</strong>, orientada a ofrecer rendimiento, seguridad y escalabilidad en cada proyecto.";
const mision = "<span class='sub-titulo'>Mision</span>: Brindar una infraestructura <strong>confiable</strong> y <strong>moderna</strong>, combinada con un equipo experto en innovación digital, para que nuestros clientes puedan enfocarse en hacer crecer su negocio mientras nosotros nos ocupamos del entorno tecnológico que lo impulsa.";
const $eslogan = document.getElementById('eslogan');
const $mision = document.getElementById('mision');
const $vision = document.getElementById('vision');
const $vmContent = document.getElementById('visionmision')
const $imgVision = document.createElement('img');
const $txtVision = document.createElement('p');
const $imgMision = document.createElement('img');
const $txtMision = document.createElement('p');

itemsMenu.forEach(m => {
    const $a = document.createElement('a');
    $a.href = m.ruta;
    $a.textContent = m.item
    $navSecundario.appendChild($a);
});
$menumov.style.display = 'none';
$eslogan.textContent = eslogan;
$eslogan.style.color = '#fff';
$vmContent.classList.add('seccion-mision-vision');
$imgMision.src = "./assets/images/mision.jpg";
$imgMision.alt = "mision";
$imgMision.height = 300;
$imgMision.width = 300;
$txtMision.innerHTML = mision;
$mision.append($imgMision, $txtMision);
$imgVision.src = "./assets/images/vision.jpg";
$imgVision.alt = "vision";
$imgVision.height = 300;
$imgVision.width = 300;
$txtVision.innerHTML = vision;
$vision.append($imgVision, $txtVision);


window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        $menumov.style.display = 'flex';
    } else {
        $menumov.style.display = 'none';
    }
});

gsap.registerPlugin(ScrollTrigger, SplitText);

/*gsap.from("#eslogan", {
x: -3000,
duration: 1,
ease: "power3.out",
scrollTrigger: {
    trigger: "#eslogan",
    start: "top 50%", 
}
});*/

let split = SplitText.create("#eslogan", {type: "words, chars"})
split.chars.forEach(c => {
    gsap.from(c, {
        y: gsap.utils.random(-250, 250),
        x: gsap.utils.random(-500, 500),
        delay: 1,
        scale: 3
    })
})





