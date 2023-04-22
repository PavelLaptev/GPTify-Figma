export const getImageNodes = async () => {
  parent.postMessage({ pluginMessage: { type: "get-imagenodes" } }, "*");
};
