//Clase Statica almacenar las funciones que utilizaremos en la vista presupuesto
export class Presupuesto {
    //Metodo para obtener los datos del json de Servicios
    static async obtenerServicios() {
        const url = '../../data/servicios.json'
        try {
            const response = await fetch(url)
            const data = await response.json()
            if (!response.ok) {
                throw new Error("No se pudieron obtener los servicios")  
            }
            return data
        } catch (err) {
            alert(err)
            console.error(err)
        }
    }

    //Metodo para obtener los datos del Json de plazos para descuentos
    static async obtenerDescuentos() {
        const url = '../../data/plazos.json'
        try {
            const response = await fetch(url)
            const data = await response.json()
            if (!response.ok) {
                throw new Error("No se pudieron obtner los descuentos")
            }
            return data
        } catch (err) {
            alert (err)
            console.error(err)
        }
    }

    //Metodos de creacion de Select - Options y inputs[type=checkbox] para uso en el formulario
    //Metodo para crear el Select
    static crearSelect(atributos, opciones) {
        const select = document.createElement('select')
        Object.entries(atributos).forEach(([key, value]) => {
            select[key] = value
        })

        const opcionInicial = document.createElement('option')
        opcionInicial.value = ""
        opcionInicial.textContent = "Seleccione una opcion"
        //opcionInicial.disabled = true
        opcionInicial.selected = true
        select.appendChild(opcionInicial)

        opciones.forEach(opcion => {
            const option = document.createElement("option")
            option.value = opcion.value
            option.textContent = opcion.texto
            option.dataset.cost = opcion.costo
            select.appendChild(option)
        })

        return select
    }

    //Metodo para crear Inputs
    static crearInput(atributos) {
        const input = document.createElement('input')
        Object.entries(atributos).forEach(([key, value]) => {
            input[key] = value
        })
        return input
    }

    //Metodo para crear labels
    static crearLabel(atributos, texto) {
        const label = document.createElement('label')
        Object.entries(atributos).forEach(([key, value]) => {
            label[key] = value
        })
        label.textContent = texto
        return label
    }

    //Metodo para crear div
    static crearDiv(atributos) {
        const div = document.createElement('div')
        Object.entries(atributos).forEach(([key,value]) => {
            div[key] = value
        })
        return div
    }

    //Metodo para crear p
    static crearParrafo(atributos, texto) {
        const p = document.createElement('p')
        Object.entries(atributos).forEach(([key, value]) => {
            p[key] = value
        })
        p.textContent = texto
        return p
    }
    //metodo para crear span
    static crearSpan(atributos) {
        const span = document.createElement('span')
        Object.entries(atributos).forEach(([key, value]) => {
            span[key] = value
        })
        return span
    }

    //Validaciones
    //Metodo para validar los datos personales
    static validacionDatosPersonales() {
        const fsDatosPersonales = document.querySelector('.frm-datos')
        const inputsDP = document.querySelectorAll('.frm-datos [required]')
        
        inputsDP.forEach((input) => {
            let $span = document.getElementById(`error-${input.name}`)
            if (!$span) {
                const $span = document.createElement('span')
                $span.id = `error-${input.name}`
                $span.classList.add("presupuesto-dp-error", "presupuesto-dp-error-ocultar")
                input.insertAdjacentElement('afterend', $span)
            }
        })
        
        inputsDP.forEach((input) => {
            this.validarCampo(input)
            input.addEventListener("input", (e) => {
                this.validarCampo(input)
            })
            input.addEventListener("blur", (e) => {
                this.validarCampo(input)
            })
        })
    }
    //metodo donde se valida campos vacios o que no cumplan con el pattern
    static validarCampo(input) {
        const $span = document.getElementById(`error-${input.name}`);
        if (input.validity.valueMissing) {
            $span.textContent = "Este campo es obligatorio"
            $span.classList.remove("presupuesto-dp-error-ocultar")
        } else if (input.validity.patternMismatch) {
            $span.textContent = input.title
            $span.classList.remove("presupuesto-dp-error-ocultar")
        } else {
            $span.textContent = ""
            $span.classList.add("presupuesto-dp-error-ocultar")
        }
    }

