values = [];

//https://code.tutsplus.com/tutorials/how-to-draw-bar-charts-using-javascript-and-html5-canvas--cms-28561
var myCanvas = document.getElementById("myCanvas");
myCanvas.width = 500;
myCanvas.height = 200;

var ctx = myCanvas.getContext("2d");

function drawBars(x, y, w, h) {
  ctx.fillStyle = "#add8e6";
  ctx.fillRect(x, y, w, h);
}

function drawGraph(canvas, array) {
  //clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let prevX = 2;

  //the width of each bar
  let barWidth = canvas.width / array[0].getScale() - 2;

  //draw
  for (let i = 0; i < array.length; i++) {
    console.log(array[i].toString());
    //data[array[i].toString()] = array[i].getValue();
    let barHeight = array[i].getValue();

    drawBars(prevX, canvas.height - barHeight, barWidth, barHeight);
    prevX = prevX + barWidth + 2;
  }
}

function drawGraph() {
  //clear the canvas
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

  let prevX = 2;

  //the width of each bar
  let barWidth = myCanvas.width / values[0].getScale() - 2;

  //draw
  for (let i = 0; i < values.length; i++) {
    console.log(values[i].toString());
    //data[values[i].toString()] = values[i].getValue();
    let barHeight = values[i].getValue();

    drawBars(prevX, myCanvas.height - barHeight, barWidth, barHeight);
    prevX = prevX + barWidth + 2;
  }
}

/*
 ** This is what is show when the screen is first loaded up
 ** This function draws the bars for the unsorted arrays
 */
function setup() {
  values = [];

  //generate the random numbers based on the number of steps selected
  generateRandomNumbers(selectStep());

  //draw  values in canvas
  drawGraph(myCanvas, values);
}

function doSort() {
  mergeSort(values);

  //let data = {};
  for (let i = 0; i < values.length; i++) {
    console.log(values[i].toString());
    //data[values[i].toString()] = values[i].getValue();
  }
  drawGraph(myCanvas, values);

  values = [];
  //   console.log(values);
}

class Number {
  constructor(value, scale) {
    this.scale = scale;
    this.value = value * (100 / scale);
  }

  getValue() {
    return this.value;
  }
  getScale() {
    return this.scale;
  }
  toString() {
    return this.value;
  }
}

function generateRandomNumbers(scale) {
  for (let i = 0; i < scale; i++) {
    //generate a random number between 0 - the number provided
    let newNumber = Math.floor(Math.random() * scale + 1);
    let numberObject = new Number(newNumber, scale);

    //add the number to the array of values
    values.push(numberObject);
  }

  //just to be sure it is random
  //shuffle(values);
}

function selectStep() {
  //https://stackoverflow.com/questions/1085801/get-selected-value-in-dropdown-list-using-javascript#:~:text=document.getElementById(%22elementId%22)%3B
  //get the id of the dropdwon
  let dropdownBox = document.getElementById("step");

  //use the index of the selected option to get the value selected
  let selectedValue = dropdownBox.options[dropdownBox.selectedIndex].value;
  return selectedValue;
}

function mergeSort(A) {
  mergeSortRecurse(A, 0, A.length - 1);
}

function sleep(ms) {
  let now = Date.now();
  let end = now + ms;
  while (now < end) {
    now = Date.now();
  }
}

/*
 ** Merge Sort helper, divides the array into halves, and then call the merge function to combine two sorted halves
 */
function mergeSortRecurse(A, lo, hi) {
  if (lo < hi) {
    let mid = Math.floor((lo + hi) / 2);
    mergeSortRecurse(A, lo, mid);
    mergeSortRecurse(A, mid + 1, hi);
    merge(A, lo, mid, hi);
  }
}

function merge(A, lo, mid, hi) {
  const n = hi - lo + 1;
  const merged = new Array(10);
  let i = lo;
  let j = mid + 1;
  let k = 0;

  //compare the start of the array with the midpoint of the array
  //adding the smaller values to the new array (merged) first
  while (i < mid + 1 && j <= hi) {
    if (A[i].getValue() <= A[j].getValue()) {
      merged[k] = A[i];
      k++;
      i++;
    } else {
      merged[k] = A[j];
      k++;
      j++;
    }
  }

  //add the remaing values form either the left half or the right half of the input array to the new array(merged)

  //left half
  while (i < mid + 1) {
    merged[k] = A[i];
    k++;
    i++;
  }
  //right half
  while (j <= hi) {
    merged[k] = A[j];
    k++;
    j++;
  }

  //update the input array
  for (k = 0; k < n; k++) {
    A[lo + k] = merged[k];
  }
}
