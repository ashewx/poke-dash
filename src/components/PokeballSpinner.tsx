import styles from "./pokeballspinner.module.css";

const PokeballSpinner: React.FC = () => {
  return (
    <div className={styles["pokeball-container"]}>
      <div className={styles["pokeball"]}>
        <div className={styles["top-half"]}></div>
        <div className={styles["bottom-half"]}></div>
        <div className={styles["middle-line"]}></div>
        <div className={styles["button"]}></div>
      </div>
    </div>
  );
};

export default PokeballSpinner;