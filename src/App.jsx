import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

// Components
import NavBar from './Components/NavBar';
import NewsArea from "./Components/NewsArea";

function App() {
  // My API Key
  const API_KEY = import.meta.env.VITE_API_KEY;

  return (
    <>
      <BrowserRouter>
        <NavBar title='Informed Hub' />
        <Routes>
          <Route exact path='/' element={<NewsArea key='general' category='general' apiKey={API_KEY} />} />
          <Route exact path='/business' element={<NewsArea key='business' category={'business'} apiKey={API_KEY} />} />
          <Route exact path='/entertainment' element={<NewsArea key='entertainment' category={'entertainment'} apiKey={API_KEY} />} />
          <Route exact path='/health' element={<NewsArea key='health' category={'health'} apiKey={API_KEY} />} />
          <Route exact path='/science' element={<NewsArea key='science' category={'science'} apiKey={API_KEY} />} />
          <Route exact path='/sports' element={<NewsArea key='sports' category={'sports'} apiKey={API_KEY} />} />
          <Route exact path='/technology' element={<NewsArea key='technology' category={'technology'} apiKey={API_KEY} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