    //Metodo para validar los campos fildset de presupuesto
    static validarCamposPresupuesto() {
        const slcServicio = document.getElementById('servicio')
        const contSelect = document.querySelector('.presupuesto-contenedor-Servicios')
        const contChkSS = document.querySelector('.presupuesto-contenedor-subserv')

        if (slcServicio.value === "") {
            contSelect.classList.add('error')
        }

        slcServicio.addEventListener('change', (e) => {
            this.validarSelectDescuentos()
            if(e.target.value === "") {
                contSelect.classList.add('error')
                contChkSS.classList.remove('error')
            } else {
                contSelect.classList.remove('error')
            }
        })
    }

    //Metodo para validar si el check de los subservicio tiene al menos unos seleccionado
    static validarChkSS() {
        const contChkSS = document.querySelector('.presupuesto-contenedor-subserv')
        const seleccionado = contChkSS.querySelector('input[type="checkbox"]:checked')
        const slcDescuentos = document.getElementById('plazo')
        if (seleccionado) {
            contChkSS.classList.remove('error')
        } else {
            contChkSS.classList.add('error')
        }

        contChkSS.addEventListener('change', (e) => {
            if (e.target.type !== "checkbox") return
            if (e.target.checked) {
                contChkSS.classList.remove('error')
                this.validarSelectDescuentos()
            } else {
                contChkSS.classList.add('error')
            }
        })
        
    }

    //Metodo para validar si el check de envio esta activo
    static validarCamposOEnvio() {
        const chkEnvio = document.getElementById('permiso')
        const contChkEnvio = document.querySelector('.presupeuestos-lbl-chkenvio')

        if (!chkEnvio.checked) {
            contChkEnvio.classList.add('error')
        }

        chkEnvio.addEventListener("change", (e) => {
            if(!e.target.checked) {
                contChkEnvio.classList.add('error')
            } else {
                contChkEnvio.classList.remove('error')
            }
        })
    }

    //metodo para validar el select de descuentos
    static validarSelectDescuentos() {
        const slcDescuentos = document.getElementById('plazo')
        const contSlcDes = document.querySelector('.presupuesto-cont-plazos')

        if (slcDescuentos.disabled) {
            contSlcDes.classList.remove('error')
            return
        } else if (slcDescuentos.value === "") {
            contSlcDes.classList.add('error')
        } else {
            contSlcDes.classList.remove('error')
        }

        slcDescuentos.addEventListener('change', (e) => {
            if (e.target.value === "") {
                contSlcDes.classList.add('error')
            } else {
                contSlcDes.classList.remove('error')
            }
        })
    }

    //metodo para validar campos
    static ValidarForm() {
        const txtNombre = document.getElementById('nombre').value
        const txtApellido = document.getElementById('apellido').value
        const txtTel = document.getElementById('tel').value
        const txtEmail = document.getElementById('email').value
        const slcServicio = document.getElementById('servicio').value
        const chkSubServicios = document.querySelectorAll('[name="subservicios"]:checked')
        const slcdescuentos = document.getElementById('plazo').value
        const chkenvio = document.getElementById("permiso")
        let hayError = false;
        let mensaje = [];
        //Expresiones Regulares
        const regNombre   = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/;
        const regApellido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        const regTelefono = /^[6789]\d{8}$/;
        const regEmail    = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let arraySS = []
        chkSubServicios.forEach(item => {
            arraySS.push(...item.value)
        })
       
        if (!regNombre.test(txtNombre) || txtNombre === '') {
            mensaje.push('Nombre no Valido')
            hayError = true
        }
        if (!regApellido.test(txtApellido) || txtApellido === '') {
            mensaje.push('Apellido no valido')
            hayError = true
        }
        if (!regTelefono.test(txtTel) || txtTel === '') {
            mensaje.push('N de Telefono no valido')
            hayError = true
        }
        if (!regEmail.test(txtEmail) || txtEmail === '') {
            mensaje.push('Email no valido')
            hayError = true
        }
        if (slcServicio === "") {
            mensaje.push('debe seleccionar al menos un servicio')
            hayError = true
        }
        if (arraySS.length === 0) {
            mensaje.push('debe seleccionar al menos un sub-servicio')
            hayError = true
        }
        if (slcdescuentos === "") {
            mensaje.push('debe seleccionar un porcentaje de descuento')
            hayError = true
        }
        if (!chkenvio.checked) {
            mensaje.push('debe Autorizar el tratamiento de información')
            hayError = true
        }
        if (hayError) {
            this.cargarModalError(mensaje)
            const datos = {
                ok: false
            }
            return datos
        }
        const datos = {
            ok: true,
            nombre: txtNombre,
            apellido: txtApellido,
            telefono: txtTel,
            email: txtEmail,
            servicio: slcServicio,
            subservicios: arraySS,
            descuento: slcdescuentos
        }
        return datos
    }

