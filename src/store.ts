// import Vue from 'vue';
// import Vuex from 'vuex';
import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { Tools } from './common/interfaces/tools';

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
    currentFrameNum: number;
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
  currentTool: Tools;
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

export type TStore = Store<IStore>;

export const store = createStore<IStore>({
  state: {
    frames: {
      framesData: [],
      frameWidth: 0,
      currentFrameNum: 0,
      ctxFrame: null,
    },
    tools: [
      {
        name: Tools.pen,
        icon: 'pen',
        shortcut: 'P',
      },
      {
        name: Tools.paintBucket,
        icon: 'fill-drip',
        shortcut: 'B',
      },
      {
        name: Tools.sameColor,
        icon: 'palette',
        shortcut: 'A',
      },
      {
        name: Tools.colorPicker,
        icon: 'eye-dropper',
        shortcut: 'O',
      },
      {
        name: Tools.eraser,
        icon: 'eraser',
        shortcut: 'E',
      },
      {
        name: Tools.line,
        icon: 'slash',
        shortcut: 'L',
      },
      {
        name: Tools.rectangle,
        icon: 'vector-square',
        shortcut: 'R',
      },
      {
        name: Tools.circle,
        icon: ['far', 'circle'],
        shortcut: 'C',
      },
      {
        name: Tools.dithering,
        icon: ['fab', 'delicious'],
        shortcut: 'T',
      },
      {
        name: Tools.lighten,
        icon: 'adjust',
        shortcut: 'U',
      },
    ],
    toolsIsActive: {
      pen: false,
    },
    currentTool: Tools.pen,
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

export const useStore = (): TStore => {
  return baseUseStore(key);
};
