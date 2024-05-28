import styles from "./ResetButton.module.scss";

function ResetButton({ onReset }) {
  return (
    <button className={styles.resetButton} onClick={onReset}>
      Reset
    </button>
  );
}

export default ResetButton;
