import React from "react";

export const useResize = (depRef: React.RefObject<HTMLElement>) => {
  console.log("depRef", depRef);

  React.useEffect(() => {
    if (!depRef.current) return;

    const paddings = 40;

    // get height of the first element
    const height = depRef.current.children[0].clientHeight + paddings;

    console.log("height", height);

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
  }, [depRef.current]);
};
