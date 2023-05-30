const paintingArea = document.querySelector(".paintingArea");
const setSizeBtn = document.querySelector(".setSizeBtn");
const clearBtn = document.querySelector(".clearBtn");
const colorPicker = document.querySelector(".colorPicker");
const colorInput = document.querySelector(".colorInputBox");
const customColorBox = document.querySelector(".customColor");
const setColorBtn = document.querySelector(".setColorBtn");

let currentSize = 16;
let currentColor = "white";
let customColor = "rgb(143, 205, 247)";
let isPainting = false;

setSizeBtn.addEventListener("click", () => setSize());
clearBtn.addEventListener("click", () => clearGrids(currentSize));
setColorBtn.addEventListener("click", () => setCustomColorBox());
customColorBox.addEventListener("click", () => selectCustomColor());

let colorsForUse = [
  "#ff0000", "#ff6600", "#ffff66",
  "#ccff66", "#66ff33", "#66ffcc",
  "#0099ff", "#6666ff", "#ff99ff"
];

window.onload = () => {
  makeGrids(currentSize);
  setColorPicker();
  paintingArea.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isPainting = true;
  });
  paintingArea.addEventListener('mouseup', (e) => {
    e.preventDefault();
    isPainting = false;
  });
}

function makeGrids(size) {
  let gridWidth = 900 / size;

  for (let i = 0; i < size ** 2; i++) {
    let grid = document.createElement("div");
    grid.style.cssText = `width:${gridWidth}px;height:${gridWidth}px;`;
    grid.addEventListener('mouseover', (e) => {
      if (isPainting) e.target.style.backgroundColor = currentColor;
    });
    grid.addEventListener('mousedown', (e) => {
      e.target.style.backgroundColor = currentColor;
    });
    paintingArea.appendChild(grid);
  }

}

function clearGrids(size) {
  paintingArea.innerHTML = "";
  makeGrids(size);
}

function setSize() {
  let newSize = prompt("Input new size(1~100):", currentSize);
  if (newSize < 1 || newSize > 100) {
    alert("Please input 1~100");
    setSize();
  } else {
    currentSize = newSize;
    clearGrids(currentSize);
  }
}

function setColorPicker() {
  colorsForUse.forEach((color) => {
    let colorBox = document.createElement("div");
    colorBox.style.cssText = `background-color:${color};`;
    colorBox.addEventListener("click", (e) => {
      selectColor(e.target.style.backgroundColor);
    });
    colorPicker.appendChild(colorBox);
  });
}

function selectColor(color) {
  currentColor = color;
  let colorBoxs = colorPicker.querySelectorAll("div");
  colorBoxs.forEach((colorBox) => {
    if (colorBox.style.backgroundColor === color) {
      colorBox.style.border = "10px double white";
    }
    else {
      colorBox.style.border = "";
    }
  });
  customColorBox.style.border = "";
}

function setCustomColorBox() {
  if (!isColor(colorInput.value)) return;
  let keepSelect = currentColor === customColor;
  customColor = colorInput.value;
  customColorBox.style.backgroundColor = customColor;
  if (keepSelect) currentColor = customColor;
}

function selectCustomColor() {
  currentColor = customColor;
  let colorBoxs = colorPicker.querySelectorAll("div");
  colorBoxs.forEach(colorBox => colorBox.style.border = "");
  customColorBox.style.border = "10px double white";
}

function isColor(strColor) {
  const s = new Option().style;
  s.color = strColor;
  return s.color !== '';
}

