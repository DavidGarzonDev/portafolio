import React from 'react';
import ProjectCard from '../components/Projectcard';
import Pulmones from "../assets/pulmones.png";
import TuRifa from "../assets/rifa.png";

const Projects = () => {
    return (
        <main className="min-h-screen flex flex-col items-center py-16 px-6">
            {/* Título */}
            <h2 className="section-title text-4xl md:text-5xl font-semibold mb-4 text-center">
                Mis Proyectos
            </h2>
            <p className="text-gray-300 text-center max-w-2xl mb-12">
                Proyectos con base técnica sólida: APIs, lógica de negocio clara y experiencias limpias inspiradas en minimalismo iOS.
            </p>

            {/* Sección de Tarjetas */}
            <div className="max-w-4xl w-full">
                <ProjectCard
                    image={Pulmones}
                    title="ExploraPulmones 3D – Aprendizaje Interactivo sobre la Salud Pulmonar"
                    githubLink="https://github.com/DavidGarzonDev/proyecto-web-3d"
                    vercelLink="https://proyecto-web-3d.vercel.app"
                    technologies={["React + vite", "Three.js", "CSS" , "Drei"]}
                />
                <ProjectCard
                    image={TuRifa}
                    title="Tu Rifa – Plataforma web para sorteos digitales"
                    githubLink="https://github.com/DavidGarzonDev/TuRifa"
                    vercelLink="https://tu-rifa-h6e6.vercel.app"
                    technologies={["React + vite", "TailwindCSS", "CSS","Node.js"]}
                />
                <ProjectCard
                    
                    title="K A N J U – Plataforma ecommerce de ropa"
                    githubLink="https://github.com/DavidGarzonDev/kanju"
                    vercelLink="https://kanju.vercel.app"
                    technologies={["React + vite", "TailwindCSS", "CSS","Node.js"]}
                />
            </div>
        </main>
    );
};

export default Projects;
