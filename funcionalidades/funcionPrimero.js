let variablesGlob = [];

function funcionPrimero(){
  let etiqueta = document.querySelector('#gramaticaFuncionPrimero');
  etiqueta.innerHTML='';

  let gramatica = creaObjgramatica();
  
  insertaEnDOM('h3','Funcion Primero','gramaticaFuncionPrimero');
  console.log(variablesGlob);
  
  for ( let objvariables of variablesGlob){
    const simboloInicial = objvariables;
    const primeraFuncion = calcularPrimera(gramatica, simboloInicial);
    let GramaticaFnSiguiente = `P(${simboloInicial}) → { ${primeraFuncion} }`;
    console.log(GramaticaFnSiguiente);
    
    insertaEnDOM('h2', GramaticaFnSiguiente, 'gramaticaFuncionPrimero');
  }
}

function creaObjgramatica(){
  variablesGlob = [];
  let objGramaticas = {};
  let cadena = extraerGramaticaRIzquierda();

  let gramaticas = cadena.split('\n');
  for (let objGramatica of gramaticas){
    let variable_produccion = objGramatica.split('=');
    
    let variable = variable_produccion[0];
    variablesGlob.push(variable);
    objGramaticas[variable] = [];

    let producciones = variable_produccion[1];
    let produccion = producciones.split('|');
    
    for (let objproduccion of produccion){
        objGramaticas[variable].push(objproduccion);
    }
  }
  return objGramaticas;
}

function extraerGramaticaRIzquierda(){
  let gramatica = document.getElementById('gramaticaSinRecursividadIzquierda');
  let cadena = gramatica.innerHTML;

  //LIMPIA CARACTERES QUE NO VANA SERVIR y transforma a una cadena comprensible
  cadena = cadena.replaceAll('</h2><h2>', '\n');
  cadena = cadena.replaceAll('<br>', '\n');
  cadena = cadena.replaceAll('<h3>Recursividad por la izquierda</h3>', '');
  cadena = cadena.replaceAll('<h2>', '');
  cadena = cadena.replaceAll('</h2>', '');
  cadena = cadena.replace(/( )/g, ''); // Espacios
  // letras = letras.replace(/([<> ='|])/g, ''); // Simbolos

  return cadena;
}

// Función para calcular la primera función de una gramática
function calcularPrimera(gramatica, simbolo) {
  // Verificar si el símbolo es terminal
  if (!gramatica.hasOwnProperty(simbolo)) {
    return [simbolo];
  }

  let primera = [];

  // Obtener las producciones del símbolo
  const producciones = gramatica[simbolo];

  // Recorrer las producciones
  for (let produccion of producciones) {
    // Obtener el primer carácter de la producción
    const primerCaracter = produccion[0];

    // Verificar si el primer carácter es terminal
    if (!gramatica.hasOwnProperty(primerCaracter)) {
      primera.push(primerCaracter);
    } else {
      // Calcular la primera función del primer carácter recursivamente
      const primeraDelPrimerCaracter = calcularPrimera(gramatica, primerCaracter);

      // Agregar los elementos de la primera función del primer carácter a la primera función del símbolo
      primera = primera.concat(primeraDelPrimerCaracter);
    }
  }

  return primera;
}
  
function insertaEnDOM(etiqueta, datos, idEtiqueta){
  let objeto = document.createElement(etiqueta); //CREA EL OBJETO
  objeto.innerHTML = datos; //INSERTA LOS DATOS AL OBJETO

  let areaDelDOM = document.getElementById(idEtiqueta); //DONDE SE INSERTARA LA ETIQUETA
  areaDelDOM.appendChild(objeto); //INSERTA EL OBJETO
}
  
