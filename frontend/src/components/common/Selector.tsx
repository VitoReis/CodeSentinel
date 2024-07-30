import { ChangeEventHandler, ReactNode, RefObject } from "react";
import styles from "./Selector.module.css";

interface SelectorProps {
  action: ChangeEventHandler<HTMLSelectElement>;
  reference: RefObject<HTMLSelectElement>;
  children: ReactNode;
  list: string[];
}

export default function Selector(props: SelectorProps): JSX.Element {
  return (
    <div className={styles.ModelArea}>
      {props.children}
      <select
        className={styles.ModelSelector}
        ref={props.reference}
        onChange={props.action}
      >
        {props.list.map((item) => (
          <option value={item}>{item}</option>
        ))}
      </select>
    </div>
  );
}
