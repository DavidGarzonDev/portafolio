import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className="fixed top-0 left-0 w-full bg-gray-900 text-white p-4 shadow-md z-50">
            <nav className="fixed top-0 w-full bg-white shadow-md p-4">
                <ul className="flex space-x-4 justify-center">
                    <li><a href="#about" className="text-gray-400">Sobre mí</a></li>
                    <li><a href="#projects" className="text-gray-400">Proyectos</a></li>
                    <li><a href="#contact" className="text-gray-400">Contacto</a></li>
                </ul>
            </nav>
        </header>

    )
}

export default Header