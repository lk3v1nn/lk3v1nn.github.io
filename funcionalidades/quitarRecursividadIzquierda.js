let beta;
let alfa;
let varPrima;
let variable;
let gramaticaRecursiva;
let varSinRecursividad;

function quitarRecursividad(){
    const text = document.getElementById('text');
    let gramatica = text.innerHTML; // Datos del documento (Las gramaticas del .text)
    
    gramatica = quitarCatecteres(gramatica);    
    let gramaticaFormateada = modificarFormatoText(gramatica);
    gramaticaFormateada = quitarCatecteres(gramaticaFormateada);  
    // insertaEnDOM('h4',gramaticaFormateada,'gramaticaSinRecursividadIzquierda');
    separarGramatica(gramaticaFormateada);
    
}

function quitarCatecteres(cadena){
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

        validarGramaticaRecursiva(variable,producciones); //valida si la gramatica es recursiva

        for(let objProducciones of producciones){
            validaProduccionRecursiva(variable,objProducciones ); //valida si la produccion es recursiva
        }
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


function modificarFormatoText(gramaticas){

    let textFormateado = Array();
    let variables = Array();
    let gramaticaIndividual = gramaticas.split('\n'); //separa gramaticas
    //RECORRE TODAS LAS GRAMATICAS
    for(let objGramaticaIndividual of gramaticaIndividual){
        //SEPARA VARIABLE DE PRODUCCION
        let variable_Produccion =objGramaticaIndividual.split('='); 
        variables.push(variable_Produccion[0]); //VA GUARDANDO LAS VARIABLES
    }

    let VarSD = EliminarDuplicados(variables); //ELIMINA VARIABLES DUPLICADOS

    // insertaEnDOM('h3',VarSD,'gramaticaSinRecursividadIzquierda');
    let i = 0;
    for(let objVar of VarSD){ //RECORRE LAS VARIBLES SIN DUPLICADOS
        textFormateado[i] = objVar + ' = ';
        for(let objGramaticaIndividual of gramaticaIndividual){
            let variable_Produccion =objGramaticaIndividual.split('='); //SEPARA VARIABLE DE PRODUCCION
            if(objVar==variable_Produccion[0]){
                textFormateado[i] += variable_Produccion[1] + '|' ;
            }
        }
        textFormateado[i] = textFormateado[i].slice(0,-1);
        i++;
    }
    let textFormateadoPlus = '';
    for(let objTxtFormat of textFormateado){
        textFormateadoPlus += objTxtFormat + '\n';
    }
    return textFormateadoPlus;
}

function EliminarDuplicados(datos){
    const sinDuplicados = new Set(datos);
    let resultado = [...sinDuplicados];
    return resultado;
}