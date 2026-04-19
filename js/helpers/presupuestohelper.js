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
        opcionInicial.disabled = true
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

    static validarCamposObligatorios() {
        const inputsP = document.querySelectorAll('.frm-presupuesto [required]')
        const inputsE = document.querySelectorAll('.frm-envio [required]')

        console.log(inputsP.length)
        inputsP.forEach((input) => {
            let $span = document.getElementById(`error-${input.name}`)
            if (!$span) {
                const $span = document.createElement('span')
                $span.id = `error-${input.name}`
                $span.classList.add("presupuesto-dp-error", "presupuesto-dp-error-ocultar")
                input.insertAdjacentElement('afterend', $span)
            }
        })
        inputsE.forEach((input) => {
            let $span = document.getElementById(`error-${input.name}`)
            if (!$span) {
                const $span = document.createElement('span')
                $span.id = `error-${input.name}`
                $span.classList.add("presupuesto-dp-error", "presupuesto-dp-error-ocultar")
                input.insertAdjacentElement('afterend', $span)
            }
        })

        inputsP.forEach((input) => {

            this.validarCampo(input)
        })

        inputsE.forEach((input) => {
            input.addEventListener("change", (e) => {
                const $span = document.getElementById(`error-${input.name}`)
                if (!e.target.checked) {   
                    $span.textContent = 'campo obligatorio'
                    $span.classList.remove("presupuesto-dp-error-ocultar")
                } else {
                    $span.textContent = ""
                    $span.classList.add("presupuesto-dp-error-ocultar")
                }
            })
            
        })
        
    }
}