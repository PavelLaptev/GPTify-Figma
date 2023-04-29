export const getImageNodes = async (setIsBusy) => {
  setIsBusy(true);
  parent.postMessage({ pluginMessage: { type: "get-imagenodes" } }, "*");
};
