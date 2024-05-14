const divResultado = document.querySelector("#resultado")


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
    cantidad -= ((diferencia * 3) / 100) * cantidad

    if(this.tipo == 'basico'){
        cantidad *= 1.30
    }else{
        cantidad *= 1.50
    }

    return cantidad
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

//Mostrar notificacion
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
    },1000)
    const formulario = document.querySelector("#cotizar-seguro")
    formulario.insertBefore(div,document.querySelector("#resultado"))
}


UI.prototype.mostrarResultado = (seguro, total)=>{

    const {marca, year, tipo} = seguro

    switch(marca){
        case '1':
            textoMarca = 'Americano'
            break
        case '2':
            textoMarca = 'Asiatico'
            break
        
        case '3':
            textoMarca = 'Europeo'
            break
        default:
            break;
    }
    const div = document.createElement("div")
    div.classList.add("mt-10")

    div.innerHTML= `
        <p class="header">Tu resumen</p>
        <p>Marca: ${textoMarca}</p>
        <p>Año: ${year}</p>
        <p>Tipo: ${tipo}</p>
        <p class="font-bold">Total: ${total}</p>
    `

    const spinner = document.querySelector("#cargando")
    spinner.style.display = "block"

    setTimeout(()=>{
        spinner.style.display = "none"  //oculta el spinner
        divResultado.appendChild(div)   //Muestra el resultado de la cotizacion
    }, 1000)
}


const ui = new UI()

//Llenar select de años al cargar el documento
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
    limpiarHtml()
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
    const total = seguro.cotizarSeguro()

    ui.mostrarResultado(seguro, total)
}


function limpiarHtml(){
    while(divResultado.firstChild){     //Comienza un bucle while que se ejecutará mientras divResultado tenga al menos un elemento 
        divResultado.removeChild(divResultado.firstChild) 
    }                                                      
}