import React from 'react';
import Chat from './components/Chat';

const App: React.FC = () => {
  return (
    <>
      <h1>Code Sentinel</h1>
      <div className="App">
        <Chat />
      </div>
    </>
  );
};

export default App;
