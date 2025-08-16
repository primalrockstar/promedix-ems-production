import React from 'react';

function App() {
  return (
    <div style={{ 
      backgroundColor: 'green', 
      padding: '50px', 
      fontSize: '30px', 
      color: 'white',
      textAlign: 'center'
    }}>
      ✅ MINIMAL TEST: React is working!
      <br />
      Current time: {new Date().toLocaleString()}
      <br />
      If you see this green screen, React is rendering successfully!
    </div>
  );
}

export default App;
