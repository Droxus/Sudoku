const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let pickedNumber = ''

function generateRandomNumber(start, end) {
    return Math.floor(start + Math.random() * end);
}

function generateRandomArray(size) {
    const factor = 10;
    return Array.from(new Set(Array.from(new Array(Math.min(size * factor, Number.MAX_SAFE_INTEGER)), _ => generateRandomNumber(1, size))));
}

/**
 * given an array of uniformly distributed digits `seeds`
 * in order to randomly generate an i-row of the matrix
 * cyclically shift (i-1)-row 3 times and one more time if (i-`seeds.length`) % 3 == 0
 * where i=1..`seeds.length` and 0-row = the given array
 * @example
 * [9, 1, 2,   8, 3, 4,   5, 6, 7]
 * [8, 3, 4,   5, 6, 7,   9, 1, 2]
 * [5, 6, 7,   9, 1, 2,   8, 3, 4]
 * -------------------------------
 * [1, 2, 8,   3, 4, 5,   6, 7, 9]
 * [3, 4, 5,   6, 7, 9,   1, 2, 8]
 * [6, 7, 9,   1, 2, 8,   3, 4, 5]
 * -------------------------------
 * [2, 8, 3,   4, 5, 6,   7, 9, 1]
 * [4, 5, 6,   7, 9, 1,   2, 8, 3]
 * [7, 9, 1,   2, 8, 3,   4, 5, 6]
**/

function generateRandomMatrix(seeds) {
    const size = seeds.length;
    const matrix = [seeds];
    for (let i = 1; i < size; ++i) {
        const prevRow = matrix[i - 1];
        const currRow = matrix[i] = Array.from(prevRow);
        currRow.push(...currRow.splice(0, i % 3 ? 3 : 4));
    }
    return matrix;
}


canvas.width = document.documentElement.scrollWidth
canvas.height = document.documentElement.scrollHeight

const SIZE = 9;
const seeds = generateRandomArray(SIZE);
const matrix = generateRandomMatrix(seeds);
let matrixCopy = new Array
for (let i = 0; i < matrix.length; i++){
    matrixCopy[i] = matrix[i].slice()
}
console.log(matrixCopy)
let canvasW = canvas.getBoundingClientRect().width;
let canvasH = canvas.getBoundingClientRect().height;
//

//
let minCord
minCord = Math.min(canvasW, canvasH)
let widthOfLine = 4
let lineCordX = 100
let lineCordY = 100
let procenteSize = 0.7
ctx.font = `${minCord/(2*SIZE)}px Verdana`
ctx.strokeStyle = '#222340'
ctx.fillStyle = "#612727"
drawCanvas()
function drawCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    minCord = Math.min(canvasW, canvasH)
for (let i = 0; i < (SIZE+1); i++){
    let x = ((minCord/SIZE * i) * procenteSize) + lineCordY
    let y = ((minCord/SIZE * i) * procenteSize) + lineCordX
    

    ctx.beginPath();
    ctx.moveTo(x, lineCordX);
    ctx.lineTo(x, minCord * procenteSize + lineCordX + widthOfLine/2);
    ctx.moveTo(lineCordY, y);
    ctx.lineTo(minCord * procenteSize + lineCordY + widthOfLine/2, y);
    if (Number.isInteger(i/3)){
        widthOfLine = 7
    } else {widthOfLine = 4}
    ctx.lineWidth = widthOfLine
    ctx.stroke(); 
}
console.log('W:'+canvasW); console.log('H:'+canvasH); console.log('mini:'+minCord)
}
// need to fix (look down)
function onresizeBody(event){
 canvasW = canvas.getBoundingClientRect().width;
 canvasH = canvas.getBoundingClientRect().height;
 minCord = Math.min(canvasW, canvasH)
 ctx.font = `${minCord/(2*SIZE)}px Verdana`
    drawCanvas()
    numberFilling()
    drawCanvasButton()
    console.log('resized')
}

