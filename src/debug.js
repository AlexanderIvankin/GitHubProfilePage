// Глобальный отладчик
console.log('🔥 debug.js загружен');

// Отслеживаем выполнение кода
const originalFetch = window.fetch;
window.fetch = function(...args) {
  console.log('📡 fetch:', args[0]);
  return originalFetch.apply(this, args);
};

// Проверяем, что модули загружаются
setTimeout(() => {
  console.log('⏰ Таймер сработал - код выполняется');
  console.log('React в глобальной области:', window.React);
  console.log('Все глобальные переменные:', Object.keys(window).filter(key => 
    key.includes('React') || key.includes('App') || key.includes('Profile')
  ));
}, 1000);