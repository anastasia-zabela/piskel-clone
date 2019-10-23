import { setFramesData, setLineInFramesData } from '../../../functions/setFrameData';
import drawLine from '../../../functions/drawLine';

let x0 = null;
let y0 = null;

function fillSpaces(h, v) {
  if (x0 !== null && y0 !== null && h !== x0 && v !== y0) {
    const { ctxView, sizeRect } = this.$store.state.canvas;
    const x1 = h / sizeRect;
    const y1 = v / sizeRect;
    const pixelData = drawLine.apply(this, [x0, y0, x1, y1, ctxView]);
    setLineInFramesData.call(this, pixelData);
  }
}

function drawPixel(e) {
  if (this.$store.state.toolsIsActive.pen) {
    const { canvas, ctxView, sizeRect } = this.$store.state.canvas;
    const { ctxFrame } = this.$store.state.frames;
    for (let h = 0; h < canvas.width; h += sizeRect) {
      for (let v = 0; v < canvas.height; v += sizeRect) {
        if (h + sizeRect > e.offsetX && h <= e.offsetX
        && v + sizeRect > e.offsetY && v <= e.offsetY) {
          ctxView.fillStyle = this.$store.state.colors.primaryColor;
          fillSpaces.apply(this, [h, v]);
          x0 = h / sizeRect;
          y0 = v / sizeRect;

          ctxView.fillRect(h, v, sizeRect, sizeRect);
          ctxFrame.drawImage(canvas, 0, 0, 150, 150);
          setFramesData.apply(this, [h, v]);
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
  x0 = null;
  y0 = null;
}

function addPenTool(canvas) {
  canvas.$el.addEventListener('mousedown', handleMouseDown.bind(canvas));
  canvas.$el.addEventListener('mousemove', handleMouseMove.bind(canvas));
  canvas.$el.addEventListener('mouseup', handleMouseUp.bind(canvas));
  canvas.$el.addEventListener('touchdown', handleMouseDown.bind(canvas));
  canvas.$el.addEventListener('touchmove', handleMouseMove.bind(canvas));
  canvas.$el.addEventListener('touchup', handleMouseUp.bind(canvas));
}

export default addPenTool;
