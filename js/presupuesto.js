import { DatosPresupuesto, Presupuesto } from "./helpers/presupuestohelper.js"

//Llamaremos a los fieldset=fs
const $formulario = document.querySelector('.frm-contacto')
const $fsDatos = document.querySelector('.frm-datos')
const $fsPresupuesto = document.querySelector('.frm-presupuesto')
const $fsEnvio = document.querySelector('.frm-envio')

//#region fildset de Datos
//creamos los div que contendran lod labels y inputs para el fieldset de datos-personales
const $divNombre = Presupuesto.crearDiv({
    className: "presupuesto-contenedor-campos"
})
const $divApellido = Presupuesto.crearDiv({
    className: "presupuesto-contenedor-campos"
})
const $divTelefono = Presupuesto.crearDiv({
    className: "presupuesto-contenedor-campos"
})
const $divEmail = Presupuesto.crearDiv({
    className: "presupuesto-contenedor-campos"
})

//creamos los labels
const $lblNombre = Presupuesto.crearLabel({
    htmlFor: "nombre",
    className: "presupuesto-etiqueta-campo"
}, "Nombre:")
const $lblApellido = Presupuesto.crearLabel({
    htmlFor: "apellido",
    className: "presupuesto-etiqueta-campo"
}, "Apellido:")
const $lblTelefono = Presupuesto.crearLabel({
    htmlFor: "tel",
    className: "presupuesto-etiqueta-campo"
}, "N. de Telefono:")
const $lblEmail = Presupuesto.crearLabel({
    htmlFor: "email",
    className: "presupuesto-etiqueta-campo"
}, "Email:")


//cramos los inputs
const $inpNombre = Presupuesto.crearInput({
    id: 'nombre',
    type: 'text',
    name: 'nombre',
    placeholder: 'Indique su Nombre',
    title: "Formato de nombre incorrecto",
    pattern: "^[A-Za-zÑñÁáÉéÍíÓóÚúÜü]+$",
    maxLength: "15",
    required: true
})
const $inpApellido = Presupuesto.crearInput({
    id: 'apellido',
    type: 'text',
    name: 'apellido',
    placeholder: 'Indique su Apellido',
    title: "Formato de apellido incorrecto",
    pattern: "^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$",
    maxLength: "30",
    required: true
})
const $inpTelefono = Presupuesto.crearInput({
    id: 'tel',
    type: 'text',
    name: 'tel',
    autocomplete: 'tel',
    placeholder: 'Indique su N de Telefono',
    title: "Formato de Telefono incorrecto",
    pattern: "^[6-9][0-9]{8}$",
    maxLength: 9,
    required: true
})
const $inpEmail = Presupuesto.crearInput({
    id: 'email',
    type: 'email',
    name: 'email',
    autocomplete: 'email',
    placeholder: 'Indique su Email',
    title: "Formato de Email incorrecto",
    pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
    required: true
})

$divNombre.append($lblNombre, $inpNombre)
$divApellido.append($lblApellido, $inpApellido)
$divTelefono.append($lblTelefono, $inpTelefono)
$divEmail.append($lblEmail, $inpEmail)

$fsDatos.append($divNombre, $divApellido, $divTelefono, $divEmail)
//#endregion

