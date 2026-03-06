import React from 'react';

console.log('📁 App.js загружен');

function App() {
  console.log('🔥 App компонент выполняется');
  
  return React.createElement('div', { 
    style: { 
      color: 'white',
      background: '#2196F3',
      padding: '50px',
      textAlign: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, [
    React.createElement('h1', { key: 'title', style: { fontSize: '48px' } }, '✅ React работает!'),
    React.createElement('p', { key: 'version', style: { fontSize: '24px' } }, `Версия React: ${React.version}`),
    React.createElement('p', { key: 'time', style: { fontSize: '18px', opacity: 0.8 } }, `Время: ${new Date().toLocaleString()}`)
  ]);
}

export default App;