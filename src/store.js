import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
    },
  },
  mutations: {

  },
  actions: {

  },
});
