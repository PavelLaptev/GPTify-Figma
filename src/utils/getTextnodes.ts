export const getTextnodes = async (setIsBusy) => {
  setIsBusy(true);
  parent.postMessage({ pluginMessage: { type: "get-textnodes" } }, "*");
};
