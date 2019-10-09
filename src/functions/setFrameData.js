function setFramesData(x, y, color) {
  const { framesData, currentFrame } = this.$store.state.frames;
  const { sizeRect, sizeCanvas } = this.$store.state.canvas;
  const { currentTool } = this.$store.state;
  const { primaryColor } = this.$store.state.colors;
  const row = y / sizeRect;
  const col = x / sizeRect;
  const indexPiksel = sizeCanvas * row + col;
  if (currentTool === 'eraser') {
    framesData[currentFrame][indexPiksel] = null;
  } else if (currentTool === 'lighten') {
    framesData[currentFrame][indexPiksel] = [x, y,
      sizeRect, color];
  } else {
    framesData[currentFrame][indexPiksel] = [x, y,
      sizeRect, primaryColor];
  }
  return indexPiksel;
}

function setLineInFramesData(data) {
  const { framesData, currentFrame } = this.$store.state.frames;
  framesData[currentFrame] = framesData[currentFrame].map((elem, i) => {
    let element;
    if (data[i] !== null) {
      element = data[i];
    } else {
      element = elem;
    }
    return element;
  });
}

export { setFramesData, setLineInFramesData };
