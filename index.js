const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ordenarAsc = arr => {
  return [...arr].sort((a, b) => a - b);
};
const ordenarDesc = arr => {
  return [...arr].sort((a, b) => b - a);
};
const imprimirArr = arr => {
  for (let i = 0; i < arr.length; i++) {
      let linea = '';
      for (let j = 0; j < arr[i].length; j++) {
          linea+=(arr[i][j]+' ');
      }
      console.log(linea);
  }
}
const countAmountOfElements = (array)=>{
  return array.reduce((total, value)=> {
  total[value]=(total[value]||0)+1;
  return total},{})
}
function isPath(matrix, color, rowInicial, colInicial, rowFinal, colFinal) { 
  
  const n = matrix.length;
  const m= matrix[0].length;
  
  let visited= Array(n).fill().map(() => Array(m).fill(false));
  
  // flag to indicate whether the path exists or not 
  let flag=false; 
  
  for(let i=0;i<n;i++) { 
    for(let j=0;j<m;j++) { 
      if((i == rowInicial && j == colInicial ) && !visited[i][j]) 
        
        // starting from i, j and then finding the path 
        if(isPathUtil(matrix, i, j, visited, rowInicial, colInicial, rowFinal, colFinal))
        { 
          flag=true; // if path exists 
          break; 
        } 
    } 
  } 
  return flag;
} 

// method for checking boundries 
function isSafe(i, j, matrix) { 	
  if(i>=0 && i<matrix.length && j>=0 && j < matrix[0].length) return true; 
  return false; 
} 

// Returns true if there is a path from a source (a 
// cell with value 1) to a destination (a cell with 
// value 2) 
function isPathUtil(matrix,  i, j,visited, rowInicial, colInicial,  rowFinal, colFinal){ 
  
  // checking the boundries, walls and 
  // whether the cell is unvisited 
  if(isSafe(i, j, matrix) && 
     (matrix[i][j]==0 || (i==rowInicial && j== colInicial) || (i==rowFinal && j==colFinal))  && !visited[i][j]){ 
    // make the cell visited 
    visited[i][j]=true; 
    
    // if the cell is the required 
    // destination then return true 
    if(i==rowFinal && j==colFinal) return true; 
    
    // traverse up 
    let up = isPathUtil(matrix, i-1, j, visited, rowInicial, colInicial, rowFinal, colFinal); 
    
    // if path is found in up direction return true 
    if(up) 
      return true; 
    
    // traverse left 
    let left = isPathUtil(matrix, i, j-1, visited, rowInicial, colInicial, rowFinal, colFinal); 
    
    // if path is found in left direction return true 
    if(left) 
      return true; 
    
    //traverse down 
    let down = isPathUtil(matrix, i+1, j, visited, rowInicial, colInicial, rowFinal, colFinal); 
    
    // if path is found in down direction return true 
    if(down) 
      return true; 
    
    // traverse right 
    let right = isPathUtil(matrix, i, j+1, visited, rowInicial, colInicial, rowFinal, colFinal); 
    
    // if path is found in right direction return true 
    if(right) 
      return true; 
  } 
  return false; // no path has been found 
} 
const CASILLA_LIBRE = 0;
const hizoVueltaEnUenEspacioVacio = (matrix, params, colorActual, x, y) => {
  if (noSaleDelBorde(x + 1, y, matrix)) {
    if (matrix[x + 1][y] === CASILLA_LIBRE) {
      if (cincoColoresIgualesAlrededor(matrix, params, colorActual, x + 1, y)) {
        return true;
      }
    }
  }
  if (noSaleDelBorde(x - 1, y, matrix)) {
    if (matrix[x - 1][y] === CASILLA_LIBRE) {
      if (cincoColoresIgualesAlrededor(matrix, params, colorActual, x - 1, y)) {
        return true;
      }
    }
  }
  if (noSaleDelBorde(x, y + 1, matrix)) {
    if (matrix[x][y + 1] === CASILLA_LIBRE) {
      if (cincoColoresIgualesAlrededor(matrix, params, colorActual, x, y + 1)) {
        return true;
      }
    }
  }
  if (noSaleDelBorde(x, y - 1, matrix)) {
    if (matrix[x][y - 1] === CASILLA_LIBRE) {
      if (cincoColoresIgualesAlrededor(matrix, params, colorActual, x, y - 1)) {
        return true;
      }
    }
  }
  return false;
};

