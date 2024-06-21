import React, { useState } from 'react';
import axios from 'axios';
import styles from './Chat.module.css';

export default function Chat() {
  const [code, setCode] = useState('');
  const [response, setResponse] = useState('');
  const place = "#include<stdio.h>\n\nvoid main() {\n\tprintf(\"Insira seu código aqui\");\n}"

  const sendCode = async () => {
    try {
      setResponse("Analisando código...")
      const res = await axios.post('http://localhost:5000/api/send-code', { code });
      setResponse(res.data.response);
    } catch (error) {
      console.error('Erro ao processar o código', error);
      setResponse('Erro ao processar o código');
    }
  };

  return (
    <div className={ styles.Chat }>
      <div className={ styles.UserArea }>
        <h1 className={ styles.Title }>Entrada</h1>
        <textarea
          className={ styles.UserEntry }
          value={ code }
          onChange={(e) => setCode(e.target.value)}
          placeholder={ place }
          rows={10}
          cols={50}
        />
        <br/>
        <button className={ styles.SendButton } onClick={ sendCode }>Verificar</button>
      </div>
      <div className={ styles.ResponseArea }>
        <h2 className={ styles.Title }>Resposta</h2>
        <pre className={ styles.ResponseText }>{ response }</pre>
      </div>
    </div>
  );
};
