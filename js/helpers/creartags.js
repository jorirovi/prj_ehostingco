// clase para crear los Tags requeridos en las paginas Web
export class CreadorTagsHTML {
    static crarDiv(atributos) {
        const div = document.createElement('div')
        Object.entries(atributos).forEach(([key, value]) => {
            div[key] = value
        })

        return div
    }

    static crearH3(atributos, texto) {
        const h3 = document.createElement('h3')
        Object.entries(atributos).forEach(([key, value]) => {
            h3[key] = value
        })

        h3.textContent = texto

        return h3
    }

    static crearSpan(atributos, texto) {
        const span = document.createElement('span')
        Object.entries(atributos).forEach(([key, value]) => {
            span[key] = value
        })

        span.textContent = texto

        return span
    }

    static crearP(atributos, texto) {
        const p = document.createElement('p')
        Object.entries(atributos).forEach(([key, value]) => {
            p[key] = value
        })

        p.textContent = texto

        return p
    }
}

