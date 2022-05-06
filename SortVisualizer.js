values = [];

class Number {
  constructor(value, scale) {
    this.scale = 10 / scale;
    this.value = value;
  }

  getValue() {
    return this.value;
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

function mergeSort(A) {
  mergeSortRecurse(A, 0, A.length - 1);
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

function sort() {
  console.log("button clicked");
  generateRandomNumbers(10);
  console.log(values);
  //console.log(num.toString(), num2.toString());

  mergeSort(values);

  for (i in values) {
    console.log(values[i].toString());
  }
  values = [];
  //   console.log(values);
}