const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
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

  if (painting === false) {
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
  } else {
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  if (filling === true) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 700, 700);
  } else {
    ctx.strokeStyle = color;
  }
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

function handleRightClick(event) {
  event.preventDefault();
}

function handleSaveBtnClick(event) {
  const image = canvas.toDataURL();
  const tagA = document.createElement("a");
  tagA.href = image;
  tagA.download = "Painting[Export]";
  tagA.click();
}

function init() {
  //If canvas exist
  if (canvas) {
    canvas.width = 700;
    canvas.height = 700;

    ctx.strokeStyle = "#2c2c2c";
    ctx.lineWidth = 2.5;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 700, 700);

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("contextmenu", handleRightClick);
  }

  Array.from(colors).forEach((color) => color.addEventListener("click", handleColorClick));

  // If range exist
  if (range) {
    range.addEventListener("input", handleRangeChange);
  }

  if (mode) {
    mode.addEventListener("click", handleModeChange);
  }

  if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveBtnClick);
  }
}

init();
