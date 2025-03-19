import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className="fixed top-0 left-0 w-full  bg-opacity-90 backdrop-blur-md shadow-md z-80 h-10 justify-center">
            <nav className="p-4">
                <ul className="flex space-x-8 justify-center">
                    <li><a href="#about" className="hover:text-white transition">Sobre mí</a></li>
                    <li><a href="#projects" className="hover:text-white transition">Proyectos</a></li>
                    <li><a href="#contact" className="hover:text-white transition">Contacto</a></li>
                </ul>
            </nav>
        </header>
    );
}


export default Header