import './App.css';
import MainHeader from './components/mainHeader/MainHeader';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/mainpage/MainPage';
import DetailPage from './pages/detailPage/DetailPage';
import { Global } from '@emotion/react';
import { Reset } from './style/style';

function App() {
  return (
    <>
      <Global styles={Reset} />
        <MainHeader />
        <Routes>
            <Route path='/' element={<MainPage/>} />
            <Route path='/' element={<DetailPage/>} />
        </Routes>
    </>
  );
}

export default App;
