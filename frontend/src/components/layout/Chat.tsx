import { useState, useEffect, useRef } from "react";
import { PiBroom } from "react-icons/pi";
import { VscDebug } from "react-icons/vsc";
import { GiBrain } from "react-icons/gi";
import { sendCode } from "../../services/Communication";
import styles from "./Chat.module.css";
import Loading from "./Loading";
import Response from "../common/Response";
import Button from "../common/Button";
import ModelSelector from "../common/ModelSelector";
import UserInput from "../common/UserInput";

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

  async function handleSend(): Promise<void> {
    if (code !== "") {
      try {
        setLoading(true);
        const reply = await sendCode(model, code);
        setResponse(reply);
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
          <UserInput
            reference={textRef}
            code={code}
            action={(e) => setCode(e.target.value)}
          />
          <div className={styles.ButtonsArea}>
            <ModelSelector
              reference={modelRef}
              action={(e) => setModel(e.target.value)}
            >
              <GiBrain size={25} />
            </ModelSelector>
            <Button reference={sendRef} action={handleSend}>
              <VscDebug size={25} />
            </Button>
            <Button reference={clearRef} action={() => setCode("")}>
              <PiBroom size={25} />
            </Button>
          </div>
        </div>
        {isVisible && <Response reply={response} />}
      </div>
      {loading && <Loading />}
    </>
  );
}
