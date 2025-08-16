import React from 'react';

function App() {
  return (
    <div style={{
      backgroundColor: 'red', 
      color: 'white', 
      padding: '50px', 
      fontSize: '30px',
      minHeight: '100vh'
    }}>
      🚨 MINIMAL TEST - React is working if you see this!
      <br />
      Date: {new Date().toISOString()}
      <br />
      If you see this red message, React is working properly!
    </div>
  );
}

export default App;
