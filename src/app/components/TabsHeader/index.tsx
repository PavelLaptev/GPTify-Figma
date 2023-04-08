import React from "react";
import { Icon } from "..";
import styles from "./styles.module.scss";

type tabsType = "text" | "images";

interface Props {
  currentTab: tabsType;
  onTabChange: (tab: tabsType) => void;
}

export const TabsHeader: React.FC<Props> = (props) => {
  const [currentTab, setCurrentTab] = React.useState(props.currentTab);

  const handleTabChange = (tab: tabsType) => {
    setCurrentTab(tab);
    props.onTabChange(tab);
  };

  return (
    <header className={styles.wrap}>
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
          disabled
          className={`${styles.tab} ${
            currentTab === "images" && styles.active
          }`}
          onClick={() => {
            handleTabChange("images");
          }}
        >
          <span className={styles.tabText}>Images</span>
          <span className={styles.soonLabel}>WIP</span>
        </button>
      </section>
      <button className={styles.icon}>
        <Icon name="settings" />
      </button>
    </header>
  );
};
