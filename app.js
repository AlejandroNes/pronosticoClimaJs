/********************
PRONOSTICO DEL TIEMPO
********************/
//variables
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');
const res = document.querySelector('#alerta');
const sms = document.querySelector('#sms');


//eventos
(function(){
document.addEventListener( 'submit', validarFormulario )
})()


//funciones
function validarFormulario(e){
    e.preventDefault();
    //validar los inputs
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;
    
    validar(ciudad, pais);
}

//funcion validar
function validar(ciudad, pais){
    if( ciudad.length < 2 || pais.length < 1 ){
        alerta('complete los campos')
        return
    }
    consultarAPI(ciudad, pais)
}
//creando alerta 
function alerta(mensaje){
    const alert = document.querySelector('.alert')
    if(!alert){
        const alerta = document.createElement('div')
        alerta.classList.add('alert','alert-danger', 'text-center', 'd-inline-block');
        alerta.innerHTML = /*html*/`
            <strong> Error!..</strong>
            <p>${mensaje}</p>
        `
        res.appendChild(alerta)
        setTimeout( ()=> {
            alerta.remove()
        },2000 )
    }

}
//consultando API
 async function consultarAPI (ciudad, pais){
    const apiId = '0a6cfdcb959d26181876532afb131f2b';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiId}`
    try {
       const resp = await fetch(url);
       const data = await resp.json();
       mostrarHTML(data)
    } catch (error) {
        alerta('Ciudad no encontrada')
        mostrarsms('Ciudad no encontrada')
    }
    
}

//funcion mostrar en HTML
function mostrarHTML(data){
    limpiar();
    //desestructuracion
    const { name, main: { temp, temp_max, temp_min } } = data
    let centigrados_temp = parseFloat(temp - 273.15).toFixed(1)
    let centigrados_temp_max = parseFloat(temp_max - 273.15).toFixed(1)
    let centigrados_temp_min = parseFloat(temp_min - 273.15).toFixed(1)
    
    const res = document.createElement('div')
    res.innerHTML = `
        <h1 class="text-center text-info">Clima en ${name}</h1>
        <h2 class="text-center text-white my-1"> C°${centigrados_temp} actual</h2>
        <h5 class="text-center text-white font-weight-light my-1"> C°${centigrados_temp_max} max</h5>
        <h5 class="text-center text-white font-weight-light my-1"> C°${centigrados_temp_min} min</h5>
    `
    resultado.appendChild(res)
}

//limpinado html
function limpiar(){
    while( resultado.firstChild ){
        resultado.removeChild(resultado.firstChild)
    }
}

function mostrarsms(mensaje){
    const alert = document.createElement('div')
    alert.innerHTML = `
    <h4 class="text-center text-danger font-weight-light">${mensaje}</h4>
    `
    resultado.appendChild(alert);
}