    //Metodo para cargar el modal con error
    static cargarModalError(mensajes){
        const $modal = document.getElementById('modal')
        const $contModal = this.crearDiv({id: "contModal", className: "modal-content"})
        const $divH = this.crearDiv({className: "modal-header"})
        const $divB = this.crearDiv({className: "modal-body"})
        const $cerrar = this.crearSpan({id: 'closeModal', className: "close"})
        const $titulo = this.crearParrafo({className: 'Titulo-Modal'}, 'Validaciones del Formulario')
        $cerrar.innerHTML = "&times;"
        const $lista = document.createElement('ul')
        $lista.classList.add('modal-lista')
        mensajes.map(mensaje => {
            const $li = document.createElement('li')
            $li.textContent = mensaje
            $lista.appendChild($li)
        })
        $divH.append($titulo, $cerrar)
        $divB.append($lista)
        $contModal.append($divH, $divB)
        $modal.appendChild($contModal)
        $modal.classList.remove('ocultar')
        $modal.classList.add('modal')
        $cerrar.addEventListener('click', () => {
            $modal.classList.add('ocultar')
            $modal.classList.remove('modal')
            $modal.innerHTML = ''
        })
    }

    //metodo para cargar el modal con el resultado dek formulario OK
    static cargarModal(nombre) {
        const $modal = document.getElementById('modal')
        const $contModal = this.crearDiv({id: "contModal", className: "modal-content"})
        const $divH = this.crearDiv({className: "modal-header"})
        const $divB = this.crearDiv({className: "modal-body"})
        const $cerrar = this.crearSpan({id: 'closeModal', className: "close"})
        const $titulo = this.crearParrafo({className: 'Titulo-Modal'}, 'Formulario Correcto')
        $cerrar.innerHTML = "&times;"
        const mensaje = `En ¡Hora Buena! ${nombre} tu solicitud a sido enviada y nuestro equipo de comercial se pondra en contacto con usted`
        const $parrafo = this.crearParrafo({className: 'modal-parafo-envio'}, mensaje)
        $divH.append($titulo, $cerrar)
        $divB.append($parrafo)
        $contModal.append($divH, $divB)
        $modal.appendChild($contModal)
        $modal.classList.remove('ocultar')
        $modal.classList.add('modal')
        $cerrar.addEventListener('click', () => {
            $modal.classList.add('ocultar')
            $modal.classList.remove('modal')
            window.location.href = './galeria.html'
        })
    }
}
export class DatosPresupuesto {
    constructor (nombre, apellido, telefono, correo, servicio, subservicios, descuento) {
        this.nombre = nombre
        this.apellido = apellido
        this.telefono = telefono
        this.correo = correo
        this.servicio = servicio
        this.subservicios = subservicios
        this.descuento = descuento

        this.costoServicio = 0
        this.totalSS = 0
        this.PorcentajeDescuento = 0
        this.totalPresupuesto = 0
        this.nomServ = ""
        this.subserviciosNom = []
    }

    //Metodos
    precioServicio(dataServicio) {
        const valor = dataServicio.servicios.find(item => item.id === Number(this.servicio))
        this.costoServicio = Number(valor.preciomes)
        this.nomServ = valor.nombre
    }

    precioSubServicios(dataServicio) {
        const subSer = dataServicio.planes_adicionales.find(item => item.idservicio === Number(this.servicio))
        let acum = 0
        this.subservicios.forEach(ss => {
            const itemSS = subSer.items.find(idSS => idSS.id === Number(ss))
            acum += itemSS.costM
            this.subserviciosNom.push(itemSS.nombre)
        })
        this.totalSS = acum
    }
    decuentoAplicado(plazos){
        const valor = plazos.descuentos.find(item => item.id === Number(this.descuento))
        this.PorcentajeDescuento = valor.descuento
    }
    calcularPresupuesto() {
        const valor_1 = this.costoServicio + this.totalSS
        this.totalPresupuesto = (valor_1) - (valor_1 * this.PorcentajeDescuento) 
    }
}