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
        {/* Barra de navegación con enlaces a cada sección */}
        <nav className="fixed top-0 w-full bg-white shadow-md p-4">
          <ul className="flex space-x-4 justify-center">
            <li><a href="#about" className="text-blue-500">Sobre mí</a></li>
            <li><a href="#projects" className="text-blue-500">Proyectos</a></li>
            <li><a href="#contact" className="text-blue-500">Contacto</a></li>
          </ul>
        </nav>

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
      </div>
      </>
  )
}

export default App