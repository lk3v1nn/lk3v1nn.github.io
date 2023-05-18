let beta;
let alfa;
let varPrima;

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
    //SEPARA LAS GRATICAS
    let gramaticaIndividual = gramaticas.split('\n') 
    for (let objGramaticaIndividual of gramaticaIndividual){
        //SEPARA LA VARIABLE Y LA PRODUCCION
        let variableProduccion = objGramaticaIndividual.split('='); 
        //SEPARA LAS PRODUCCIONES
        let producciones = variableProduccion[1].split('|');

        //IMPRIME VARIBLE Y VALIDADOR
        insertaEnDOM('h4','G: '+validarGramaticaRecursiva(variableProduccion[0],producciones), 'gramaticaSinRecursividadIzquierda');
        insertaEnDOM('H1', variableProduccion[0], 'gramaticaSinRecursividadIzquierda');

        for(let objProducciones of producciones){
            insertaEnDOM('H3', objProducciones, 'gramaticaSinRecursividadIzquierda');
            //SEPARA CARACTERES DE LAS PRODUCCION
            insertaEnDOM('h6','P: '+validaProduccionRecursiva(variableProduccion[0],objProducciones ),'gramaticaSinRecursividadIzquierda');
        }
        
    }

}

function insertaEnDOM(etiqueta, datos, idEtiqueta){
    let objeto = document.createElement(etiqueta); //CREA EL OBJETO
    objeto.innerHTML = datos; //INSERTA LOS DATOS AL OBJETO

    let areaDelDOM = document.getElementById(idEtiqueta); //DONDE SE INSERTARA LA ETIQUETA
    areaDelDOM.appendChild(objeto); //INSERTA EL OBJETO
}

function validarGramaticaRecursiva(variable, producciones){

    //LIMPIA LAS VARIABLES GLOBALES PARA USAR SIGUIENTE PRODUCCION
    beta = null;
    alfa = null;
    varPrima = null;

    for(let objProducciones of producciones){ //RECORRE TODAS LAS PRODUCCIONES
    let produccionesSeparadas = objProducciones.split(''); //SEPARA LOS CARACTERES DE LAS PRODUCCIONES
        if(variable == produccionesSeparadas[0]){

            return true;
            break;
        }else{
            return false;
        }
    }
}

function validaProduccionRecursiva(variable, producciones){
        let produccion = producciones.split('');
        varPrima = variable + '`';
        if(variable == produccion[0]){
            return true;
        }else{
            beta = producciones;
            return false;
        }
}