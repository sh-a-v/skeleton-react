export let env = {
  isClient() {
    return typeof window !== 'undefined';
  },

  isServer() {
    return !this.isClient();
  }
};

export let GLOBAL_OBJECT = env.isClient() ? window : global;
export let GLOBAL_PARAMS = GLOBAL_OBJECT.GLOBAL_PARAMS ? GLOBAL_OBJECT.GLOBAL_PARAMS : GLOBAL_OBJECT.GLOBAL_PARAMS = {};

export let setGlobalParam = (paramName, paramValue=null) => {
  if (!paramName) {
    return;
  }

  GLOBAL_PARAMS[paramName] = paramValue;
};
