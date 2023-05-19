let beta;
let alfa;
let varPrima;
let variable;
let gramaticaRecursiva;
let varSinRecursividad;

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
    for (let objGramaticaIndividual of gramaticaIndividual){ //recorre toda las gramaticas
        
        //SEPARA LA VARIABLE Y LA PRODUCCION
        let variableProduccion = objGramaticaIndividual.split('='); 
        variable = variableProduccion[0];
        //SEPARA LAS PRODUCCIONES
        let producciones = variableProduccion[1].split('|');
        //IMPRIME VARIBLE Y VALIDADOR
        // insertaEnDOM('h2','G: '+    validarGramaticaRecursiva(variableProduccion[0],producciones), 'gramaticaSinRecursividadIzquierda');
        // insertaEnDOM('H1', variableProduccion[0], 'gramaticaSinRecursividadIzquierda');

        validarGramaticaRecursiva(variable,producciones);
        for(let objProducciones of producciones){
            // insertaEnDOM('H3', objProducciones, 'gramaticaSinRecursividadIzquierda');
            //SEPARA CARACTERES DE LAS PRODUCCION
            // insertaEnDOM('h4','P: '+validaProduccionRecursiva(variableProduccion[0],objProducciones ),'gramaticaSinRecursividadIzquierda');
            
            validaProduccionRecursiva(variable,objProducciones );
        }
        // insertaEnDOM('H3', 'Prim '+varPrima, 'gramaticaSinRecursividadIzquierda');
        // // alfa.push('E'); 
        // insertaEnDOM('H3', 'alfa '+ alfa, 'gramaticaSinRecursividadIzquierda');
        // insertaEnDOM('H3', 'beta '+beta, 'gramaticaSinRecursividadIzquierda');
        // insertaEnDOM('H2', imprimeGramaticaFinal(variable,beta,alfa,varPrima), 'gramaticaSinRecursividadIzquierda');
        imprimeGramaticaFinal(variable,beta,alfa,varPrima, gramaticaRecursiva, varSinRecursividad);
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
    beta = '';
    varPrima = '';
    alfa='';
    gramaticaRecursiva = false;

    for(let objProducciones of producciones){ //RECORRE TODAS LAS PRODUCCIONES
    let produccionesSeparadas = objProducciones.split(''); //SEPARA LOS CARACTERES DE LAS PRODUCCIONES
        if(variable == produccionesSeparadas[0]){ //VALIDA SI ES RECURSIVA
            varPrima = variable + '`'; //CREA LA VARIABLE PRIMA
            gramaticaRecursiva = true;
            return '';
            break;
        }else{
            let formatProducciones ='';
            for(let iterProducciones of producciones){
                if(formatProducciones!=''){
                    formatProducciones += ' | ';
                }
                formatProducciones += iterProducciones;
            }
            varSinRecursividad = formatProducciones;
        }
    }
    
}

function validaProduccionRecursiva(variable, producciones){
        let produccion = Array();
        produccion = producciones.split('');//SEPARA POR CARACTERES LA PRODUCCION
        
        //VALIDA SI LA PRODUCCION ES RECURSIVA
        if(variable == produccion[0]){

            if(alfa != ''){
                alfa+= ' | ' ; //AGREGAR EL SEPARADOR DE CADA PRODUCCION
            }
            //RECORRE LOS CARACTERES DE LA PRODUCCION PARA GUARDARLOS EN UN ARRAY
            for(let i=1; i < produccion.length; i++){
                alfa += produccion[i] + ' ';
            }
        }else{
            beta = producciones; //GUARDA LA PRODUCCION NO RECURSIVA
        }
}

function imprimeGramaticaFinal(variable,beta, alfa, varPrima, gramaticaRecursiva, varSinRecursividad){
    
    if (gramaticaRecursiva==true){
        let gramatica1 = variable + ' = ' + beta + varPrima;
        

        let alfaSepardo = alfa.split('|');
        let alfaFormateado='';
        for(let objalfa of alfaSepardo){
            alfaFormateado += objalfa + varPrima + ' | ';
        }

        let gramatica2 = varPrima + ' = ' + alfaFormateado + ' E';


        insertaEnDOM('h2', gramatica1 + '<br>' + gramatica2, 'gramaticaSinRecursividadIzquierda');
    }else{
        let gramatica3 = variable + ' = ' + varSinRecursividad;
        insertaEnDOM('h2', gramatica3, 'gramaticaSinRecursividadIzquierda');
    }
}

function eliminarDelDOM(etiquetaVaciar){
    let etiqueta = document.getElementById(etiquetaVaciar);
    etiqueta.innerHTML='';
}