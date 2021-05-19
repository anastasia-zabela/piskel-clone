import { setFramesData, setLineInFramesData } from '@/utils/setFrameData';
import drawLine from '@/utils/drawLine';
import { useStore } from '../../../store';

const store = useStore();

let x0: number | null = null;
let y0: number | null = null;

function fillSpaces(h: number, v: number) {
  if (x0 !== null && y0 !== null && h !== x0 && v !== y0) {
    const { ctxView, sizeRect } = store.state.canvas;
    if (!ctxView) return;

    const x1 = h / sizeRect;
    const y1 = v / sizeRect;
    const pixelData = drawLine(x0, y0, x1, y1, ctxView);
    setLineInFramesData(pixelData);
  }
}

function drawPixel(e: MouseEvent) {
  if (store.state.toolsIsActive.pen) {
    const { canvas, ctxView, sizeRect } = store.state.canvas;
    const { ctxFrame, frameWidth } = store.state.frames;
    if (!canvas || !ctxView || !ctxFrame) return;

    for (let h = 0; h < canvas.width; h += sizeRect) {
      for (let v = 0; v < canvas.height; v += sizeRect) {
        if (
          h + sizeRect > e.offsetX &&
          h <= e.offsetX &&
          v + sizeRect > e.offsetY &&
          v <= e.offsetY
        ) {
          ctxView.fillStyle = store.state.colors.primary;
          fillSpaces(h, v);
          x0 = h / sizeRect;
          y0 = v / sizeRect;

          ctxView.fillRect(h, v, sizeRect, sizeRect);
          ctxFrame.drawImage(canvas, 0, 0, frameWidth, frameWidth);
          setFramesData(h, v);
        }
      }
    }
  }
}

function handleMouseDown(e: MouseEvent) {
  if (store.state.currentTool === 'pen') {
    store.state.toolsIsActive.pen = true;
  }
  drawPixel(e);
}

function handleMouseMove(e: MouseEvent) {
  drawPixel(e);
}

function handleMouseUp() {
  store.state.toolsIsActive.pen = false;
  x0 = null;
  y0 = null;
}

function addPenTool(canvas: HTMLCanvasElement): void {
  canvas.addEventListener('mousedown', handleMouseDown.bind(canvas));
  canvas.addEventListener('mousemove', handleMouseMove.bind(canvas));
  canvas.addEventListener('mouseup', handleMouseUp.bind(canvas));
  canvas.addEventListener(
    'touchdown',
    handleMouseDown.bind(canvas) as EventListenerOrEventListenerObject,
  );
  canvas.addEventListener(
    'touchmove',
    handleMouseMove.bind(canvas) as EventListenerOrEventListenerObject,
  );
  canvas.addEventListener('touchup', handleMouseUp.bind(canvas));
}

export default addPenTool;
