import { useStore } from '@/store';

const store = useStore();

export const setFramesData = (x: number, y: number, color?: string): number => {
  const { framesData, currentFrame } = store.state.frames;
  const { sizeRect, sizeCanvas } = store.state.canvas;
  const { currentTool } = store.state;
  const { primary } = store.state.colors;
  const row = y / sizeRect;
  const col = x / sizeRect;
  const indexPiksel = sizeCanvas * row + col;
  if (currentTool === 'eraser') {
    framesData[currentFrame][indexPiksel] = null;
  } else if (currentTool === 'lighten' && color) {
    framesData[currentFrame][indexPiksel] = [x, y, sizeRect, color];
  } else {
    framesData[currentFrame][indexPiksel] = [x, y, sizeRect, primary];
  }
  return indexPiksel;
};

export const setLineInFramesData = (data: number[]): void => {
  const { framesData, currentFrame } = store.state.frames;
  framesData[currentFrame] = framesData[currentFrame].map((elem, i) => {
    let element;
    if (data[i] !== null) {
      element = data[i];
    } else {
      element = elem;
    }
    return element;
  });
};
