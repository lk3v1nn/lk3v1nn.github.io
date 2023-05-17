function quitarRecursividad(){
    const text = document.getElementById('text');
    let gramatica = text.innerHTML; // Datos del documento (Las gramaticas del .text)

    gramatica = remplazarCaracteres(gramatica);

    separarGramatica(gramatica);

}

function remplazarCaracteres(cadena){
    cadena = cadena.replaceAll(/(')/g,'');
    cadena = cadena.replaceAll('<br>','');
    cadena = cadena.replace(/( )/g, '');
    return cadena;
}

function separarGramatica(gramaticas){

    let gramaticaIndividual = gramaticas.split('\n') //SEPARA LAS GRATICAS
    for (let obj of gramaticaIndividual){
        let variableProduccion = obj.split('='); //SEPARA LA VARIABLE Y LA PRODUCCION
        insertaEnDOM('H3', variableProduccion[0], 'gramaticaSinRecursividadIzquierda');

        let producciones = variableProduccion[1].split('|');//SEPARA LAS PRODUCCIONES
        for(let obj2 of producciones){
            insertaEnDOM('H5', obj2, 'gramaticaSinRecursividadIzquierda');
            //AQUI DEBO SEPARAR LOS CARACTERES DE LAS PRODUCCIONES
        }
    }

}

function insertaEnDOM(etiqueta, datos, idEtiqueta){
    let objeto = document.createElement(etiqueta); //CREA EL OBJETO
    objeto.innerHTML = datos; //INSERTA LOS DATOS AL OBJETO

    let areaDelDOM = document.getElementById(idEtiqueta); //DONDE SE INSERTARA LA ETIQUETA
    areaDelDOM.appendChild(objeto); //INSERTA EL OBJETO
}