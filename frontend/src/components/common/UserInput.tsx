import { ChangeEventHandler, RefObject } from "react";
import styles from "./UserInput.module.css";

interface UserInputProps {
  action: ChangeEventHandler<HTMLTextAreaElement>;
  code: string;
  reference: RefObject<HTMLTextAreaElement>;
}

export default function UserInput(props: UserInputProps): JSX.Element {
  return (
    <textarea
      className={styles.UserEntry}
      ref={props.reference}
      value={props.code}
      onChange={props.action}
      placeholder={
        '#include<stdio.h>\n\nvoid main() {\n  printf("Insira seu código aqui");\n}'
      }
      rows={1}
      cols={1}
      spellCheck="false"
    />
  );
}
