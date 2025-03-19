import About from "./pages/About"
import Projects from "./pages/Projects"
import React from 'react'
import Header from "./components/Header"
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { Routes, Route } from 'react-router-dom';

  
const App = () => {
  return (
    <>
    
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects/>} />
      </Routes>
      <Footer/>
      
      </>
  )
}

export default App