//#region Fildset de Presupuesto
//Esta funcion es la encargada de cargar todo el fildset y logica del fildset de presupuesto
async function cargarSelect() {
    //cargamos datos de los json
    //json de servicios
    const servicios = await Presupuesto.obtenerServicios()
    //json de descuentos
    const descuentos = await Presupuesto.obtenerDescuentos()
    //contenedores
    const $contServicios = Presupuesto.crearDiv({
        className: "presupuesto-contenedor-Servicios"
    })
    const $contSubServicios = Presupuesto.crearDiv({
        className: "presupuesto-contenedor-subserv"
    })
    const $contPlazos = Presupuesto.crearDiv({
        className: "presupuesto-cont-plazos"
    })
    const $contCostos = Presupuesto.crearDiv({
        className: "presupuesto-cont-costos"
    })
    //labels y select para servicios
    const $lblServicios = Presupuesto.crearLabel({
        htmlFor: "servicio",
        className: "presupuesto-servicio-label"
    }, "Seleccione el servicio requerido:")
    const opciones = servicios.servicios.map(item => ({
        value: item.id,
        texto: item.nombre,
        costo: item.preciomes,
    }))
    const $slcServicio = Presupuesto.crearSelect({
        id: 'servicio',
        name: 'servicio',
        required: true
    }, opciones)
    //labels y select para descuentos
     const $lblPlazos = Presupuesto.crearLabel({
        htmlFor: "plazo",
        className: "presupuesto-plazos-label"
     }, "Seleccione los plazos requeridos para descuento:")
     const opcioneDes = descuentos.descuentos.map(item => ({
        value: item.id,
        texto: item.plazo,
        costo: item.descuento
    }))
    const $slcPlazos = Presupuesto.crearSelect({
        id: 'plazo',
        name: 'plazo',
        required: true
    }, opcioneDes)
    $slcPlazos.disabled = true
    const $lblCostServ = Presupuesto.crearLabel({
        htmlFor: "costServicio",
        className: "presupeuestos-lbl"
    }, "Costo Servicio:")
    const $txtCostServ = Presupuesto.crearInput({
        id: "costServicio",
        type: "number",
        readOnly: true,
        className: "presupuesto-txt",
        value: 0
    })
    const $lblCostSS = Presupuesto.crearLabel({
        htmlFor: "costSS",
        className: "presupeuestos-lbl"
    }, "Costo Sub-Servicios:")
    const $txtCostSS = Presupuesto.crearInput({
        id: "costSS",
        type: "number",
        readOnly: true,
        className: "presupuesto-txt",
        value: 0
    })
    const $lblCostoTotal = Presupuesto.crearLabel({
        htmlFor: "costoTotal",
        className: "presupeuestos-lbl"
    }, "Costo Total:")
    const $txtCostoTotal = Presupuesto.crearInput({
        id: "costoTotal",
        type: "number",
        readOnly: true,
        className: "presupuesto-txt",
        value: 0
    })
    $contServicios.append($lblServicios, $slcServicio)
    $lblCostServ.appendChild($txtCostServ)
    $lblCostSS.appendChild($txtCostSS)
    $lblCostoTotal.appendChild($txtCostoTotal)
    $contCostos.append($lblCostServ, $lblCostSS, $lblCostoTotal)
    $contPlazos.append($lblPlazos, $slcPlazos)
    $fsPresupuesto.append($contServicios, $contSubServicios, $contPlazos, $contCostos)

    let costoServicio = 0
    let descuentoPorcentaje = 0
    let totalCostoSS = 0
    let nomSubser = ""
    let costoTotal = 0
    let porcetajeAplicado = 0

    $slcServicio.addEventListener("change", (e) => {
        const idServ = Number(e.target.value)
        const subServicio = servicios.planes_adicionales.find(item => item.idservicio === idServ)
        const selectedOption = e.target.selectedOptions[0]
        costoServicio = Number(selectedOption.dataset.cost) || 0
        nomSubser = selectedOption.textContent
        $slcPlazos.disabled = true

        descuentoPorcentaje = 0
        totalCostoSS = 0
        costoTotal = 0
        porcetajeAplicado = 0
        $txtCostServ.value = 0
        $txtCostSS.value = 0
        $txtCostoTotal.value = 0
        $slcPlazos.selectedIndex = 0
        $contSubServicios.innerHTML = ""
        if (!subServicio) return

        const $pTextoSubServicio = Presupuesto.crearParrafo({
            className: "presupuesto-titulo-susbservicios"
        }, "Seleccione el/los Sub-Servicio(s):")

        $contSubServicios.appendChild($pTextoSubServicio)
        subServicio.items.forEach(item => {
            const $conteOpciones = Presupuesto.crearDiv({
                className: "presupuesto-contenedor-opcioneSS"
            })
            const $lblSubServicios = Presupuesto.crearLabel({
                //htmlFor: "subservicio",
                className: "presupuesto-label-subSer"
            }, item.nombre)
            const $chkSubServicios = Presupuesto.crearInput({
                type: 'checkbox',
                name: 'subservicios',
                value: item.id,
            })
            $chkSubServicios.dataset.costm = item.costM
            
            $conteOpciones.append($lblSubServicios, $chkSubServicios)
            $contSubServicios.appendChild($conteOpciones)
        })
        $txtCostServ.value = costoServicio
        costoTotal += costoServicio
        $txtCostoTotal.value = costoTotal
        Presupuesto.validarChkSS()
    })

    $contPlazos.addEventListener("change", (e) => {
        if (e.target.id !== "plazo") return
        const selectOption = e.target.selectedOptions[0]
        descuentoPorcentaje = Number(selectOption.dataset.cost) || 0
        const checkboxes = $contSubServicios.querySelectorAll('input[type="checkbox"]')
        checkboxes.forEach(chk => {
            chk.disabled = true
        })
        porcetajeAplicado = 0
        costoTotal = costoServicio + totalCostoSS
        porcetajeAplicado = costoTotal * descuentoPorcentaje
        costoTotal = costoTotal - porcetajeAplicado
        $txtCostoTotal.value = costoTotal
    })

    $contSubServicios.addEventListener("change", (e) => {
        if (e.target.type !== "checkbox") return
        const checkboxes = $contSubServicios.querySelectorAll('input[type="checkbox"]')
        if (e.target.value === "1") {
            if (e.target.checked) {
                checkboxes.forEach(chk => {
                    if (chk !== e.target) {
                        chk.disabled = true
                        chk.checked = false
                    } 
                })
            } else {
                checkboxes.forEach(chk => {
                    chk.disabled = false
                })
            }
            $slcPlazos.disabled = false
            $txtCostoTotal.value = costoServicio
            $txtCostSS.value = 0
            return
        }
        $slcPlazos.disabled = false
        const costoMensual = Number(e.target.dataset.costm) || 0
        if (e.target.checked) {
            totalCostoSS += costoMensual
            costoTotal += costoMensual
        } else {
            totalCostoSS -= costoMensual
            costoTotal -= costoMensual
        }
        $txtCostSS.value = totalCostoSS
        $txtCostoTotal.value = costoTotal
    })
}
async function init() {
    await cargarSelect()
    Presupuesto.validacionDatosPersonales()
    Presupuesto.validarCamposOEnvio()
    Presupuesto.validarCamposPresupuesto()
    Presupuesto.validarSelectDescuentos()
}
init()
//#endregion
//#region envio de formulario
const $lblPermisoEnvio = Presupuesto.crearLabel({
    htmlFor: "permiso",
    className: "presupeuestos-lbl-chkenvio"
}, "¿Autoriza el tratamiento de información?" )
const $chkPermisoEnvio = Presupuesto.crearInput({
    id: "permiso",
    name: "permiso",
    type: "checkbox",
    required: true
})
const $contBotones = Presupuesto.crearDiv({
    className: "presupuesto-cont-btn"
})
const $btnEnviar = Presupuesto.crearInput({
    type: "submit",
    value: "Enviar",
    className: "presupuesto-btn"
})
const $btnReset = Presupuesto.crearInput({
    type: "reset",
    value: "Borrar",
    className: "presupuesto-btn"
})
$lblPermisoEnvio.appendChild($chkPermisoEnvio)
$contBotones.append($btnEnviar, $btnReset)
$fsEnvio.append($lblPermisoEnvio, $contBotones)
//#endregion
//#region envio formulario

$formulario.addEventListener('submit', async (e) => {
    e.preventDefault()
    const servicios = await Presupuesto.obtenerServicios()
    const descuentos = await Presupuesto.obtenerDescuentos()
    const data = Presupuesto.ValidarForm()
    if (data.ok) {
        const nuevoPresupuesto = new DatosPresupuesto(
            data.nombre, 
            data.apellido, 
            data.telefono,
            data.email,
            data.servicio,
            data.subservicios,
            data.descuento
        )
        nuevoPresupuesto.precioServicio(servicios)
        nuevoPresupuesto.precioSubServicios(servicios)
        nuevoPresupuesto.decuentoAplicado(descuentos)
        nuevoPresupuesto.calcularPresupuesto()
        //modal
        Presupuesto.cargarModal(nuevoPresupuesto.nombre)
    } 
    
    
})
//#endregion