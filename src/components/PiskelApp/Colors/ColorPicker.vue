<template>
  <div class="color-picker">
    <div class="spectrum-map" @mousedown="startGetSpectrumColor">
      <div class="spectrum-map__color-cursor"></div>
      <canvas class="spectrum-map__spectrum-canvas" width="150" height="150"></canvas>
    </div>
    <div class="hue-color" @mousedown="startGetHueColor">
      <div class="hue-color__hue-cursor" v-bind:style="{ background: colorHue, top: hueY }"></div>
      <canvas class="hue-color__hue-canvas" height="140"></canvas>
    </div>
    <div class="color-input">
      <div v-if="colorFormat === 'hex'" class="color-input-hex">
        <span>HEX</span>
        <input type="text" spellcheck="false" v-model="colorInHex" />
      </div>
      <div v-if="colorFormat === 'rgb'" class="color-input-rgb">
        <span>R</span>
        <input type="text" spellcheck="false" v-model="colorInRgb[0]" />
        <span>G</span>
        <input type="text" spellcheck="false" v-model="colorInRgb[1]" />
        <span>B</span>
        <input type="text" spellcheck="false" v-model="colorInRgb[2]" />
      </div>
    </div>
    <button class="color-mode" @click="changeColorFormat">{{ changeColorFormatButton }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'ColorPicker',
  props: {
    color: {
      type: String,
      required: true,
    },
    colorName: {
      type: String as PropType<'primary' | 'secondary'>,
      required: true,
    },
  },
  data() {
    return {
      colorFormat: 'rgb',
      colorInRgb: [] as number[],
      colorHue: 'hsl(4, 100%, 47%)',
      hueY: '0px',
    };
  },
  computed: {
    colorInHsl(): number[] {
      return this.rgbToHsl(this.colorInRgb);
    },
    currentColor() {
      const [h, s, l]: number[] = this.colorInHsl;
      return `hsl(${h}, ${s}%, ${l}%)`;
    },
    colorInHex(): string {
      return this.rgbToHex();
    },
    changeColorFormatButton(): string {
      return this.colorFormat === 'hex' ? 'to RGB' : 'to HEX';
    },
  },
  watch: {
    colorInRgb() {
      const [h] = this.rgbToHsl(this.colorInRgb);
      if (h !== 0) {
        this.colorHue = `hsl(${h}, 100%, 47%)`;
        this.createShadeSpectrum();

        const y = Math.floor(140 - (h / 360) * 140);
        console.log(y, this.colorHue);
        this.hueY = `${y}px`;
      }
      this.$store.state.colors[this.colorName] = this.currentColor;
      console.log(this.$store.state.colors[this.colorName]);
    },
  },
  methods: {
    changeColorFormat() {
      const format = this.colorFormat === 'hex' ? 'rgb' : 'hex';
      this.colorFormat = format;
    },

    createShadeSpectrum() {
      const spectrumCanvas: HTMLCanvasElement | null = document.querySelector(
        '.spectrum-map__spectrum-canvas',
      );
      console.log(spectrumCanvas);
      if (!spectrumCanvas) return;
      const ctxSpectrum = spectrumCanvas.getContext('2d');
      if (!ctxSpectrum) return;

      const color = this.colorHue;
      ctxSpectrum.fillStyle = color;
      ctxSpectrum.fillRect(0, 0, spectrumCanvas.width, spectrumCanvas.height);

      const whiteGradient = ctxSpectrum.createLinearGradient(0, 0, spectrumCanvas.width, 0);
      whiteGradient.addColorStop(0, '#fff');
      whiteGradient.addColorStop(1, 'transparent');
      ctxSpectrum.fillStyle = whiteGradient;
      ctxSpectrum.fillRect(0, 0, spectrumCanvas.width, spectrumCanvas.height);

      const blackGradient = ctxSpectrum.createLinearGradient(0, 0, 0, spectrumCanvas.height);
      blackGradient.addColorStop(0, 'transparent');
      blackGradient.addColorStop(1, '#000');
      ctxSpectrum.fillStyle = blackGradient;
      ctxSpectrum.fillRect(0, 0, spectrumCanvas.width, spectrumCanvas.height);
    },

    createHueSpectrum() {
      const canvasHue: HTMLCanvasElement | null = document.querySelector('.hue-color__hue-canvas');
      if (!canvasHue) return;
      const ctxHue = canvasHue.getContext('2d');
      if (!ctxHue) return;

      const hueGradient = ctxHue.createLinearGradient(0, 0, 0, canvasHue.height);
      hueGradient.addColorStop(0.0, 'hsl(0,100%,50%)');
      hueGradient.addColorStop(0.17, 'hsl(298.8, 100%, 50%)');
      hueGradient.addColorStop(0.33, 'hsl(241.2, 100%, 50%)');
      hueGradient.addColorStop(0.5, 'hsl(180, 100%, 50%)');
      hueGradient.addColorStop(0.67, 'hsl(118.8, 100%, 50%)');
      hueGradient.addColorStop(0.83, 'hsl(61.2,100%,50%)');
      hueGradient.addColorStop(1.0, 'hsl(360,100%,50%)');
      ctxHue.fillStyle = hueGradient;
      ctxHue.fillRect(0, 0, canvasHue.width, canvasHue.height);
    },

    rgbToHex() {
      const hexColor = this.colorInRgb.map((elem) => {
        let rgbToHex = Number(elem).toString(16);
        if (rgbToHex.length < 2) {
          rgbToHex = `0${rgbToHex}`;
        }
        return rgbToHex;
      });
      return hexColor.join('');
    },

    rgbToHsl(rgb: number[]): number[] {
      let [r, g, b] = rgb;

      r /= 255;
      g /= 255;
      b /= 255;
      const cmin = Math.min(r, g, b);
      const cmax = Math.max(r, g, b);
      const delta = cmax - cmin;
      let h = 0;
      let s = 0;
      let l = 0;
      if (delta === 0) {
        h = 0;
      } else if (cmax === r) {
        h = ((g - b) / delta) % 6;
      } else if (cmax === g) {
        h = (b - r) / delta + 2;
      } else {
        h = (r - g) / delta + 4;
      }

      h = Math.round(h * 60);

      if (h < 0) {
        h += 360;
      }

      l = (cmax + cmin) / 2;

      s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

      s = +(s * 100).toFixed(1);
      l = +(l * 100).toFixed(1);

      return [h, s, l];
    },

    hslToRgb(h: number, S: number, L: number) {
      const s = S / 100;
      const l = L / 100;

      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
      const m = l - c / 2;
      let r = 0;
      let g = 0;
      let b = 0;

      if (h >= 0 && h < 60) {
        r = c;
        g = x;
        b = 0;
      } else if (h >= 60 && h < 120) {
        r = x;
        g = c;
        b = 0;
      } else if (h >= 120 && h < 180) {
        r = 0;
        g = c;
        b = x;
      } else if (h >= 180 && h < 240) {
        r = 0;
        g = x;
        b = c;
      } else if (h >= 240 && h < 300) {
        r = x;
        g = 0;
        b = c;
      } else if (h >= 300 && h < 360) {
        r = c;
        g = 0;
        b = x;
      }
      r = Math.round((r + m) * 255);
      g = Math.round((g + m) * 255);
      b = Math.round((b + m) * 255);

      return [r, g, b];
    },

    getSpectrumColor(e: MouseEvent) {
      const cursor: HTMLDivElement | null = document.querySelector('.spectrum-map__color-cursor');
      const spectrumCanvas: HTMLCanvasElement | null = document.querySelector(
        '.spectrum-map__spectrum-canvas',
      );
      if (!spectrumCanvas || !cursor) return;
      const ctxSpectrum = spectrumCanvas.getContext('2d');
      const spectrumRect = spectrumCanvas.getBoundingClientRect();
      if (!ctxSpectrum) return;

      let x = e.pageX - spectrumRect.left;
      let y = e.pageY - spectrumRect.top;
      if (x > spectrumRect.width) {
        x = spectrumRect.width - 1;
      }
      if (x < 0) {
        x = 0;
      }
      if (y > spectrumRect.height) {
        y = spectrumRect.height;
      }
      if (y < 0) {
        y = 0;
      }

      const imgData = ctxSpectrum.getImageData(x, y, 1, 1);
      this.colorInRgb = [imgData.data[0], imgData.data[1], imgData.data[2]];

      cursor.style.top = `${y}px`;
      cursor.style.left = `${x}px`;
    },

    getHueColor(e: MouseEvent) {
      // const cursor = document.querySelector('.hue-color__hue-cursor');
      const hueCanvas: HTMLCanvasElement | null = document.querySelector('.hue-color__hue-canvas');
      if (!hueCanvas) return;
      const ctxHue = hueCanvas.getContext('2d');
      const hueRect = hueCanvas.getBoundingClientRect();
      if (!ctxHue) return;

      let y = e.pageY - hueRect.top;
      if (y > hueRect.height) {
        y = hueRect.height - 1;
      }
      if (y < 0) {
        y = 1;
      }

      const imgData = ctxHue.getImageData(1, y, 1, 1);
      const [h, s, l] = this.rgbToHsl([imgData.data[0], imgData.data[1], imgData.data[2]]);
      this.colorHue = `hsl(${h}, ${s}%, ${l}%)`;
      this.createShadeSpectrum();

      const percent = y / hueRect.height;
      const hue = Math.floor(360 - 360 * percent);
      console.log(hueRect);
      const [red, green, blue] = this.hslToRgb(hue, this.colorInHsl[1], this.colorInHsl[2]);

      this.colorInRgb.splice(0, -1, red, green, blue);
      this.hueY = `${y}px`;
    },

    startGetSpectrumColor(e: MouseEvent) {
      this.getSpectrumColor(e);
      window.addEventListener('mousemove', this.getSpectrumColor);
      window.addEventListener('mouseup', this.endGetSpectrumColor);
    },

    endGetSpectrumColor() {
      window.removeEventListener('mousemove', this.getSpectrumColor);
    },

    startGetHueColor(e: MouseEvent) {
      this.getHueColor(e);
      window.addEventListener('mousemove', this.getHueColor);
      window.addEventListener('mouseup', this.endGetHueColor);
    },

    endGetHueColor() {
      window.removeEventListener('mousemove', this.getHueColor);
    },
  },
  mounted() {
    this.colorInRgb = this.color.match(/\d+/g)?.map((n) => Number(n)) || [0, 0, 0];

    this.createShadeSpectrum();
    this.createHueSpectrum();
  },
});
</script>

