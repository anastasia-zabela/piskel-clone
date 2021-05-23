import { TStore } from '@/store';
import { Tools } from '@/common/interfaces/tools';
import { Tool } from '@/models/Tool';

export class Pen extends Tool {
  x0: number | null = null;
  y0: number | null = null;

  store: TStore;

  constructor(store: TStore) {
    super();

    this.store = store;
  }

  fillSpaces(h: number, v: number): void {
    if (this.x0 !== null && this.y0 !== null && h !== this.x0 && v !== this.y0) {
      const {
        canvas: { ctxView, sizeRect, sizeCanvas },
        colors: { primary },
      } = this.store.state;
      if (!ctxView) return;

      const x1 = h / sizeRect;
      const y1 = v / sizeRect;
      const pixelData = this.drawLine({
        x0: this.x0,
        y0: this.y0,
        x1,
        y1,
        ctx: ctxView,
        sizeRect,
        sizeCanvas,
        color: primary,
      });
      this.setLineInFramesData(this.store, pixelData);
    }
  }

  drawPixel(e: MouseEvent): void {
    if (this.store.state.toolsIsActive.pen) {
      const {
        canvas: { canvas, ctxView, sizeRect },
        frames: { ctxFrame, frameWidth },
      } = this.store.state;

      if (!canvas || !ctxView || !ctxFrame) return;

      for (let h = 0; h < canvas.width; h += sizeRect) {
        for (let v = 0; v < canvas.height; v += sizeRect) {
          if (
            h + sizeRect > e.offsetX &&
            h <= e.offsetX &&
            v + sizeRect > e.offsetY &&
            v <= e.offsetY
          ) {
            ctxView.fillStyle = this.store.state.colors.primary;
            this.fillSpaces(h, v);
            this.x0 = h / sizeRect;
            this.y0 = v / sizeRect;

            ctxView.fillRect(h, v, sizeRect, sizeRect);
            ctxFrame.drawImage(canvas, 0, 0, frameWidth, frameWidth);
            this.setFramesData(this.store, h, v);
          }
        }
      }
    }
  }

  handleMouseDown(e: MouseEvent): void {
    if (this.store.state.currentTool === Tools.pen) {
      this.store.state.toolsIsActive.pen = true;
    }
    this.drawPixel(e);
  }

  handleMouseMove(e: MouseEvent): void {
    this.drawPixel(e);
  }

  handleMouseUp(): void {
    this.store.state.toolsIsActive.pen = false;
    this.x0 = null;
    this.y0 = null;
  }

  addPenTool(canvas: HTMLCanvasElement): void {
    canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
    canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
    canvas.addEventListener(
      'touchdown',
      this.handleMouseDown.bind(this) as EventListenerOrEventListenerObject,
    );
    canvas.addEventListener(
      'touchmove',
      this.handleMouseMove.bind(this) as EventListenerOrEventListenerObject,
    );
    canvas.addEventListener('touchup', this.handleMouseUp.bind(this));
  }
}
