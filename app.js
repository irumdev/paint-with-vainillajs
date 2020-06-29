const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const ctx = canvas.getContext("2d");

let painting = false;
let filling = false;

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  const offsetX = event.offsetX;
  const offsetY = event.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
  } else {
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
}

function handleRangeChange(event) {
  const lineWidth = event.target.value;
  ctx.lineWidth = lineWidth;
}

function handleModeChange(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = `Fill`;
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function init() {
  //If canvas exist
  if (canvas) {
    canvas.width = 700;
    canvas.height = 700;
    ctx.strokeStyle = "#2c2c2c";
    ctx.lineWidth = 2.5;

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
  }

  Array.from(colors).forEach((color) => color.addEventListener("click", handleColorClick));

  // If range exist
  if (range) {
    range.addEventListener("input", handleRangeChange);
  }

  if (mode) {
    mode.addEventListener("click", handleModeChange);
  }
}

init();
