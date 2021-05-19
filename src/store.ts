// import Vue from 'vue';
// import Vuex from 'vuex';
import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { Tool } from './common/interfaces/tools';

export const key: InjectionKey<Store<IStore>> = Symbol();

// export const store = createStore<State>({
//   state: {
//     count: 0,
//   },
// });

// Vue.use(Vuex);

export interface IStore {
  frames: {
    framesData: (number | (number | string)[] | null)[][];
    frameWidth: number;
    currentFrame: number;
    ctxFrame: CanvasRenderingContext2D | null;
  };
  tools: {
    name: string;
    icon: string | string[];
    shortcut: string;
  }[];
  toolsIsActive: {
    pen: boolean;
  };
  currentTool: string;
  canvas: {
    canvas: HTMLCanvasElement | null;
    canvasWidth: number;
    ctxDraw: CanvasRenderingContext2D | null;
    ctxView: CanvasRenderingContext2D | null;
    sizeRect: number;
    sizeCanvas: number;
  };
  colors: {
    primary: string;
    secondary: string;
  };
  preview: {
    currentFps: number;
    ctxPreview: CanvasRenderingContext2D | null;
  };
}

export const store = createStore<IStore>({
  state: {
    frames: {
      framesData: [],
      frameWidth: 0,
      currentFrame: 0,
      ctxFrame: null,
    },
    tools: [
      {
        name: Tool.pen,
        icon: 'pen',
        shortcut: 'P',
      },
      {
        name: Tool.paintBucket,
        icon: 'fill-drip',
        shortcut: 'B',
      },
      {
        name: Tool.sameColor,
        icon: 'palette',
        shortcut: 'A',
      },
      {
        name: Tool.colorPicker,
        icon: 'eye-dropper',
        shortcut: 'O',
      },
      {
        name: Tool.eraser,
        icon: 'eraser',
        shortcut: 'E',
      },
      {
        name: Tool.line,
        icon: 'slash',
        shortcut: 'L',
      },
      {
        name: Tool.rectangle,
        icon: 'vector-square',
        shortcut: 'R',
      },
      {
        name: Tool.circle,
        icon: ['far', 'circle'],
        shortcut: 'C',
      },
      {
        name: Tool.dithering,
        icon: ['fab', 'delicious'],
        shortcut: 'T',
      },
      {
        name: Tool.lighten,
        icon: 'adjust',
        shortcut: 'U',
      },
    ],
    toolsIsActive: {
      pen: false,
    },
    currentTool: 'pen',
    canvas: {
      canvas: null,
      canvasWidth: 0,
      ctxDraw: null,
      ctxView: null,
      sizeRect: 0,
      sizeCanvas: 32,
    },
    colors: {
      primary: 'rgb(32, 32, 32)',
      secondary: 'rgb(224, 224, 224)',
    },
    preview: {
      currentFps: 1,
      ctxPreview: null,
    },
  },
  mutations: {},
  actions: {},
});

export const useStore = (): Store<IStore> => {
  return baseUseStore(key);
};