const cincoColoresIgualesAlrededor=(matrix, params, colorActual, x, y) =>{
  let contador = 0;

  // centro izq
  if (noSaleDelBorde(x, y - 1, matrix)) {
    if (matrix[x][y - 1] === colorActual) {
      contador++;
    }
  }

  //arriba izq
  if (noSaleDelBorde(x - 1, y - 1, matrix)) {
    if (matrix[x - 1][y - 1] === colorActual) contador++;
  }

  //arriba centro
  if (noSaleDelBorde(x - 1, y, matrix)) {
    if (matrix[x - 1][y] === colorActual) {
      contador++;
    }
  }

  //arriba derecha
  if (noSaleDelBorde(x - 1, y + 1, matrix)) {
    if (matrix[x - 1][y + 1] === colorActual) contador++;
  }

  //centro der
  if (noSaleDelBorde(x, y + 1, matrix)) {
    if (matrix[x][y + 1] === colorActual) {
      contador++;
    }
  }

  if (contador == 5) return true;

  contador = 0;

  //arriba centro
  if (noSaleDelBorde(x - 1, y, matrix)) {
    if (matrix[x - 1][y] === colorActual) {
      contador++;
    }
  }

  //arriba derecha
  if (noSaleDelBorde(x - 1, y + 1, matrix)) {
    if (matrix[x - 1][y + 1] === colorActual) contador++;
  }

  //centro der
  if (noSaleDelBorde(x, y + 1, matrix)) {
    if (matrix[x][y + 1] === colorActual) {
      contador++;
    }
  }

  //abajo derecha
  if (noSaleDelBorde(x + 1, y + 1, matrix)) {
    if (matrix[x + 1][y + 1] === colorActual) contador++;
  }

  //abajo centro
  if (noSaleDelBorde(x + 1, y, matrix)) {
    if (matrix[x + 1][y] === colorActual) {
      contador++;
    }
  }

  if (contador == 5) return true;

  contador = 0;

  //centro der
  if (noSaleDelBorde(x, y + 1, matrix)) {
    if (matrix[x][y + 1] === colorActual) {
      contador++;
    }
  }

  //abajo derecha
  if (noSaleDelBorde(x + 1, y + 1, matrix)) {
    if (matrix[x + 1][y + 1] === colorActual) contador++;
  }

  //abajo centro
  if (noSaleDelBorde(x + 1, y, matrix)) {
    if (matrix[x + 1][y] === colorActual) {
      contador++;
    }
  }

  //abajo izq
  if (noSaleDelBorde(x + 1, y - 1, matrix)) {
    if (matrix[x + 1][y - 1] === colorActual) contador++;
  }

  // centro izq
  if (noSaleDelBorde(x, y - 1, matrix)) {
    if (matrix[x][y - 1] === colorActual) {
      contador++;
    }
  }

  if (contador == 5) return true;

  contador = 0;

  //abajo centro
  if (noSaleDelBorde(x + 1, y, matrix)) {
    if (matrix[x + 1][y] === colorActual) {
      contador++;
    }
  }

  //abajo izq
  if (noSaleDelBorde(x + 1, y - 1, matrix)) {
    if (matrix[x + 1][y - 1] === colorActual) contador++;
  }

  // centro izq
  if (noSaleDelBorde(x, y - 1, matrix)) {
    if (matrix[x][y - 1] === colorActual) {
      contador++;
    }
  }

  //arriba izq
  if (noSaleDelBorde(x - 1, y - 1, matrix)) {
    if (matrix[x - 1][y - 1] === colorActual) contador++;
  }

  //arriba centro
  if (noSaleDelBorde(x - 1, y, matrix)) {
    if (matrix[x - 1][y] === colorActual) {
      contador++;
    }
  }

  if (contador == 5) return true;
  contador = 0;

  return false;
}

