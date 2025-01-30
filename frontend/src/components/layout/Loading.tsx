import styles from "./Loading.module.css";

export default function Loading(): JSX.Element {
  return (
    <div className={styles.Robot}>
      <div className={styles.Ear} />
      <div className={styles.Neck}>
        <div className={styles.NeckDivision} />
      </div>
      <div className={styles.Head}>
        <div className={styles.Forehead}>
          <div className={styles.Dots} />
          <div className={styles.Lines} />
          <div className={styles.Dots} />
        </div>
        <div className={styles.Eyes}>
          <div className={styles.Eye}>
            <div className={styles.Iris} />
          </div>
          <div className={styles.Eye}>
            <div className={styles.Iris} />
          </div>
        </div>
        <div className={styles.Mouth} />
        <div className={styles.Lines} />
      </div>
    </div>
  );
}
