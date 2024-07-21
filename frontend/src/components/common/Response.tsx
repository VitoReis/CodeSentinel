import styles from "./Response.module.css";

interface ResponseProps {
  reply: string;
}

export default function Response(props: ResponseProps): JSX.Element {
  return (
    <div className={styles.ResponseArea}>
      <h1 className={styles.Title}>Resultado da análise</h1>
      <pre className={styles.ResponseText}>{props.reply}</pre>
    </div>
  );
}
