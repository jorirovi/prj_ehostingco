import { crearSelect, obtnerServicios } from "./helpers/presupuestohelper.js"

const $fsetPresupuesto = document.querySelector(".frm-presupuesto")

async function cargarSelect() {
    const servicios = await obtnerServicios()
    
    const opciones = await servicios.servicios.map(item => ({
        value: item.id,
        texto: item.nombre
    }))

    const $slcServicio = crearSelect({
        id: 'pais',
        name: 'pais'
    }, opciones)
    
    $fsetPresupuesto.appendChild($slcServicio)
} 

cargarSelect()

