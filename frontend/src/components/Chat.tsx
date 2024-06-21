import React, { useState } from 'react';
import axios from 'axios';
import styles from './Chat.module.css';
import { VscDebug } from "react-icons/vsc";
import { PiBroom } from "react-icons/pi";
import Loading from './Loading';

export default function Chat() {
  const [code, setCode] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const place = "#include<stdio.h>\n\nvoid main() {\n\tprintf(\"Insira seu código aqui\");\n}"

  const sendCode = async () => {
    try {
      let background = document.querySelector(`.${styles.Chat}`);
      background?.classList.add(styles.Dimmed);
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/send-code', { code });
      setResponse(res.data.response);
      setLoading(false);
      background?.classList.remove(styles.Dimmed);
      setIsVisible(true);
    } catch (error) {
      console.error('Erro ao processar o código', error);
      setResponse('Erro ao processar o código');
    }
  };

  const clearCode = () => {
    try {
      setCode('')
    } catch (error) {
      console.error('Erro ao processar o código', error);
      setResponse('Erro ao processar o código');
    }
  };

  return (
    <>
      <div className={ styles.Chat }>
        <div className={ styles.UserArea }>
          <h1 className={ styles.Title }>Insira seu código abaixo</h1>
          <textarea
            className={ styles.UserEntry }
            value={ code }
            onChange={(e) => setCode(e.target.value)}
            placeholder={ place }
            rows={1}
            cols={1}
            />
          <div className={ styles.ButtonsArea }>
            <button className={ styles.Buttons } onClick={ sendCode }><VscDebug size={25}/></button>
            <button className={ styles.Buttons } onClick={ clearCode }><PiBroom size={25}/></button>
          </div>
        </div>
        {isVisible && (
          <div className={ styles.ResponseArea }>
            <h1 className={ styles.Title }>Resultado da análise</h1>
            <pre className={ styles.ResponseText }>{ response }</pre>
          </div>
        )}
      </div>
      { loading && (
        <Loading />
      )}
    </>
  );
};
