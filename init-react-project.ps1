# init-react.ps1
Write-Host "🚀 Создаем React проект..." -ForegroundColor Cyan
Write-Host ""

function Create-Directory {
    param([string]$Path)
    if (-not (Test-Path $Path)) {
        New-Item -ItemType Directory -Force -Path $Path | Out-Null
        Write-Host "  📁 Создана папка: $Path" -ForegroundColor Green
    }
}

function Create-File {
    param([string]$Path, [string]$Content)
    if (-not (Test-Path $Path)) {
        Set-Content -Path $Path -Value $Content -Encoding UTF8
        Write-Host "  📄 Создан файл: $Path" -ForegroundColor Green
    }
}

# Создаем структуру папок
Write-Host "📂 Создаем папки..." -ForegroundColor Yellow
Create-Directory "public"
Create-Directory "public/images"
Create-Directory "src"
Create-Directory "src/assets"
Create-Directory "src/assets/images"
Create-Directory "src/assets/styles"
Create-Directory "src/components"
Create-Directory "src/components/common"
Create-Directory "src/components/layout"
Create-Directory "src/pages"
Create-Directory "src/hooks"
Create-Directory "src/utils"
Create-Directory "src/services"

# Создаем папки для компонентов
Create-Directory "src/components/common/Button"
Create-Directory "src/pages/HomePage"

Write-Host ""
Write-Host "📝 Создаем файлы..." -ForegroundColor Yellow

# public/index.html
Create-File "public/index.html" @'
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="/images/favicon.ico" type="image/x-icon" sizes="96x96" />
    <title>GitHub Profile</title>
</head>

<body>
    <div id="root"></div>
</body>

</html>
'@

# public/images/README.txt
Create-File "public/images/README.txt" @'
Сюда кладите статические изображения:
- favicon.ico
- logo.png (для шапки сайта)
- og-image.jpg (для соцсетей)

Использование: <img src="/images/имя_файла">
'@

# src/index.jsx - точка входа
Create-File "src/index.jsx" @'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
'@

# src/App.jsx - главный компонент (рядом с index.jsx)
Create-File "src/App.jsx" @'
import React from 'react';
import './App.css';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <div className="app">
      <HomePage />
    </div>
  );
}

export default App;
'@

# src/App.css - стили для App (рядом с App.jsx)
Create-File "src/App.css" @'
.app {
  min-height: 100vh;
  background-color: #f5f5f5;
}
'@

# src/assets/styles/global.css - глобальные стили
Create-File "src/assets/styles/global.css" @'
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
}
'@

# src/components/common/Button/Button.jsx
Create-File "src/components/common/Button/Button.jsx" @'
import React from 'react';
import './Button.css';

const Button = ({ children, onClick, variant = 'primary' }) => {
  return (
    <button 
      className={`button button-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
'@

# src/components/common/Button/Button.css
Create-File "src/components/common/Button/Button.css" @'
.button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.button-primary {
  background-color: var(--primary-color);
  color: white;
}

.button-primary:hover {
  background-color: #0056b3;
}
'@

# src/pages/HomePage/HomePage.jsx
Create-File "src/pages/HomePage/HomePage.jsx" @'
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
'@

# src/pages/HomePage/HomePage.css
Create-File "src/pages/HomePage/HomePage.css" @'
.home-page {
  padding: 2rem;
  text-align: center;
}

.home-page h1 {
  color: #333;
  margin-bottom: 2rem;
}
'@

# webpack.config.js
Create-File "webpack.config.js" @'
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    port: 3000,
    open: true,
    hot: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
'@

# .babelrc
Create-File ".babelrc" @'
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ]
}
'@

# .gitignore
Create-File ".gitignore" @'
node_modules/
dist/
.DS_Store
.env
*.log
.vscode/
.idea/
'@

# package.json (если нет)
if (-not (Test-Path "package.json")) {
    Create-File "package.json" @'
{
  "name": "react-app",
  "version": "1.0.0",
  "scripts": {
    "start": "webpack serve --mode development",
    "build": "webpack --mode production"
  }
}
'@
}

# README.md
Create-File "README.md" @'
# React приложение

## Структура проекта
- `/public` - статические файлы
- `/src` - исходный код
  - `/App` - корневой компонент со своим CSS
  - `/components` - переиспользуемые компоненты
    - каждый компонент в своей папке с CSS
  - `/pages` - страницы приложения
    - каждая страница в своей папке с CSS
  - `/assets/styles` - глобальные стили
  - `/hooks` - кастомные хуки
  - `/utils` - вспомогательные функции

## Команды
- `npm start` - запуск в режиме разработки
- `npm run build` - сборка для production
'@

# Финальное сообщение
Write-Host ""
Write-Host "✅ Готово!" -ForegroundColor Green
Write-Host ""
Write-Host "📁 Важная структура:" -ForegroundColor Yellow
Write-Host "  src/App/" -ForegroundColor White
Write-Host "    ├── App.jsx" -ForegroundColor White
Write-Host "    └── App.css        👈 CSS рядом с компонентом" -ForegroundColor White
Write-Host "  src/components/common/Button/" -ForegroundColor White
Write-Host "    ├── Button.jsx" -ForegroundColor White
Write-Host "    └── Button.css     👈 CSS рядом с компонентом" -ForegroundColor White
Write-Host "  src/pages/HomePage/" -ForegroundColor White
Write-Host "    ├── HomePage.jsx" -ForegroundColor White
Write-Host "    └── HomePage.css   👈 CSS рядом с компонентом" -ForegroundColor White
Write-Host ""
Write-Host "📦 Установите зависимости:" -ForegroundColor Yellow
Write-Host "  npm install react react-dom" -ForegroundColor White
Write-Host "  npm install --save-dev webpack webpack-cli webpack-dev-server babel-loader @babel/core @babel/preset-env @babel/preset-react html-webpack-plugin css-loader style-loader" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Запуск:" -ForegroundColor Yellow
Write-Host "  npm start" -ForegroundColor White