import { CreadorTagsHTML } from '../js/helpers/creartags.js'

const $contDatos = document.querySelector('.contacto-datos-card')
const $contSubTitulo = CreadorTagsHTML.crarDiv({
    id: 'contsubtitulo',
    className: 'contacto-contenedor-datos-subtitulo'
})
const $subtitulo = CreadorTagsHTML.crearH3({
    id: 'subtitulo',
    className: 'contacto-datos-subtitulo'
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