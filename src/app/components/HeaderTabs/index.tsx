import React from "react";
import styles from "./styles.module.scss";

type tabsType = "text" | "images";

interface Props {
  currentTab: tabsType;
  setView: (view: string) => void;
}

export const HeaderTabs: React.FC<Props> = (props) => {
  const [currentTab, setCurrentTab] = React.useState(props.currentTab);

  const handleTabChange = (tab: tabsType) => {
    setCurrentTab(tab);
    props.setView(tab);
  };

  return (
    <section className={styles.tabs}>
      <button
        className={`${styles.tab} ${currentTab === "text" && styles.active}`}
        onClick={() => {
          handleTabChange("text");
        }}
      >
        <span className={styles.tabText}>Text</span>
      </button>
      <button
        className={`${styles.tab} ${currentTab === "images" && styles.active}`}
        onClick={() => {
          handleTabChange("images");
        }}
      >
        <span className={styles.tabText}>Images</span>
      </button>
    </section>
  );
};
