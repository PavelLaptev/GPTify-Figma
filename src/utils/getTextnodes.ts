export const getTextnodes = async () => {
  parent.postMessage({ pluginMessage: { type: "get-textnodes" } }, "*");
};
