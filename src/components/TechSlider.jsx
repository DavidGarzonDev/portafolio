import React from "react";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaPython, FaGitAlt } from "react-icons/fa";
import { SiTypescript, SiPostgresql } from "react-icons/si";

const techIcons = [
    { icon: <FaHtml5 className="text-white" />, name: "HTML" },
    { icon: <FaCss3Alt className="text-gray-300" />, name: "CSS" },
    { icon: <FaJsSquare className="text-gray-200" />, name: "JavaScript" },
    { icon: <FaReact className="text-white" />, name: "React" },
    { icon: <FaNodeJs className="text-gray-300" />, name: "Node.js" },
    { icon: <FaPython className="text-gray-200" />, name: "Python" },
    { icon: <SiTypescript className="text-white" />, name: "TypeScript" },
    { icon: <SiPostgresql className="text-gray-300" />, name: "PostgreSQL" },
    { icon: <FaGitAlt className="text-gray-200" />, name: "Git" },
];

export const TechSlider = () => {
    return (
        <section className="flex flex-col items-center py-16 px-6">
            {/* Título */}
            <div className="flex items-center justify-center mb-12 gap-4">
                
                <h2 className="section-title text-4xl md:text-5xl font-bold text-center">Habilidades Técnicas</h2>
            </div>

            {/* Carrusel */}
            <div className="glass-panel overflow-hidden w-full max-w-6xl px-5 py-8">
                <div className="flex animate-slide whitespace-nowrap items-center">
                    {techIcons.concat(techIcons).map((tech, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center mx-10 text-5xl md:text-6xl hover:scale-110 transition-transform"
                        >
                            {tech.icon}
                            <span className="text-base md:text-lg mt-2">{tech.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
