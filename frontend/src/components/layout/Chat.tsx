import { useState, useEffect, useRef } from "react";
import { PiBroom } from "react-icons/pi";
import { VscDebug } from "react-icons/vsc";
import { GiBrain } from "react-icons/gi";
import { IoLanguage } from "react-icons/io5";
import styles from "./Chat.module.css";
import Loading from "./Loading";
import Response from "../common/Response";
import Button from "../common/Button";
import Selector from "../common/Selector";
import UserInput from "../common/UserInput";
import {
  availableModels,
  availableLanguages,
  sendCode,
} from "../../services/Communications";

export default function Chat(): JSX.Element {
  const [code, setCode] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [modelList, setModelList] = useState<string[]>([]);
  const [language, setLanguage] = useState<string>("");
  const [langList, setLangList] = useState<string[]>([]);
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const modelRef = useRef<HTMLSelectElement>(null);
  const languageRef = useRef<HTMLSelectElement>(null);
  const sendRef = useRef<HTMLButtonElement>(null);
  const clearRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        await getAvailableLanguages();
        if (languageRef.current) {
          setLanguage(languageRef.current.value);
        }

        await getAvailableModels();
        if (modelRef.current) {
          setModel(modelRef.current.value);
        }
      } catch (error) {
        console.error("Failed to initialize", error);
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    if (modelList.length > 0) {
      setModel(modelList[0]);
    }
  }, [modelList]);

  useEffect(() => {
    if (langList.length > 0) {
      setLanguage(langList[0]);
    }
  }, [langList]);

  useEffect(() => {
    if (loading) {
      modelRef.current!.disabled = true;
      languageRef.current!.disabled = true;
      sendRef.current!.disabled = true;
      clearRef.current!.disabled = true;
      textRef.current!.disabled = true;
      chatRef.current!.classList.add(`${styles.Unfocused}`);
    } else {
      modelRef.current!.disabled = false;
      languageRef.current!.disabled = false;
      sendRef.current!.disabled = false;
      clearRef.current!.disabled = false;
      textRef.current!.disabled = false;
      chatRef.current!.classList.remove(`${styles.Unfocused}`);
    }
  }, [loading]);

  async function getAvailableModels() {
    try {
      const list = await availableModels();
      setModelList(list);
    } catch (error) {
      console.error("Failed to fetch model list:", error);
    }
  }

  async function getAvailableLanguages() {
    try {
      const list = await availableLanguages();
      setLangList(list);
    } catch (error) {
      console.error("Failed to fetch model list:", error);
    }
  }

  async function handleSend(): Promise<void> {
    if (code !== "") {
      try {
        setLoading(true);
        const reply = await sendCode(model, code, language);
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
            <Selector
              reference={modelRef}
              action={(e) => setModel(e.target.value)}
              list={modelList}
            >
              <GiBrain size={25} />
            </Selector>
            <Selector
              reference={languageRef}
              action={(e) => setLanguage(e.target.value)}
              list={langList}
            >
              <IoLanguage size={25} />
            </Selector>
            <div className={styles.ActionButtons}>
              <Button reference={sendRef} action={handleSend}>
                <VscDebug size={25} />
              </Button>
              <Button reference={clearRef} action={() => setCode("")}>
                <PiBroom size={25} />
              </Button>
            </div>
          </div>
        </div>
        {isVisible && <Response reply={response} />}
      </div>
      {loading && <Loading />}
    </>
  );
}