let numberElementsToDeletting = 20
let RandomNumber1, RandomNumber2
let deletedElements = new Array
deleteElements()
function deleteElements(){
    let numberOfSameElements = 0
for (let i = 0; i < numberElementsToDeletting; i++){
    getTwoRandomNumbers(SIZE)    
    deletedElements.push([RandomNumber1, RandomNumber2])
    matrix[RandomNumber1][RandomNumber2] = ''
}
    for (let i = 0; i < deletedElements.length; i++){
        for (let j = 0; j < deletedElements.length; j++){
           if (deletedElements[i][0] == deletedElements[j][0] && deletedElements[i][1] == deletedElements[j][1]){
            numberOfSameElements++
            if (numberOfSameElements > numberElementsToDeletting * 0.3){
                deleteElements()
            }
           }
        }
    }
}
console.log(deletedElements)
function getTwoRandomNumbers(max){
    RandomNumber1 = Math.floor(Math.random() * max)
    RandomNumber2 = Math.floor(Math.random() * max)
    return RandomNumber1, RandomNumber2
}
numberFilling()
function numberFilling(){
for (let i = 0; i < SIZE; i++){
    for (let j = 0; j < SIZE; j++){
        let x = ((minCord/SIZE * i) * procenteSize) + lineCordY + (minCord/SIZE * procenteSize * 0.2)
        let y = ((minCord/SIZE * j) * procenteSize) + lineCordX   + (minCord/SIZE * procenteSize * 0.8)
        ctx.fillText(matrix[i][j], x, y)
    }
}
}
let buttonsCanvas = new Array
let Circle1 = new Object
for (let i = 0; i < 10; i++){
    buttonsCanvas.push(Object.create(Circle1))
    buttonsCanvas[i].x = 100 * i + 100
    buttonsCanvas[i].y = 50
    buttonsCanvas[i].radius = 40
    drawCanvasButton(i)
}
console.log(buttonsCanvas)
function drawCanvasButton(i){
    let number = i
    if (i == undefined){
        for (let i = 0; i < SIZE; i++){
            if (number == 0) {number = ''} else {number = i}
            ctx.beginPath();
            ctx.arc(buttonsCanvas[i].x, buttonsCanvas[i].y, buttonsCanvas[i].radius, 0, 2 * Math.PI, false)
            ctx.stroke();
            ctx.fillText(`${number}`, buttonsCanvas[i].x - buttonsCanvas[i].radius/2, buttonsCanvas[i].y + buttonsCanvas[i].radius/2)
        }
    } else{
        if (number == 0) {number = ''}
    ctx.beginPath();
    ctx.arc(buttonsCanvas[i].x, buttonsCanvas[i].y, buttonsCanvas[i].radius, 0, 2 * Math.PI, false)
    ctx.stroke();
    ctx.fillText(`${number}`, buttonsCanvas[i].x - buttonsCanvas[i].radius/2, buttonsCanvas[i].y + buttonsCanvas[i].radius/2)
}}

let x1, y1
let X, Y, CellX, CellY
function clicked(event){
    console.log("x: "+event.clientX+" y:"+event.clientY);
    X = event.clientX
    Y = event.clientY
    CellX = Math.ceil(X / ((minCord * procenteSize) / SIZE) - lineCordY / ((minCord * procenteSize) / SIZE))
    CellY = Math.ceil(Y / ((minCord * procenteSize) / SIZE) - lineCordX / ((minCord * procenteSize) / SIZE))

    for (let i = 0; i < buttonsCanvas.length; i++){
    if (X > buttonsCanvas[i].x - buttonsCanvas[i].radius & X < (buttonsCanvas[i].x + buttonsCanvas[i].radius)
     & Y > buttonsCanvas[i].y - buttonsCanvas[i].radius & Y < (buttonsCanvas[i].y + buttonsCanvas[i].radius)){
        console.log(`You have been clicked on the Circle${i}`)
        if (i !== 0){
            pickedNumber = i
        } else [pickedNumber = '']
        console.log(pickedNumber)
    }
    }
    if (CellX < SIZE+1 & CellY < SIZE+1 & CellX > 0 & CellY > 0){
        for (let i = 0; i < deletedElements.length; i++){
            if (deletedElements[i][0] == CellX-1 & deletedElements[i][1] == CellY-1){
                x1 = (minCord/SIZE * procenteSize * (CellX-1)) + lineCordY + widthOfLine
                y1 = (minCord/SIZE * procenteSize * (CellY-1)) + lineCordX + widthOfLine
                w1 = ((minCord * procenteSize) / SIZE) - 2 * widthOfLine
                h1 = ((minCord * procenteSize) / SIZE) - 2 * widthOfLine
                ctx.clearRect(x1, y1, w1 , h1)
                ctx.fillStyle = "#8a423d"
                ctx.fillText(pickedNumber, ((minCord/SIZE * (CellX-1)) * procenteSize) + lineCordY + (minCord/SIZE * procenteSize * 0.2),
                ((minCord/SIZE * (CellY-1)) * procenteSize) + lineCordX   + (minCord/SIZE * procenteSize * 0.8)) 
                matrix[CellX-1][CellY-1] = pickedNumber
                console.log(matrix)
        }}
 
    }
console.log("H: "+CellX+" V:"+CellY)
onWinCheck()
}
function onWinCheck(){
    let rightNumbers = 0
    for (i = 0; i < SIZE; i++){
        for (j = 0; j < SIZE; j++){
            if (matrix[i][j] == matrixCopy[i][j]){
                rightNumbers++
                if (rightNumbers == SIZE*SIZE){
                    console.log('WINNER')
                }
            }
        }
    }
}

