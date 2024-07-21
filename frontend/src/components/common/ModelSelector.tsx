import { ChangeEventHandler, ReactNode, RefObject } from "react";
import styles from "./ModelSelector.module.css";

interface ModelSelectorProps {
  action: ChangeEventHandler<HTMLSelectElement>;
  reference: RefObject<HTMLSelectElement>;
  children: ReactNode;
}

export default function ModelSelector(props: ModelSelectorProps): JSX.Element {
  return (
    <div className={styles.ModelArea}>
      {props.children}
      <select
        className={styles.ModelSelector}
        ref={props.reference}
        onChange={props.action}
      >
        <option value="codellama">Codellama</option>
        <option value="llama3">Llama3</option>
        <option value="mistral">Mistral</option>
      </select>
    </div>
  );
}
