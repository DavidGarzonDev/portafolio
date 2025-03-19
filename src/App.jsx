import About from "./pages/About"
import Projects from "./pages/Projects"
import React from 'react'
import Header from "./components/Header"
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Contact from "./pages/Contact"
import { Routes, Route } from 'react-router-dom';
import "./styles/index.css"

  
const App = () => {
  return (
    <>
    
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
      <Footer />
      
      <h1 class="text-3xl font-bold underline">
        Juan david!
      </h1>
      </>
  )
}

export default App