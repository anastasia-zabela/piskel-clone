import { TStore } from '@/store';

export class Tool {
  pixelData: (number | string)[][] = [];

  setPixelData({
    x,
    y,
    sizeRect,
    sizeCanvas,
    color,
  }: {
    x: number;
    y: number;
    sizeRect: number;
    sizeCanvas: number;
    color: string;
  }): void {
    const indexPixel = sizeCanvas * y + x;
    this.pixelData[indexPixel] = [x * sizeRect, y * sizeRect, sizeRect, color];
  }

  drawLine({
    x0,
    y0,
    x1,
    y1,
    ctx,
    sizeRect,
    sizeCanvas,
    color,
  }: {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
    ctx: CanvasRenderingContext2D;
    sizeRect: number;
    sizeCanvas: number;
    color: string;
  }): (number | string)[][] {
    this.pixelData = new Array(sizeCanvas ** 2).fill(null);
    const dx = x1 - x0;
    const dy = y1 - y0;
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
        x = x0;
        y = y0;
        xe = x1;
      } else {
        x = x1;
        y = y1;
        xe = x0;
      }
      ctx.fillRect(x * sizeRect, y * sizeRect, sizeRect, sizeRect);
      this.setPixelData({ x, y, sizeRect, sizeCanvas, color });
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
        this.setPixelData({ x, y, sizeRect, sizeCanvas, color });
      }
    } else {
      if (dy >= 0) {
        x = x0;
        y = y0;
        ye = y1;
      } else {
        x = x1;
        y = y1;
        ye = y0;
      }
      ctx.fillRect(x * sizeRect, y * sizeRect, sizeRect, sizeRect);
      this.setPixelData({ x, y, sizeRect, sizeCanvas, color });
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
        this.setPixelData({ x, y, sizeRect, sizeCanvas, color });
      }
    }
    return this.pixelData;
  }

  setFramesData = (store: TStore, x: number, y: number, color?: string): number => {
    const { framesData, currentFrameNum } = store.state.frames;
    const { sizeRect, sizeCanvas } = store.state.canvas;
    const { currentTool } = store.state;
    const { primary } = store.state.colors;
    const row = y / sizeRect;
    const col = x / sizeRect;
    const indexPiksel = sizeCanvas * row + col;
    if (currentTool === 'eraser') {
      framesData[currentFrameNum][indexPiksel] = null;
    } else if (currentTool === 'lighten' && color) {
      framesData[currentFrameNum][indexPiksel] = [x, y, sizeRect, color];
    } else {
      framesData[currentFrameNum][indexPiksel] = [x, y, sizeRect, primary];
    }
    return indexPiksel;
  };

  setLineInFramesData = (store: TStore, data: (number | string)[][]): void => {
    const { framesData, currentFrameNum } = store.state.frames;
    framesData[currentFrameNum] = framesData[currentFrameNum].map((elem, i) => {
      let element;
      if (data[i] !== null) {
        element = data[i];
      } else {
        element = elem;
      }
      return element;
    });
  };
}
