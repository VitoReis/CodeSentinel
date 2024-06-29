import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { PiBroom } from "react-icons/pi";
import { VscDebug } from "react-icons/vsc";
import { GiBrain } from "react-icons/gi";
import styles from "./Chat.module.css";
import Loading from "./Loading";

export default function Chat(): JSX.Element {
  const [code, setCode] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const modelRef = useRef<HTMLSelectElement>(null);
  const sendRef = useRef<HTMLButtonElement>(null);
  const clearRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modelRef.current) {
      setModel(modelRef.current.value);
    }
  }, []);

  useEffect(() => {
    if (loading) {
      modelRef.current!.disabled = true;
      sendRef.current!.disabled = true;
      clearRef.current!.disabled = true;
      textRef.current!.disabled = true;
      chatRef.current!.classList.add(`${styles.Unfocused}`);
    } else {
      modelRef.current!.disabled = false;
      sendRef.current!.disabled = false;
      clearRef.current!.disabled = false;
      textRef.current!.disabled = false;
      chatRef.current!.classList.remove(`${styles.Unfocused}`);
    }
  }, [loading]);

  async function sendCode(): Promise<void> {
    if (code !== "") {
      try {
        setLoading(true);
        const res = await axios.post("http://localhost:5000/api/send-code", {
          model,
          code,
        });
        setResponse(res.data.response);
        setIsVisible(true);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setIsVisible(true);
        setResponse("Erro ao processar o código, porfavor tente novamente.");
      }
    }
  }

  return (
    <>
      <div className={styles.Chat} ref={chatRef}>
        <div className={styles.UserArea}>
          <h1 className={styles.Title}>Insira seu código abaixo</h1>
          <textarea
            className={styles.UserEntry}
            ref={textRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={
              "#include<stdio.h>\n\nvoid main() {\n  printf('Insira seu código aqui');\n}"
            }
            rows={1}
            cols={1}
          />
          <div className={styles.ButtonsArea}>
            <div className={styles.ModelArea}>
              <GiBrain size={25} />
              <select
                ref={modelRef}
                className={styles.ModelSelector}
                onChange={(e) => setModel(e.target.value)}
              >
                <option value="codellama">Codellama</option>
                <option value="llama3">Llama3</option>
                <option value="mistral">Mistral</option>
              </select>
            </div>
            <button className={styles.Buttons} ref={sendRef} onClick={sendCode}>
              <VscDebug size={25} />
            </button>
            <button
              className={styles.Buttons}
              ref={clearRef}
              onClick={() => setCode("")}
            >
              <PiBroom size={25} />
            </button>
          </div>
        </div>
        {isVisible && (
          <div className={styles.ResponseArea}>
            <h1 className={styles.Title}>Resultado da análise</h1>
            <pre className={styles.ResponseText}>{response}</pre>
          </div>
        )}
      </div>
      {loading && <Loading />}
    </>
  );
}
