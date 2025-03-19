import React from 'react'
import "../styles/About.css"
import MiFoto from "../assets/mi-foto.png"

const About = () => {
    return (
        <main className="about">
            <div className="avatar">
                <div className="w-80 rounded-full">
                    <img src={MiFoto} alt="Mi foto"/>
                </div>
            </div>
            <h1>Juan David Garzon</h1>
            <h2>Sobre mí</h2>
            <p>¡Hola! Soy Juan David, un desarrollador en formación apasionado por la programación.</p>
        </main>
    )
}

export default About