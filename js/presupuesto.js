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
        texto: item.nombre,
        costo: item.preciomes
    }))

    //crea el select para los servicios ofrecidos
    const $slcServicio = crearSelect({
        id: 'servicio',
        name: 'servicio'
    }, opciones)
    $contServicios.append($lblServicios, $slcServicio)
    $fsetPresupuesto.appendChild($contServicios)
    const $contSubServicios = document.createElement('div')
    const $contPlazos = document.createElement('div')
    $contSubServicios.classList.add('presupuesto-contenedor-subserv')
    $contPlazos.classList.add('presupuesto-cont-plazos')

    $slcServicio.addEventListener("change", async (e) => {
        const idServ = Number(e.target.value)
        const subServicios = servicios.planes_adicionales.find(item => item.idservicio === idServ)
        console.log(subServicios)
        $contPlazos.innerHTML = ""
        const $lblPlazos = document.createElement('label')
        $lblPlazos.textContent = 'Seleccione los plazos requeridos para descuento:'
        //cargar las opciones del select de Descuentos
        const opcioneDes = await descuentos.descuentos.map(item => ({
            value: item.id,
            texto: item.plazo,
            costo: item.descuento
        }))

        //variable para almacenar el costo del servicio seleccionado
        let costoServicio = 0
        const selectedOption = e.target.selectedOptions[0]
        costoServicio = Number(selectedOption.dataset.cost)
        console.log(costoServicio)

        //crear select para los plazos
        const $slcPlazos = crearSelect({
            id: 'plazos',
            name: 'plazos'
        }, opcioneDes)
        $contPlazos.append($lblPlazos, $slcPlazos)
        $contSubServicios.innerHTML = ""
        subServicios.items.forEach((item, index, array) => {
            const $lblSubServicios = document.createElement('label')
            $lblSubServicios.classList.add('presupuesto-label-subSer')
            const $chkSubServicios = crearInput({
                type: 'checkbox',
                name: 'subservicios',
                value: item.id,
            })
            $chkSubServicios.dataset.costm = item.costM
            const $spanServicio = document.createElement('span')
            $spanServicio.classList.add('presupuesto-nom-subservicio')
            $spanServicio.textContent = `${item.nombre}`
            $lblSubServicios.append($chkSubServicios, $spanServicio)
            $contSubServicios.appendChild($lblSubServicios)
            $fsetPresupuesto.append($contPlazos, $contSubServicios)

            //variable para calculo de total de los sub-servicios seleccionados
            let totalCostoSS = 0
            $contSubServicios.addEventListener("change", (e) => {
                if(e.target.type === "checkbox") {
                    const costoMensual = Number(e.target.dataset.costm)
                    if(e.target.checked) {
                        totalCostoSS += costoMensual
                    } else {
                        totalCostoSS -= costoMensual
                    }
                }
            })
        })
    })
}

cargarSelect()