const noSaleDelBorde=(row, col, matrix)=> {
  if (
    row == -1 ||
    row == matrix.length ||
    col == -1 ||
    col == matrix[0].length
  ) {
    return false;
  }
  return true;
}

const MAX_SIZE = 11
const MIN_COLORS = 2

////////////////////////////////////////////////////////////////////////////////////////

const elementosUnicos=(matrix)=> {
  let flat = matrix.flat().filter(x=>x!=0)
  flat=ordenarAsc(flat)
  return [...new Set(flat)];
}

const validarPares =(matrix)=>{
  let flat = [].concat(...matrix).filter(x=>x!=0)
  const cantidadElementos =countAmountOfElements(flat)
  const result= Object.keys(cantidadElementos).every((key)=>cantidadElementos[key]===2) 
  return result      
}

function getParams(matrix, index) {
  let lista = [];
  for (let k = 0; k < index.length; k++) {
    let aux = [ index[k], -1, -1, -1, -1 ];
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] == index[k]) {
          if (aux[1] == -1) {
            aux[1] = i;
            aux[2] = j;
          } else {
            aux[3] = i;
            aux[4] = j;
          }
        }
      }
    }
    lista.push(aux);
  }
  return lista;
}

function todasLasRutasAccesibles(params, matrix, colorActual){
  
  let indices = params.map(arr=>arr[0]);
  
  for (let i = indices.indexOf(colorActual); i < indices.length; i++) {
    let p= params[i];
    if(p[0]==colorActual) continue;
    if( !isPath(matrix, p[0], p[1], p[2], p[3], p[4])){
      return false;
    }
  }
  return true;
}

function hayCerosEnMatrix(matrix) {
  return ![].concat(...matrix).every(x=>x>0)
}

function todosLosCerosAccesibles(params, matrix,colorActual, x, y){
  if(!esCeroAccesible(params, matrix, colorActual, x+1, y)) return false;
  if(!esCeroAccesible(params, matrix, colorActual, x, y+1)) return false;
  if(!esCeroAccesible(params, matrix, colorActual, x-1, y)) return false;
  if(!esCeroAccesible(params, matrix, colorActual, x, y-1)) return false;
  return true;
}

function esCeroAccesible(params, matrix,colorActual, x, y){
  let aux=false;
  if (noSaleDelBorde(x, y, matrix)) {
    if (matrix[x][y] == 0) {
      aux =false;
      let indices = params.map(arr=>arr[0]);
      
      for (let i = indices.indexOf(colorActual); i < indices.length; i++) {
        let p = params[i];
        if(isPath(matrix, p[0], x,y, p[1], p[2])
           || isPath(matrix, p[0], x,y, p[3], p[4])){
          aux=true;
          break;
        }               
      }
      if(!aux) return false;
    }
  }
  return true;
}


function rutaValida(color, matrix,  visited, x, y, xFinal, yFinal) {
  if (x == xFinal && y == yFinal) {
    return true;
  }
  let contador = 0;
  if (noSaleDelBorde(x+1, y, matrix)) {
    if (matrix[x + 1][y] == color && !esFinaldeRuta(x + 1, y, xFinal, yFinal)) {
      contador++;
    }
  }
  if (noSaleDelBorde(x, y+1, matrix)) {
    if (matrix[x][y + 1] == color && !esFinaldeRuta(x, y + 1, xFinal, yFinal)) {
      contador++;
    }
  }
  if (noSaleDelBorde(x-1, y, matrix)) {
    if (matrix[x - 1][y] == color && !esFinaldeRuta(x - 1, y, xFinal, yFinal)) {
      contador++;
    }
  }
  if (noSaleDelBorde(x, y-1, matrix)) {
    if (matrix[x][y - 1] == color && !esFinaldeRuta(x, y - 1, xFinal, yFinal)) {
      contador++;
    }
  }
  return contador <= 1;
}

