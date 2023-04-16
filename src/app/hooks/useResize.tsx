import React from "react";

export const useResize = (
  parentRef: React.RefObject<HTMLElement>,
  view: viewsType
) => {
  React.useEffect(() => {
    if (!parentRef.current) return;

    const paddings = 40;

    // get height of the first element
    const height = parentRef.current.children[0].clientHeight + paddings;

    // console.log("height", height);

    // send to figma controller
    parent.postMessage(
      {
        pluginMessage: {
          type: "resize",
          height,
        },
      },
      "*"
    );
  }, [parentRef.current, view]);
};
