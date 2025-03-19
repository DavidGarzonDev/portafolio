import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className="header">
            <h1 className="title">Juan David</h1>
            <nav>
                <ul className="nav-links">
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/about">Sobre mí</Link></li>
                    <li><Link to="/projects">Proyectos</Link></li>
                    <li><Link to= "/contact">Contacto</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header