function esFinaldeRuta(x, y, xFinal, yFinal) {
  return x == xFinal && y == yFinal;
}

// ////////////////////////////////////////////////////////////////////////////////////////

// La función retorna true si el movimiento tomado es válido, sino retorna
// false.
function isSafe2(row, col, m, visited, nColor) {
  if (row == -1 || row == m.length || col == -1 || col == m[0].length || visited[row][col]
      || (m[row][col] != CASILLA_LIBRE && m[row][col] != nColor)) {
    return false;
  }
  return true;
}

// Función que recorre todas las posibles rutas.
function printPathUtil(row,  col, m, visited, arrayPath, resultados, nColor, rowFinal, colFinal, params) {
  
  if (row == -1 || row == m.length || col == -1 || col == m[0].length || visited[row][col]
      || (m[row][col] != CASILLA_LIBRE && m[row][col] != nColor)) {
    return;
  }
  
  // Si todas las células están completas guardamos la matriz y retornamos.
  if (row == rowFinal && col == colFinal) {
    
    if (hayCerosEnMatrix(arrayPath)) {
      
      let indice =-1;
      for(let i=0;i<params.length;i++){
        if(params[i][0]===nColor){
          indice=i+1;
          break;
        }
      }
      
      if(indice<params.length && indice!=-1){
        nColor=params[indice][0];
        row = params[indice][1];
        col = params[indice][2];
        rowFinal = params[indice][3];
        colFinal = params[indice][4];
      }else{
        return;
      }
    } else {
      let aux = Array(m.length).fill().map(() => Array(m[0].length));
      for (let i = 0; i < arrayPath.length; i++) {
        for (let j = 0; j < arrayPath[i].length; j++) {
          aux[i][j] = arrayPath[i][j];
        }
      }
      
      resultados.push(aux);
      return;
    }
  }
  
  // Marca la célula como visitada.
  visited[row][col] = true;
  
  // Intenta todas las direcciones (down, left,
  // up, right) en el orden dado para obtener las rutas correctas.
  
  // Verifica si mover abajo es válido.
  if (isSafe2(row + 1, col, m, visited, nColor)) {
    
    arrayPath[row + 1][col] = nColor;
    if (rutaValida(nColor, arrayPath, visited, row + 1, col, rowFinal, colFinal)
        && todasLasRutasAccesibles(params, arrayPath, nColor)
      && todosLosCerosAccesibles(params, arrayPath, nColor, row + 1, col)
      && !hizoVueltaEnUenEspacioVacio(arrayPath,params,nColor,row+1,col)
      ) {
        printPathUtil(row + 1, col, m, visited, arrayPath, resultados, nColor, rowFinal,colFinal, params);
      }
    if(row+1!=rowFinal || col!=colFinal) arrayPath[row + 1][col] = CASILLA_LIBRE;
  }
  
  // Verifica si mover a la izquierda es válido.
  if (isSafe2(row, col - 1, m, visited, nColor)) {
    arrayPath[row][col - 1] = nColor;
    if (rutaValida(nColor, arrayPath, visited, row, col - 1, rowFinal, colFinal)
        && todasLasRutasAccesibles(params, arrayPath, nColor)
      && todosLosCerosAccesibles(params, arrayPath, nColor, row, col - 1)
      && !hizoVueltaEnUenEspacioVacio(arrayPath,params,nColor,row,col-1)
      ) {
        printPathUtil(row, col - 1, m, visited, arrayPath, resultados, nColor, rowFinal,
                      colFinal, params);
      }
    if(row!=rowFinal || col-1!=colFinal) arrayPath[row][col - 1] = CASILLA_LIBRE;
  }
  
  // Verifica si mover arriba es válido.
  if (isSafe2(row - 1, col, m, visited, nColor)) {
    arrayPath[row - 1][col] = nColor;
    if (rutaValida(nColor, arrayPath, visited, row - 1, col, rowFinal, colFinal)
        && todasLasRutasAccesibles(params, arrayPath, nColor)
      && todosLosCerosAccesibles(params, arrayPath, nColor, row - 1, col)
      && !hizoVueltaEnUenEspacioVacio(arrayPath,params,nColor,row-1,col)
      ) {
        printPathUtil(row - 1, col, m, visited, arrayPath, resultados, nColor, rowFinal,
                      colFinal, params);
      }
    if(row-1!=rowFinal || col!=colFinal) arrayPath[row - 1][col] = CASILLA_LIBRE;
  }
  
  // Verifica si mover a la derecha es válido.
  if (isSafe2(row, col + 1, m, visited, nColor)) {
    arrayPath[row][col + 1] = nColor;
    if (rutaValida(nColor, arrayPath, visited, row, col + 1, rowFinal, colFinal)
        && todasLasRutasAccesibles(params, arrayPath, nColor)
      && todosLosCerosAccesibles(params, arrayPath, nColor, row, col + 1)
      && !hizoVueltaEnUenEspacioVacio(arrayPath,params,nColor,row,col+1)
      ) {
        printPathUtil(row, col + 1, m, visited, arrayPath, resultados, nColor, rowFinal,
                      colFinal, params);
      }
    if(row!=rowFinal || col+1!=colFinal) arrayPath[row][col + 1] = CASILLA_LIBRE;
  }
  
  // Marca la célula como NO visitada para otras posibles rutas.
  visited[row][col] = false;
}

