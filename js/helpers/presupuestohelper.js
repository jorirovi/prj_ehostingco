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
}