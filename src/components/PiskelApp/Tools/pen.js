// let x0 = null;
// let y0 = null;

function drawPixel(e) {
  if (this.$store.state.toolsIsActive.pen) {
    // const { canvasElement, sizeRect } = storage.canvas;
    // const { currentFrame } = storage.frame;
    const { canvas, ctxView, sizeRect } = this.$store.state.canvas;
    // const ctxFrame = currentFrame.children[0].getContext('2d');
    for (let h = 0; h < canvas.width; h += sizeRect) {
      for (let v = 0; v < canvas.height; v += sizeRect) {
        if (h + sizeRect > e.offsetX && h <= e.offsetX
        && v + sizeRect > e.offsetY && v <= e.offsetY) {
          // ctx.fillStyle = storage.colors.primaryColor;
          // fillSpaces(h, v);
          // x0 = h / sizeRect;
          // y0 = v / sizeRect;

          ctxView.fillRect(h, v, sizeRect, sizeRect);
          // ctxFrame.drawImage(canvasElement, 0, 0, 150, 150);
          // setFramesData(h, v);
        }
      }
    }
  }
}

function handleMouseDown(e) {
  if (this.$store.state.currentTool === 'pen') {
    this.$store.state.toolsIsActive.pen = true;
  }
  drawPixel.call(this, e);
}

function handleMouseMove(e) {
  drawPixel.call(this, e);
}

function handleMouseUp() {
  this.$store.state.toolsIsActive.pen = false;
  // x0 = null;
  // y0 = null;
}

function addPenTool(canvas) {
  canvas.$el.addEventListener('mousedown', handleMouseDown.bind(canvas));
  canvas.$el.addEventListener('mousemove', handleMouseMove.bind(canvas));
  canvas.$el.addEventListener('mouseup', handleMouseUp.bind(canvas));
}

export default addPenTool;
