import { crearInput, crearSelect, obtnerServicios } from "./helpers/presupuestohelper.js"

const $fsetPresupuesto = document.querySelector(".frm-presupuesto")

async function cargarSelect() {
    //Carga de datos
    const servicios = await obtnerServicios()
    
    //carga las opciones del Select
    const opciones = await servicios.servicios.map(item => ({
        value: item.id,
        texto: item.nombre
    }))

    //crea el select
    const $slcServicio = crearSelect({
        id: 'pais',
        name: 'pais'
    }, opciones)
    
    $fsetPresupuesto.appendChild($slcServicio)
    const $contSubServicios = document.createElement('div')
    const $contPlazos = document.createElement('div')
    $contSubServicios.classList.add('presupuesto-contenedor-subserv')
    $contPlazos.classList.add('presupuesto-cont-plazos')

    $slcServicio.addEventListener("change", () => {
        const subServicios = servicios.planes_adicionales.filter(item => item.idservicio === Number($slcServicio.value))
        console.log(subServicios)
        $contPlazos.innerHTML = ""
        const plazosTexto = [
            "De 1 a 5 meses 0% de descuento sobre el costo del servicio",
            "De 6 a 11 meses 10% de descuento sobre el costo del servicio",
            "De 12 a 19 meses 20% de descuento sobre el costo del servicio",
            "De 20 a 24 meses 30% de descuento sobre el costo del servicio"
        ]
        const $listaPlazos = document.createElement('ul')
        plazosTexto.forEach((plazo, index, array) => {
            const $itemPlazo = document.createElement('li')
            $itemPlazo.textContent = plazo
            $listaPlazos.appendChild($itemPlazo)
        })
        $contPlazos.appendChild($listaPlazos)
        $contSubServicios.innerHTML = ""
        subServicios[0].items.forEach((item, index, array) => {
            const $lblSubServicios = document.createElement('label')
            $lblSubServicios.classList.add('presupuesto-label-subSer')
            const $chkSubServicios = crearInput({
                type: 'checkbox',
                name: 'subservicios',
                value: item.id
            })
            const $spanServicio = document.createElement('span')
            $spanServicio.classList.add('presupuesto-nom-subservicio')
            $spanServicio.textContent = `${item.nombre}`
            $lblSubServicios.append($chkSubServicios, $spanServicio)
            $contSubServicios.appendChild($lblSubServicios)
            $fsetPresupuesto.append($contPlazos, $contSubServicios)
        })
    })
}

cargarSelect()

