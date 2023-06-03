function ReinsertaTabla() {
    const tabla1 = document.getElementById('tabla1');
    const tabla2 = document.getElementById('tabla2');
    const tabla3 = document.getElementById('tabla3');
    tabla1.innerHTML = "<thead><tr><td>Variables</td></tr></thead><tbody></tbody>";
    tabla2.innerHTML = "<thead><tr><td>Terminales</td></tr></thead><tbody></tbody>";
    tabla3.innerHTML = "<thead><tr><td>Variables</td><td>Producciones</td></tr></thead><tbody></tbody>";
}

function insertaDatosTabla1_2(tabla, dato){
    // Ubica la tabla
    let table = document.getElementById(tabla);
    // Ubica body
    let body = table.querySelector('tbody');
    // Inserta una fila
    let insertarFila = body.insertRow();
    insertarFila.innerHTML;
    // Inserta columnas de la fila (datos)
    let insertarColumna = insertarFila.insertCell();
    insertarColumna.innerHTML = dato;
}

function insertaDatosTabla3(tabla, dato1, dato2){
    // Ubicar tabla
    const tabla3 = document.getElementById(tabla);
    // Ubicar body
    const body3 = tabla3.querySelector('tbody');
    // Insertar fila
    const fila3 = body3.insertRow();
    fila3.innerHTML;
    // Insertar dato 1
    const colum1 = fila3.insertCell();
    const colum2 = fila3.insertCell();
    colum1.innerHTML = dato1;
    colum2.innerHTML = dato2;
}

function EliminarDuplicados(datos){
    const sinDuplicados = new Set(datos);
    let resultado = [...sinDuplicados];
    return resultado;
}
let NoDupliTerminales; //Variable global que contiene los terminales no repetidos
function V_T(){
    ReinsertaTabla()
    const txt = document.querySelector('#text');
    let letras = txt.innerHTML; // Datos del documento (Las gramaticas del .txt)

    //REMPLAZA LOS CARACTERES QUE NO SE VAN A EVALUAR
    letras = letras.replaceAll('<br>', ''); // Saltos de linea
    letras = letras.replace(/( )/g, ''); // Espacios
    // letras = letras.replace(/([<> ='|])/g, ''); // Simbolos
    
    let gramaticas = letras.split('\n'); //SEPARA LAS GRAMATICAS

    //SEPARA LAS VARIABLES Y TERMINALES MEDIANTE EL SIGNO =
    let Variables = [];
    let Terminales = [];
    for (i = 0; i < gramaticas.length; i++){
        let Var_Ter = gramaticas[i].split('=');
        Variables[i] = Var_Ter[0];
        Terminales[i] = Var_Ter[1];
    }

    // ELIMINA DUPLICADOS Y INSERTA LAS VARIABLES EN LA TABLA
    let VarSD = EliminarDuplicados(Variables);
    for (const temp of VarSD){
        insertaDatosTabla1_2('tabla1', temp);
    }

    // GUARDA LOS CARACTERES QUE ESTEN DENTRO DE COMILLAS SIMPLES
    const comillas = /'([^']*)'/g; 
    const datosEnComillas = letras.matchAll(comillas);

    // CONVIERTE EL IterableIterator EN UN ARRAY
    let terminalesArray = [];
    for (let temp of datosEnComillas){
        terminalesArray.push(temp[1]);
    }

    NoDupliTerminales = EliminarDuplicados(terminalesArray);
    //RECORRE TODO EL ARRAY Y INSERTA LOS DATOS EN LA TABLAS
    for (const datos of NoDupliTerminales) {
        insertaDatosTabla1_2('tabla2', datos);
    }

  
}

