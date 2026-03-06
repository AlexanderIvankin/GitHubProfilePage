import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/styles/global.css';
import './debug'; // Добавьте эту строку

console.log('🚀 index.jsx: начало выполнения');
console.log('📦 React импортирован:', !!React);
console.log('📦 ReactDOM импортирован:', !!ReactDOM);

try {
  const rootElement = document.getElementById('root');
  console.log('📍 root элемент:', rootElement);
  
  if (!rootElement) {
    throw new Error('Root элемент не найден!');
  }

  const root = ReactDOM.createRoot(rootElement);
  console.log('✅ Root создан');
  
  console.log('🎨 Рендерим App...');
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('✅ App отрендерен');
} catch (error) {
  console.error('❌ КРИТИЧЕСКАЯ ОШИБКА:', error);
  document.body.innerHTML = `<div style="color: red; padding: 20px;">
    <h1>Ошибка загрузки приложения</h1>
    <pre>${error.stack}</pre>
  </div>`;
}