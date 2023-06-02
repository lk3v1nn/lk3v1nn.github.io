
// // Definición de la gramática
// const grammar = {
//     S: ['S+T', 'S-T', 'T'],
//     T: ['T*F', 'T/F', 'F'],
//     F: ['a', '(S)']
//   };

// const terminales = ['+', '-', '*', '/', 'a', '(', ')'];

//     // Ejemplo de uso
//     const simboloInicial = 'S';
//     const primeraFuncion = calcularPrimera(grammar, simboloInicial);
    
//     alert(`Primera función de ${simboloInicial}: ${primeraFuncion}`);
  
 
//   // Función para calcular la primera función de una gramática
//   function calcularPrimera(gramatica, simbolo) {
//     // Verificar si el símbolo es terminal
//     for(let objterminal of terminales){
//         if (objterminal == simbolo){
//             return [simbolo];
//             break;    
//         }
//     }
//     // if (!gramatica.hasOwnProperty(simbolo)) {
//     //   return [simbolo];
//     // }
  
//     let primera = [];
  
//     // Obtener las producciones del símbolo
//     const producciones = gramatica[simbolo];
  
//     // Recorrer las producciones
//     for (let produccion of producciones) {
//       // Obtener el primer carácter de la producción
//       const primerCaracter = produccion[0];
    
//       // Verificar si el primer carácter es terminal
//       let encontrado = false;
//       for(let objprimerCaracter of primerCaracter){
//         if (objprimerCaracter == primerCaracter){
//             primera.push(primerCaracter);
//             encontrado = true;
//             break;    
//         }
//       }
//       if(!encontrado){
//         // Calcular la primera función del primer carácter recursivamente
//         const primeraDelPrimerCaracter = calcularPrimera(gramatica, primerCaracter);

//         // Agregar los elementos de la primera función del primer carácter a la primera función del símbolo
//         primera = primera.concat(primeraDelPrimerCaracter);  
//       }
//     //   // Verificar si el primer carácter es terminal
//     //   if (!gramatica.hasOwnProperty(primerCaracter)) {
//     //     primera.push(primerCaracter);
//     //   } else {
//     //     // Calcular la primera función del primer carácter recursivamente
//     //     const primeraDelPrimerCaracter = calcularPrimera(gramatica, primerCaracter);
  
//     //     // Agregar los elementos de la primera función del primer carácter a la primera función del símbolo
//     //     primera = primera.concat(primeraDelPrimerCaracter);
//     //   }
//     }
  
//     return primera;
//   }
  

// Definición de la gramática 
// let grammar = {
//     S: ['AB', 'BC'],
//     A: ['a'],
//     B: ['b'],
//     C: ['c']
//   };

// let grammar = {
//     S: ['S+T', 'S-T', 'T'],
//     T: ['T*F', 'T/F', 'F'],
//     F: ['a', '(S)']
//   };

let grammar = {
S: ['TS1'],
S1: ['+TS1', '-TS1', 'E'],
T: ['FT1'],
T1: ['*FT1', '/FT1', 'E'],
F: ['a', '(S)']
};

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
  
  // Ejemplo de uso
  const simboloInicial = 'S';
  const primeraFuncion = calcularPrimera(grammar, simboloInicial);
  
  console.log(`Primera función de ${simboloInicial}: ${primeraFuncion}`);
  