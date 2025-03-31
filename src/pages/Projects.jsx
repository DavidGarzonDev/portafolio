import React from 'react';
import ProjectCard from '../components/Projectcard';
import Pulmones from "../assets/pulmones.png";

const Projects = () => {
    return (
        <main className="min-h-screen bg-gradient-to-b  flex flex-col items-center py-16">
            {/* Título */}
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                Mis Proyectos
            </h2>

            {/* Sección de Tarjetas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full px-5">
                <ProjectCard
                    title="Mi portafolio"
                    description="El proyecto que estás viendo ahora"
                    githubLink="https://github.com/DavidGarzonDev/mi-portafolio" // Reemplaza con el enlace real
                    image=""
                    technologies={["React + vite", "Javascript", "TailwindCSS"]}
                />
                <ProjectCard
                    image={Pulmones}
                    title="ExploraPulmones 3D – Aprendizaje Interactivo sobre la Salud Pulmonar"
                    description="Es una aplicación web interactiva que enseña sobre la anatomía pulmonar y enfermedades respiratorias mediante un modelo 3D. Este proyecto destaca mis habilidades en desarrollo web 3D e interactividad. 🚀"
                    githubLink="https://github.com/DavidGarzonDev/proyecto-web-3d"
                    vercelLink="https://proyecto-web-3d.vercel.app"
                    technologies={["React + vite", "Three.js", "CSS" , "Drei"]}
                />
            </div>
        </main>
    );
};

export default Projects;