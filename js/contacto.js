import { CreadorTagsHTML } from '../js/helpers/creartags.js'

//menu Secundario
const $navSecundario = document.getElementById('navsecundario')
const $menumov = document.getElementById('menumov')

itemsMenu.forEach(m => {
    const $a = document.createElement('a')
    $a.href = m.ruta;
    $a.textContent = m.item
    $navSecundario.appendChild($a)
});
$menumov.style.display = 'none'

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        $menumov.style.display = 'flex'
    } else {
        $menumov.style.display = 'none'
    }
})

const $contDatos = document.querySelector('.contacto-datos-card')
const $contSubTitulo = CreadorTagsHTML.crarDiv({
    id: 'contsubtitulo',
    className: 'contacto-contenedor-datos-subtitulo'
})
const $subtitulo = CreadorTagsHTML.crearH3({
    id: 'subtitulo',
    className: 'contacto-datos-subtitulo mb-100'
}, "Contactanos")
$contSubTitulo.appendChild($subtitulo)
const $contInfo = CreadorTagsHTML.crarDiv({
    id: 'continfo',
    className: 'contacto-contenedor-datos-info'
})
const etiquetas = ['Contacto:', 'teléfono:', 'Dirección:']
const datos = [
    'info@ehostingco.es',
    '+34 911 555 555',
    'C. de Basauri, 17, Moncloa - Aravaca, 28023 Madrid'
]
etiquetas.forEach((etiqueta, index) => {
    const $span = CreadorTagsHTML.crearSpan({
        id: `etiqueta_${index}`,
        className: 'contacto-datos-etiqueta-info'
    }, etiqueta)
    const $data = CreadorTagsHTML.crearP({
        id: `data_${index}`,
        className: 'contacto-datos-info'
    }, datos[index])
    $span.appendChild($data)
    $contInfo.appendChild($span)
})
$contDatos.append($contSubTitulo, $contInfo)

//Mapa
const navegacion = navigator.geolocation
const ehostincoLtd = 40.466656
const ehostincoLgn = -3.804888
const dirEH =  'C. de Basauri, 17, Moncloa - Aravaca, 28023 Madrid'
const telEH = '+34 911 555 555'
const emailEH = 'info@ehostingco.es'
const ehIcon = L.icon({
    iconUrl: '../assets/icon/ico-principal.svg',
    iconSize: [50,100],
    iconAnchor: [22,94],
    popupAnchor: [-3, -76]
})

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
}

function success(pos){
    const crd = pos.coords
    const latitud = crd.latitude
    const longitud = crd.longitude
    const map = L.map('map', {
        center:[latitud,longitud],
        zoom: 5
    })
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; eHostingCO'}).addTo(map)
    
    L.Routing.control({
        waypoints: [
            L.latLng(latitud,longitud),
            L.latLng(ehostincoLtd, ehostincoLgn)
        ],
        language: 'es',
        createMarker: function(i, wp, nWps) {
            switch(i){
                case 0:
                    return L.marker(wp.latLng).bindPopup('Inicio')
                case nWps-1:
                    return L.marker(wp.latLng, {icon: ehIcon}).bindPopup(`<b>Contacta con Nosotros</b>:<br>eHostingCO<br><b>Tlf</b>: ${telEH}<br><b>Email</b>: ${emailEH}<br><b>Dir</b>: ${dirEH}`).openPopup()
            }
        }
    }).addTo(map)
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`)
    const map = L.map('map').setView([ehostincoLtd, ehostincoLgn],13)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; eHostingCO'
    }).addTo(map)

    const marker = L.marker([ehostincoLtd, ehostincoLgn]).addTo(map)
    marker.bindPopup(`<b>Contacta con Nosotros</b>:<br>eHostingCO<br><b>Tlf</b>: ${telEH}<br><b>Email</b>: ${emailEH}<br><b>Dir</b>: ${dirEH}`).openPopup()

    const popup = L.popup()

    function onMapClick(e){
        popup
            .setLatLng(e.latlng)
            .setContent("Hiciste clic aquí: " + e.latlng.toString())
            .openOn(map);
    }

    map.on('click', onMapClick)
}

if (navegacion){
    navegacion.getCurrentPosition(
        success,
        error,
        options
    )
}
