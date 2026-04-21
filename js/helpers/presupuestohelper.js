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

        if (slcServicio.value === "") {
            contSelect.classList.add('error')
        }

        slcServicio.addEventListener('change', (e) => {
            if(e.target.value === "") {
                contSelect.classList.add('error')
            } else {
                contSelect.classList.remove('error')
            }
        })
    }

    //Metodo para validar si el check de los subservicio tiene al menos unos seleccionado
    static validarChkSS() {
        const contChkSS = document.querySelector('.presupuesto-contenedor-subserv')
        const seleccionado = contChkSS.querySelector('input[type="checkbox"]:checked')
        if (seleccionado) {
            contChkSS.classList.remove('error')
        } else {
            contChkSS.classList.add('error')
        }

        contChkSS.addEventListener('change', (e) => {
            if (e.target.type !== "checkbox") return
            if (e.target.checked) {
                contChkSS.classList.remove('error')
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
}