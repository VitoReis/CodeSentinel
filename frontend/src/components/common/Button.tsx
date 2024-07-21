import styles from "./Button.module.css";
import { MouseEventHandler, ReactNode, RefObject } from "react";

interface ButtonProps {
  action: MouseEventHandler;
  children: ReactNode;
  reference: RefObject<HTMLButtonElement>;
}

export default function Button(props: ButtonProps): JSX.Element {
  return (
    <button
      className={styles.Buttons}
      ref={props.reference}
      onClick={props.action}
    >
      {props.children}
    </button>
  );
}
