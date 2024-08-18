const parentArr = [
  ["green", "pink", "blue", "green"],
  ["green", "green", "pink", "blue"],
  ["pink", "blue", "pink", "blue"],
  [],
  [],
];

console.log({ parentArr });

const container = document.getElementById("container");
const steps = document.getElementById("steps");
const result = document.getElementById("result");

const makeGlasses = (arr, container) => {
  arr.forEach(() => {
    container.innerHTML += `<div class="glass"></div>`;
  });

  const glasses = container.querySelectorAll(".glass");
  console.log({ glasses });
  glasses.forEach((glass, ind) => {
    arr[ind].forEach((value) => {
      glasses[ind].innerHTML += `<div class="${value} chemical"></div>`;
    });
  });
};

makeGlasses(parentArr, container);

let moved = false;
const recursiveSolve = (arr, values, indexOf) => {
  for (let i = 0; i < arr.length; i++) {
    if (indexOf !== i) {
      const innerArr = arr[i];

      if (innerArr.length === 0) {
        if (values.length === arr[indexOf].length) {
          moved = false;
        } else {
          for (let j = 0; j < values.length && arr[i].length < 4; j++) {
            arr[i] = [values[j], ...arr[i]];
            arr[indexOf].shift(0);
          }
          console.log(` glass ${indexOf + 1} => glass ${i + 1},`);
          steps.innerHTML += ` glass ${indexOf + 1} => glass ${i + 1} <br/>`;
          moved = true;
          break;
        }
      } else if (innerArr.length < 4) {
        if (values[0] === arr[i][0]) {
          for (let j = 0; j < values.length && arr[i].length < 4; j++) {
            arr[i] = [values[j], ...arr[i]];
            arr[indexOf].shift(0);
          }
          console.log(` glass ${indexOf + 1} => glass ${i + 1},`);
          steps.innerHTML += ` glass ${indexOf + 1} => glass ${i + 1} <br/>`;

          moved = true;
          break;
        } else moved = false;
      }
    }
  }
  const win = checkWin(arr);
  if (!win) {
    if (moved) {
      const checkAgain = checkNext(arr);
      if (checkAgain.try) {
        recursiveSolve(arr, getMore(arr[checkAgain.index]), checkAgain.index);
      }
    } else {
      const checkAgain = checkNext(arr);
      if (checkAgain.try) {
        recursiveSolve(
          arr,
          getMore(arr[checkAgain.index + 1]),
          checkAgain.index + 1
        );
      }
    }
  }
};

const checkNext = (arr) => {
  let index;
  for (let i = 0; i < arr.length; i++) {
    if (checkOne(arr[i])) {
      index = { try: true, index: i };
      break;
    } else {
      index = { try: false };
    }
  }
  return index;
};
const checkOne = (arr) => {
  let touch = false;
  if (arr.length === 4) {
    const match = arr[0];
    arr.forEach((val) => {
      if (match !== val) touch = true;
    });
  } else if (arr.length === 0) {
    touch = false;
  } else touch = true;
  return touch;
};
const checkWin = (arr) => {
  let win = true;
  arr.forEach((innerArr) => {
    if (innerArr.length === 4) {
      const match = innerArr[0];
      innerArr.forEach((val) => {
        if (match !== val) win = false;
      });
    } else if (innerArr.length < 4 && innerArr.length > 0) {
      win = false;
    }
  });
  return win;
};
const getMore = (arr) => {
  const match = arr[0];
  const values = [];
  for (let i = 0; i < arr.length; i++) {
    if (match === arr[i]) {
      values.push(arr[i]);
    } else break;
  }
  return values;
};

// while (!checkWin(parentArr)) {
if (checkOne(parentArr[0])) {
  recursiveSolve(parentArr, getMore(parentArr[0]), 0);
  const win = checkWin(parentArr);
  console.log({ win });
  console.log({ parentArr });
  if (win) {
    makeGlasses(parentArr, result);
  }
}
