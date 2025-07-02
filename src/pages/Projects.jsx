import React from 'react';
import ProjectCard from '../components/Projectcard';
import Pulmones from "../assets/pulmones.png";
import TuRifa from "../assets/rifa.png";

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