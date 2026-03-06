import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/styles/global.css';

console.log('🚀 index.jsx: начало выполнения');

try {
  const rootElement = document.getElementById('root');
  console.log('📍 root элемент:', rootElement);
  
  const root = ReactDOM.createRoot(rootElement);
  console.log('✅ Root создан');
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('✅ App отрендерен');
} catch (error) {
  console.error('❌ Ошибка рендеринга:', error);
}