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

      <div className="font-poppins">
        
        <Header/>

        {/* Secciones con los componentes */}
        <section id="about" className="min-h-screen flex items-center justify-center">
          <About />
        </section>

        <section id="projects" className="min-h-screen flex items-center justify-center">
          <Projects />
        </section>

        <section id="contact" className="min-h-screen flex items-center justify-center">
          <Contact />
        </section>

        <Footer/>
      </div>
      </>
  )
}

export default App