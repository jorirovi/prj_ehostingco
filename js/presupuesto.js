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
    $contSubServicios.classList.add('presupuesto-contenedor-subserv')

    $slcServicio.addEventListener("change", () => {
        const subServicios = servicios.planes_adicionales.filter(item => item.idservicio === Number($slcServicio.value))
        console.log(subServicios)
        $contSubServicios.innerHTML = ""
        subServicios[0].items.forEach((item, index, array) => {
            const $chkSubServicios = crearInput({
                type: 'checkbox',
                name: 'subservicios',
                value: item.id
            })
            const $spanServicio = document.createElement('span')
            $spanServicio.classList.add('presupuesto-nom-subservicio')
            if ( index !== (array.length - 1)) {
                $spanServicio.textContent = `${item.nombre} | `
            } else {
                $spanServicio.textContent = `${item.nombre}`
            }
            
            $contSubServicios.append($chkSubServicios, $spanServicio)
            $fsetPresupuesto.append($contSubServicios)
        })
    })
}

cargarSelect()

