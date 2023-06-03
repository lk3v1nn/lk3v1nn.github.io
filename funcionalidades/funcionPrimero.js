
// let gramatica = {
// S: ['TS1'],
// S1: ['+TS1', '-TS1', 'E'],
// T: ['FT1'],
// T1: ['*FT1', '/FT1', 'E'],
// F: ['a', '(S)']
// };

  // // Ejemplo de uso
  // const simboloInicial = 'S';
  // const primeraFuncion = calcularPrimera(gramatica, simboloInicial);

  function hola(){
    let cadena = extraerGramaticaRIzquierda();
    creaObjgramatica(cadena);
  }

  function puputa(){
console.log('holaaaafff');
}

  // function extraerVP(){
  //   let cadena = extraerGramaticaRIzquierda();

  //   let variables = [];
  //   let producciones = [];
  //   let iterador = 0;
  //       gramaticas = cadena.split('\n');
  //   for (let objGramatica of gramaticas){
  //       let variable_produccion = objGramatica.split('=');
  //       variables[iterador] = variable_produccion[0];
  //       producciones[iterador] = variable_produccion[1];
  //       iterador++;
  //   }
  //   console.log([variables, producciones]);
  //   return [variables, producciones];
  // }

  function creaObjgramatica(cadena){
    let objGramaticas = {};
    let cadena = extraerGramaticaRIzquierda();

    let gramaticas = cadena.split('\n');
    for (let objGramatica of gramaticas){
        let variable_produccion = objGramatica.split('=');
        
        let variable = variable_produccion[0];
        objGramaticas[variable] = [];

        let producciones = variable_produccion[1];
        let produccion = producciones.split('|');
        
        for (let objproduccion of produccion){
            objGramaticas[variable].push(objproduccion);
        }
    }
    console.log('VEEER =   ' + objGramaticas);
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
  
  // console.log(`Primera función de ${simboloInicial}: ${primeraFuncion}`);
  



// let objeto = {};

// objeto.S = [];
// objeto.T = [];

// objeto.S.push('S-T');
// objeto.S.push('S+T');
// objeto.S.push('T');
// objeto.T.push('T*F');
// console.log(objeto);