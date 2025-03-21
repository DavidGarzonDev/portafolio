import React from 'react'
import "../styles/Projects.css"
import ProjectCard from '../components/Projectcard'
import portafolioImg from "../assets/portafolio.jpg";

const Projects = () => {
    return (
        <main className="projects">
            <h2>Mis Proyectos</h2>
            <p>Aquí mostraré los proyectos en los que estoy trabajando.</p>
            <ProjectCard
                title="Mi portafolio"
                description="Una aplicación web increíble para mostrar mis proyectos"
                image={portafolioImg}
                link="https://github.com/tu-repositorio"
            />

            
        </main>
    )
}

export default Projects