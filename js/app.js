//CONSTRUCTORES 
function Seguro(marca, year, tipo){
    this.marca = marca,
    this.year = year,
    this.tipo = tipo
}

function UI(){

}


//Realizar la cotizacion con los datos del objeto 
Seguro.prototype.cotizarSeguro = function(){
    console.log(this.marca)

    let cantidad
    const base = 2000

    switch(this.marca){
        case '1':
            cantidad = base * 1.15
            break
        case '2':
            cantidad = base * 1.05
            break 
        case '3':
            cantidad = base * 1.35
            break 
        default:
            break
    }

    /* Por cada año de diferencia se resta 3% al precio */
    let diferencia = new Date().getFullYear() - this.year
    console.log(diferencia)
    cantidad -= ((diferencia * 3) / 100) * cantidad

    if(this.tipo == 'basico'){
        cantidad *= 1.30
    }else{
        cantidad *= 1.50
    }

    console.log(cantidad)
}

//Llenar select de años
UI.prototype.llenarOpciones = ()=>{
    const max = new Date().getFullYear()
    const min = max-20

    const selectYear = document.querySelector("#year")
    for(let i = max; i >= min; i--){
        let option = document.createElement("option")
        option.value = i 
        option.textContent = i
        selectYear.appendChild(option)

    }
}

UI.prototype.mostrarMensaje = (tipo, mensaje) => {
    const div = document.createElement("div")
    if(tipo == 'error'){
        div.classList.add("error")
    }else{
        div.classList.add("correcto")
    }

    div.classList.add("mensaje","mt-10")
    div.textContent = mensaje

    setTimeout(()=>{
        div.remove()
    },3000)
    const formulario = document.querySelector("#cotizar-seguro")
    formulario.insertBefore(div,document.querySelector("#resultado"))
}



const ui = new UI()
console.log(ui)

document.addEventListener("DOMContentLoaded", ()=>{
    ui.llenarOpciones()
})

eventListeners()

function eventListeners(){
    const formulario = document.querySelector("#cotizar-seguro")
    formulario.addEventListener("submit", cotizarSeguro)
}

//Validar formulario
function cotizarSeguro(e){
    e.preventDefault()
    marca = document.querySelector("#marca").value
    anio = document.querySelector("#year").value
    tipo = document.querySelector('input[name="tipo"]:checked').value

    if(!marca || !anio || !tipo){
        ui.mostrarMensaje('error','Llene todos los campos')
        return
    }
    ui.mostrarMensaje('exito','Cotizando')

    const seguro = new Seguro(marca, anio, tipo)
    seguro.cotizarSeguro()
}