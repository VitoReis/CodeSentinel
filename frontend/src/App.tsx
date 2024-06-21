import React from 'react';
import Chat from './components/Chat';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <>
      <Header/>
      <div className="App">
        <Chat />
      </div>
    </>
  );
};

export default App;
