import { crearInput, crearSelect, obtenerDescuentos, obtnerServicios } from "./helpers/presupuestohelper.js"

const $fsetPresupuesto = document.querySelector(".frm-presupuesto")

//funcion para cargar el contenido del presupeusto
async function cargarSelect() {
    //Carga de datos
    const servicios = await obtnerServicios()
    const descuentos = await obtenerDescuentos()
    
    const $contServicios = document.createElement('div')
    const $lblServicios = document.createElement('label')
    $contServicios.classList.add('presupuesto-contenedor-Servicios')
    $lblServicios.textContent = "Seleccione el servicio requerido:"
    //carga las opciones del Select
    const opciones = await servicios.servicios.map(item => ({
        value: item.id,
        texto: item.nombre
    }))

    //crea el select para los servicios ofrecidos
    const $slcServicio = crearSelect({
        id: 'pais',
        name: 'pais'
    }, opciones)
    $contServicios.append($lblServicios, $slcServicio)
    $fsetPresupuesto.appendChild($contServicios)
    const $contSubServicios = document.createElement('div')
    const $contPlazos = document.createElement('div')
    $contSubServicios.classList.add('presupuesto-contenedor-subserv')
    $contPlazos.classList.add('presupuesto-cont-plazos')

    $slcServicio.addEventListener("change", async () => {
        const subServicios = servicios.planes_adicionales.filter(item => item.idservicio === Number($slcServicio.value))
        console.log(subServicios)
        $contPlazos.innerHTML = ""
        const $lblPlazos = document.createElement('label')
        $lblPlazos.textContent = 'Seleccione los plazos requeridos para descuento:'
        //cargar las opciones del select de Descuentos
        const opcioneDes = await descuentos.descuentos.map(item => ({
            value: item.id,
            texto: item.plazo
        }))
        //crear select para los plazos
        const $slcPlazos = crearSelect({
            id: 'plazos',
            name: 'plazos'
        }, opcioneDes)
        $contPlazos.append($lblPlazos, $slcPlazos)
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

