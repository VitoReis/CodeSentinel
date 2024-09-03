import styles from "./Response.module.css";
import ReactMarkdown from "react-markdown";

interface ResponseProps {
  reply: string;
}

export default function Response(props: ResponseProps): JSX.Element {
  return (
    <div className={styles.ResponseArea}>
      <h1 className={styles.Title}>Resultado da análise</h1>
      <ReactMarkdown className={styles.ResponseText}>
        {props.reply}
      </ReactMarkdown>
    </div>
  );
}