function V_P(){
    const txt = document.querySelector('#text');
    let letras = txt.innerHTML; // Datos del documento (Las gramaticas del .txt)
    letras = letras.replace(/([ '])/g, '');
    let gramaticas = letras.split('\n'); // Separo la cadena por saltos de linea
    gramaticas = gramaticas.map(e => e.replace(/<br>/g, '')); //Map ejecuta la funcion para cada elemento del array
    for (let i=0; i < gramaticas.length; i++){ // Recorre cada gramatica de la lista
        let VP = gramaticas[i].split('='); // Separa la variable y produccion. Separa por el simbolo '='
        if (VP[1].includes('|')){ // Verifica si la variable tiene varias producciones
            let P = VP[1].split('|'); // Separa las producciones del variable
            for(let i=0; i < P.length; i++){ // Recorre las producciones que separo en el paso anterior
                insertaDatosTabla3('tabla3', VP[0], P[i]); // Inserta la variable y la produccion en la tabla
            }
        }else{
            insertaDatosTabla3('tabla3', VP[0], VP[1]); // Inserta en la tabla la Variable y la Produccion
        }
    }
}


/* TABLAS DE RECURSIVIDAD X IZQUIERDA *********************************************************************************************************/
    
    function insertarTablasRIzq(){
        let gramatica = extraerGramaticaRIzquierda();

        let VP = V_P_RecuIzq(gramatica);
        CrearTablaRIzquierdaIndividual('Variables' ,VP[0]);
        CrearTablaRIzquierdaIndividual('Terminales' ,NoDupliTerminales);

        let VP2 = V_T_RecuIzq(gramatica);
        CrearTablaRIzquierdaDoble('Variables', 'Producciones', VP2);
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


    function V_P_RecuIzq(cadena){
        let variables = [];
        let producciones = [];
        let iterador = 0;
        let gramaticas = cadena.split('\n');
        for (let objGramatica of gramaticas){
            let variable_produccion = objGramatica.split('=');
            variables[iterador] = variable_produccion[0];
            producciones[iterador] = variable_produccion[1];
            iterador++;
        }
        let VP = [variables, producciones];
        return VP;
    }

    function CrearTablaRIzquierdaIndividual(titulo, datos){
        let eTablasXIzquierda = document.getElementById('tablasXIzquierda');
        
        //CREA LAS ETIQUETAS
        let eTable = document.createElement('table');
        let eThead = document.createElement('thead');
        let eTbody = document.createElement('tbody');

        //INSERTA TABLA
        eTablasXIzquierda.appendChild(eTable);
        
        //INSERTA ENCABEZADO
        eTable.appendChild(eThead);
        let filaThead = eThead.insertRow();
        let columnaThead = filaThead.insertCell();
        columnaThead.textContent = titulo;

        //INSERTA CUERPO
        eTable.appendChild(eTbody);
        for (let objcolumna of datos){
            let filaTbody = eTbody.insertRow();
            let ColumnaTbody = filaTbody.insertCell();
            ColumnaTbody.textContent = objcolumna;
        }
        
    }

    function CrearTablaRIzquierdaDoble(titulo1, titulo2, datos){
        let eTablasXIzquierda = document.getElementById('tablasXIzquierda');

        //CREAR LAS ETIQUETAS
        let eTable = document.createElement('table');
        let eThead = document.createElement('thead');
        let eTbody = document.createElement('tbody');

        //INSERTA TABLA EN EL DOM
        eTablasXIzquierda?.appendChild(eTable);

        //INSERTA ENCABEZADOS
        eTable.appendChild(eThead);
        let filaThead = eThead.insertRow();
        let columna1Thead = filaThead.insertCell();
        columna1Thead.textContent=titulo1;
        let columna2Thead = filaThead.insertCell();
        columna2Thead.textContent=titulo2;

        //INSERTAR CUERPO
        eTable.appendChild(eTbody);
        for (let objcolumnas of datos){
            let filaTbody = eTbody.insertRow();
            //aqui tengo el S=A debe separarlo y meterlo en las celdas
            let VT = objcolumnas.split('=');
            let columna1Tbody = filaTbody.insertCell();
            columna1Tbody.textContent = VT[0];
            let columna2Tbody = filaTbody.insertCell();
            columna2Tbody.textContent = VT[1];
        }
    }

    function V_T_RecuIzq(cadena){
        let VT = [];
        let gramaticas = cadena.split('\n');
        for (let objGramatica of gramaticas){
            let variable_produccion = objGramatica.split('=');
            let variable = variable_produccion[0];
            let producciones = variable_produccion[1];
            let produccion = producciones.split('|');
            for (let objproduccion of produccion){
                VT.push(variable + '=' + objproduccion);
            }
        }
        return VT;
    }
