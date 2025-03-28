import React from 'react'
import ProjectCard from '../components/Projectcard'


const Projects = () => {
    return (
        <main className="projects flex">
            <h2>Mis Proyectos</h2>
            <ProjectCard
                title="Mi portafolio"
                description="El proyecto que estas viendo ahora"
                link="https://github.com/tu-repositorio"
            />

            
        </main>
    )
}

export default Projects