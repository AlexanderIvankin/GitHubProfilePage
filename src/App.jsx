import React from 'react';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import './App.css';

function App() {
  console.log('🔥 App компонент выполняется');
  return (
    <div className="app">
      <ProfilePage />
    </div>
  );
}

export default App;