//funcion para crear select
export function crearSelect(atributos, opciones) {
    const select = document.createElement('select')
    Object.entries(atributos).forEach((key, value) => {
        select[key] = value
    })

    const opcionInicial = document.createElement('option')
    opcionInicial.value = ""
    opcionInicial.text = "Seleccione un Servicio"
    opcionInicial.disabled = false
    opcionInicial.selected = true
    select.appendChild(opcionInicial)

    opciones.forEach(opcion => {
        const option = document.createElement("option")
        option.value = opcion.value
        option.textContent = opcion.texto
        select.appendChild(option)
    })

    return select
}

//funcion para cargar Servicios
export async function obtnerServicios() {
    const url = '../../data/servicios.json'
    try {
        const response = await fetch(url)
        const data = await response.json()
        if (!response.ok) {
            throw new Error("No se pudieron optener los servicios")  
        }
        return data
    } catch (err) {
        alert(err)
        console.error(err)
    }
}