<style lang="less">
@spectrum-cursor-width: 30px;

.color-picker {
  z-index: 3;
  position: absolute;
  top: 100%;
  left: 0;
  display: grid;
  grid-template: 2fr 20px e('/') 2fr 60px;
  grid-gap: 5px;
  padding: 10px;
  background: @font-color-dark;
}

.spectrum-map {
  position: relative;
  width: 150px;
  height: 150px;
  overflow: hidden;
  cursor: pointer;

  &__color-cursor {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    height: @spectrum-cursor-width;
    width: @spectrum-cursor-width;
    margin-left: -@spectrum-cursor-width / 2;
    margin-top: -@spectrum-cursor-width / 2;
    border: 2px solid white;
    border-radius: 100%;
    background: none;
    box-sizing: border-box;
  }

  &__spectrum-canvas {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

.hue-color {
  position: relative;
  width: 10px;
  height: 150px;
  margin: auto;
  cursor: pointer;

  &__hue-cursor {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 50%;
    height: 15px;
    width: 15px;
    transform: translate(-50%, -50%);
    border: 2px solid white;
    border-radius: 100%;
    background: red;
  }

  &__hue-canvas {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 25px;
  }
}

.color-input {
  & input {
    height: 100%;
    padding: 0 5px;
    outline: none;
    border: none;
    background: @bg-color;
  }

  & span {
    color: white;
  }

  &-hex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;

    & input {
      width: 13vh;
    }
  }

  &-rgb {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 20px;

    & input {
      width: 3vh;
    }
  }
}

.color-mode {
  background: @bg-color;
  border: none;
  color: white;
  outline: none;
}
</style>
