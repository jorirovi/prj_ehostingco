const $noticias = document.getElementById('noticias');
function iniScrollHorizontal() {
    gsap.registerPlugin(ScrollTrigger);

    let contenedores = gsap.utils.toArray(".contenedor-noticias");

    let scrollHorizontal = gsap.to(contenedores, {
        xPercent: -100 * (contenedores.length - 1),
        ease: "none",

        scrollTrigger : {
            trigger: '.noticias',
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => "+=" + (window.innerWidth * contenedores.length),
        }
    });
}

fetch("/prj_ehostingco/data/noticias.json")
    .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar el JSON: " + res.status);
        return res.json();
    })
    .then((data) => {
        $noticias.style.width = `${data.articles.length * 100}vw`;
        data.articles.forEach((item, index) => {
            const $contNoticias = document.createElement('div');
            const $notiContenido = document.createElement('div');
            $notiContenido.classList.add('noticias-contenido');
            const $contImgNoticia = document.createElement('div');
            $contImgNoticia.classList.add('noticia-contenido-img', `noticia-${index + 1}-img`);
            const $tituloNoticia = document.createElement('h3');
            $tituloNoticia.classList.add('noticia-titulo');
            $contImgNoticia.style.backgroundImage = `url("${item.image}")`;
            $contImgNoticia.addEventListener('mouseenter', () => {
                $contImgNoticia.style.backgroundImage = `url("../assets/images/hosting-horizontal.jpg")`;
                $tituloNoticia.textContent = item.title;
                $contImgNoticia.appendChild($tituloNoticia);
            });
            $contImgNoticia.addEventListener("mouseleave", () => {
                $contImgNoticia.style.backgroundImage = `url("${item.image}")`;
                $tituloNoticia.textContent = "";
            })
            $contImgNoticia.style.backgroundRepeat = "no-repeat";
            $contImgNoticia.style.backgroundPosition = "top center";
            $contImgNoticia.style.backgroundSize = "cover";
            const $noticiaDescripcion = document.createElement('p');
            $noticiaDescripcion.classList.add('noticia-contenido-descripcion');
            $noticiaDescripcion.textContent = item.description;
            const $irNoticia = document.createElement('a');
            $irNoticia.classList.add('noticia-link');
            $irNoticia.href = item.url;
            $irNoticia.textContent = "Ver Noticia"
            $notiContenido.append($contImgNoticia, $noticiaDescripcion, $irNoticia);
            $contNoticias.classList.add('contenedor-noticias', `noticia-${index + 1}`);
            $contNoticias.appendChild($notiContenido); 
            $noticias.appendChild($contNoticias);
        });
        iniScrollHorizontal();
        ScrollTrigger.refresh();
        
    })
    .catch((err) => console.error("Error:", err.message));