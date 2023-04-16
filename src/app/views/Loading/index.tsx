import React from "react";
import styles from "./styles.module.scss";

import { frameSize } from "./../../../controller/config";

// Add parent class for sub-components
export const Loading: React.FC = () => {
  return (
    <div
      className={styles.wrap}
      style={{
        height: `${frameSize.height}px`,
      }}
    >
      <div className={styles.spinner} />
    </div>
  );
};
