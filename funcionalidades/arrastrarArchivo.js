const todo = document.querySelector('html');
todo.addEventListener('drop', (e) =>{
    e.preventDefault();
});


const areaParaArrastrar = document.querySelector('.areaParaArrastrar');
const TextP = areaParaArrastrar.querySelector('h3');
const input = areaParaArrastrar.querySelector('input');
// const button = areaParaArrastrar.querySelector("button");

// button.addEventListener("click", () => {
//     input.click();
// });

//Evento que se activa cuando arrastre afuera de areaParaArrastrarraArrastrar
areaParaArrastrar.addEventListener('dragleave', (e)=>{
    e.preventDefault();
    areaParaArrastrar.classList.remove('activo');
    // TextP.innerHTML = 'Arrastra aqui';
});
//Evento que se activa cuando arrastre adentro de areaParaArrastrar
areaParaArrastrar.addEventListener('dragover', (e)=>{
    e.preventDefault();
    areaParaArrastrar.classList.add('activo');
    TextP.innerHTML = 'Suelta para carga el archivo';
});

//Evento QUE se activa cunado suelto un elemento dentro de areaParaArrastrar
areaParaArrastrar.addEventListener('drop', (e) =>{
    e.preventDefault();
    input.files = e.dataTransfer.files;
    areaParaArrastrar.classList.add('activo');
    //TextP.innerHTML = 'Archivo cargado';
    leertxt();
    // Muestra el boton oculto de Procesar
    const boton = document.getElementById('procesar');
    // boton.removeAttribute('hidden');

    //FUNCIONES QUE EJECUTARA
    eliminarDelDOM('#tablasXIzquierda', '#gramaticaSinRecursividadIzquierda'); //LIMPIA EL DOM
    setTimeout(function() {
        MostrarSecciones();
        animEntrada();
        V_T();
        V_P();
        quitarRecursividad();
      }, 200);
    
    setTimeout(insertarTablasRIzq, 200);
    // setTimeout(funcionPrimeraXd2, 200);
    funcionPrimeraXd2();
});




