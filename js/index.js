const $navSecundario = document.getElementById('navsecundario');
const $menumov = document.getElementById('menumov')
const eslogan = "Empresa líder en soluciones 360º dentro de la industria de tecnologia."
const vision = "<span class='sub-titulo'>Vision</span>: Transformamos la manera en que las <strong>empresas</strong> y <strong>emprendedores</strong> construyen su presencia digital. Somos una compañía especializada en servicios de <strong>Hosting</strong>, <strong>desarrollo web</strong>, <strong>soluciones en la nube</strong> y <strong>arquitectura tecnológica personalizada</strong>, orientada a ofrecer rendimiento, seguridad y escalabilidad en cada proyecto.";
const mision = "<span class='sub-titulo'>Mision</span>: Brindar una infraestructura <strong>confiable</strong> y <strong>moderna</strong>, combinada con un equipo experto en innovación digital, para que nuestros clientes puedan enfocarse en hacer crecer su negocio mientras nosotros nos ocupamos del entorno tecnológico que lo impulsa.";
const $eslogan = document.getElementById('eslogan');
const $mision = document.getElementById('mision');
const $vision = document.getElementById('vision');
const $vmContent = document.getElementById('visionmision');
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
$imgVision.id = "imgVision";
$imgMision.id = "imgMision"
$imgMision.src = "./assets/images/mision.jpg";
$imgMision.alt = "mision";
$imgMision.height = 300;
$imgMision.width = 300;
$txtMision.classList.add('textoM')
$txtVision.classList.add('textoV')
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

// Animaciones
gsap.registerPlugin(ScrollTrigger, SplitText);

let split = SplitText.create("#eslogan", {type: "words, chars"})

split.chars.forEach((c, index) => {
    let esloganTl = gsap.timeline()

    esloganTl.from(c, {
        y: gsap.utils.random(-250, 250),
        x: gsap.utils.random(-500, 500),
        rotate: gsap.utils.random(-360, 360),
        scale: gsap.utils.random(0, 2),
        opacity: 0,
        duration: 0.75,
        ease: 'back.out',
        delay: index * 0.01,
    })
    esloganTl.from(c, {
        color: `rgb(${gsap.utils.random(0, 255)}, ${gsap.utils.random(0, 255)}, ${gsap.utils.random(0, 255)})`,
        duration: 1
    }, "-=.25")

    c.addEventListener("mouseenter", charsHover)
    let charsOriginalColor = window.getComputedStyle(c).color

    function charsHover() {
        gsap.timeline()
        .to(c, {
            y: gsap.utils.random(-50, 50),
            x: gsap.utils.random(-50, 50),
            rotate: gsap.utils.random(-90, 90),
            scale: gsap.utils.random(0.5, 1.5),
            duration: 0.05,
            ease: 'back.out',
            color: `rgb(${gsap.utils.random(0, 255)}, ${gsap.utils.random(0, 255)}, ${gsap.utils.random(0, 255)})`,
            onStart: () => {
                c.removeEventListener("mouseenter", charsHover)
            }
        })
        .to(c, {
            y: 0,
            x: 0,
            rotate: 0,
            scale: 1,
            duration: 0.05,
            color: charsOriginalColor,
            delay: 1,
            onComplete: () => {
                setTimeout(() => {
                    c.addEventListener("mouseenter", charsHover)
                }, 100)
            }
        })
    }
})

let imagenV = document.getElementById('imgVision')
let imagenM = document.getElementById('imgMision')
let imagenesMTl = gsap.timeline()
let imagenesVTl = gsap.timeline()
let textoM = SplitText.create(".textoM", {type: "words"})
let textoV = SplitText.create(".textoV", {type: "words"})

gsap.to(imagenM, {
    x: 0,
    opacity: 1,
    duration: 5,
    ease: "back.out",
    scrollTrigger: {
        trigger: "#visionmision",
        start: "-800px top",
    }
})
textoM.words.forEach((word) => {
    gsap.from(word, {
        y: 50,
        opacity: 1,
        rotate: 360,
        duration: 5,
        ease: "back.out",
        scrollTrigger: {
            trigger: "#visionmision",
            start: "-800px top",
        }
    })
})
gsap.to(imagenV, {
    x: 0,
    opacity: 1,
    duration: 5,
    ease: "back.out",
    scrollTrigger: {
        trigger: ".seccion-mision",
        start: "top top",
    }
})
textoV.words.forEach((word) => {
    gsap.from(word, {
        y: 50,
        opacity: 1,
        rotate: 360,
        duration: 5,
        ease: "back.out",
        scrollTrigger: {
            trigger: ".seccion-mision",
            start: "top top",
        }
    })
})





