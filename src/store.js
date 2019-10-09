import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    frames: {
      framesData: [],
      currentFrame: 0,
      ctxFrame: null,
    },
    tools: {
      pen: {
        name: 'pen',
        icon: 'pen',
        shortcut: 'P',
      },
      paintBucket: {
        name: 'paint-bucket',
        icon: 'fill-drip',
        shortcut: 'B',
      },
      sameColor: {
        name: 'same-color',
        icon: 'palette',
        shortcut: 'A',
      },
      colorPicker: {
        name: 'color-picker',
        icon: 'eye-dropper',
        shortcut: 'O',
      },
      eraser: {
        name: 'eraser',
        icon: 'eraser',
        shortcut: 'E',
      },
      line: {
        name: 'line',
        icon: 'slash',
        shortcut: 'L',
      },
      rectangle: {
        name: 'rectangle',
        icon: 'vector-square',
        shortcut: 'R',
      },
      circle: {
        name: 'circle',
        icon: 'regular/circle',
        shortcut: 'C',
      },
      dithering: {
        name: 'dithering',
        icon: 'brands/delicious',
        shortcut: 'T',
      },
      lighten: {
        name: 'lighten',
        icon: 'adjust',
        shortcut: 'U',
      },
    },
    toolsIsActive: {
      pen: false,
    },
    currentTool: 'pen',
    canvas: {
      canvas: null,
      ctxDraw: null,
      ctxView: null,
      sizeRect: null,
      sizeCanvas: 32,
    },
    colors: {
      primaryColor: '#29292a',
      secondaryColor: '#acc7cd',
    },
  },
  mutations: {

  },
  actions: {

  },
});