// Función para almacenar y retornar la posible solución
function printPath(m) {
  
  // Validar parámetros...
  const size = Math.max(m.length,m[0].length)
  if(size>=MAX_SIZE) return 'Too big puzzle'
  
  const soloCeros = [].concat(...m).every(val=>val===0)
  if(soloCeros)return 'It must be a puzzle...'
  
  const soloNumeros = [].concat(...m).every(val=>!isNaN(val))
  if(!soloNumeros) return 'Wrong Format'
  
  const soloPares = validarPares(m)
  if(!soloPares) return 'Must be only pair elements'
  
  const unique = elementosUnicos(m);
  if(unique.length<MIN_COLORS) return 'Very few items'
  
  
  // Setear valores
  const params = getParams(m, unique);
  let resultados = [];
  let visited = Array(m.length).fill().map(() => Array(m[0].length).fill(false));
  let arrayPath = Array(m.length).fill().map(() => Array(m[0].length).fill(0));
  
  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[i].length; j++) {
      arrayPath[i][j] = m[i][j];
    }
  }
  
  // Llama la función utilitaria para encontrar las rutas válidas.
  printPathUtil(params[0][1], params[0][2], m, visited, arrayPath, resultados,
                params[0][0], params[0][3], params[0][4], params);
  
  return resultados;
}

function solve(matrix){
  let solucion = printPath(matrix);
  if(solucion){
    if(solucion.length===0) return 'NO SOLUTION'
    if(Array.isArray(solucion[0])) {
      solucion=solucion[0]
    }
    return solucion;
  }
}

app.post('/', (req, res) => {
  console.log("requested at:",(new Date()).toUTCString());
  if (req.accepts("application/json")) {
    if ( (req.body) && (typeof(req.body)=="object") && (Array.isArray(req.body.Matrix)) && (req.body.Matrix.length > 0) ) {
      let solution = solve(req.body.Matrix);
      if (Array.isArray(solution)) {
        console.log("success!");
        return res.json({Success:true,Solution:solution});
      }
      return res.status(400).send(solution);
    }
    return res.status(400).send("Expected JSON with a Matrix");
  }
	return res.sendStatus(406);
});

app.listen(3000, () => console.log('server started'));
