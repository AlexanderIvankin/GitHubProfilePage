import React from 'react';
import Button from '../../components/common/Button/Button';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Главная страница</h1>
      <Button onClick={() => alert('Привет!')}>
        Нажми меня
      </Button>
    </div>
  );
};

export default HomePage;
