import { useStore } from '@/store';

const store = useStore();

let pixelData;

function setData(x: number, y: number) {
  const { sizeRect, sizeCanvas } = store.state.canvas;
  const { primary } = store.state.colors;
  const indexPiksel = sizeCanvas * y + x;
  pixelData[indexPiksel] = [x * sizeRect, y * sizeRect, sizeRect, primary];
}

function drawLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  ctx: CanvasRenderingContext2D,
): number[] {
  const setPixelData = setData;
  const { sizeRect, sizeCanvas } = store.state.canvas;
  pixelData = new Array(sizeCanvas ** 2).fill(null);
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dx1 = Math.abs(dx);
  const dy1 = Math.abs(dy);
  let px = 2 * dy1 - dx1;
  let py = 2 * dx1 - dy1;
  let x;
  let y;
  let xe;
  let ye;
  if (dy1 <= dx1) {
    if (dx >= 0) {
      x = x1;
      y = y1;
      xe = x2;
    } else {
      x = x2;
      y = y2;
      xe = x1;
    }
    ctx.fillRect(x * sizeRect, y * sizeRect, sizeRect, sizeRect);
    setPixelData(x, y);
    for (let i = 0; x < xe; i += 1) {
      x += 1;
      if (px < 0) {
        px += 2 * dy1;
      } else {
        if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
          y += 1;
        } else {
          y -= 1;
        }
        px += 2 * (dy1 - dx1);
      }
      ctx.fillRect(x * sizeRect, y * sizeRect, sizeRect, sizeRect);
      setPixelData(x, y);
    }
  } else {
    if (dy >= 0) {
      x = x1;
      y = y1;
      ye = y2;
    } else {
      x = x2;
      y = y2;
      ye = y1;
    }
    ctx.fillRect(x * sizeRect, y * sizeRect, sizeRect, sizeRect);
    setPixelData(x, y);
    for (let i = 0; y < ye; i += 1) {
      y += 1;
      if (py <= 0) {
        py += 2 * dx1;
      } else {
        if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
          x += 1;
        } else {
          x -= 1;
        }
        py += 2 * (dx1 - dy1);
      }
      ctx.fillRect(x * sizeRect, y * sizeRect, sizeRect, sizeRect);
      setPixelData(x, y);
    }
  }
  return pixelData;
}

export default drawLine;
