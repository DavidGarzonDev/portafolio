import React from "react";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaPython, FaGitAlt } from "react-icons/fa";
import { SiTypescript, SiPostgresql } from "react-icons/si";

const techIcons = [
    { icon: <FaHtml5 className="text-orange-500" />, name: "HTML" },
    { icon: <FaCss3Alt className="text-blue-500" />, name: "CSS" },
    { icon: <FaJsSquare className="text-yellow-400" />, name: "JavaScript" },
    { icon: <FaReact className="text-cyan-400" />, name: "React" },
    { icon: <FaNodeJs className="text-green-500" />, name: "Node.js" },
    { icon: <FaPython className="text-blue-300" />, name: "Python" },
    { icon: <SiTypescript className="text-blue-600" />, name: "TypeScript" },
    { icon: <SiPostgresql className="text-indigo-500" />, name: "PostgreSQL" },
    { icon: <FaGitAlt className="text-orange-600" />, name: "Git" },
];

export const TechSlider = () => {
    return (
        <section className=" bg-gradient-to-b flex flex-col items-center py-16">
            {/* Título */}
            <div className="flex items-center justify-center mb-20 gap-4">
                
                <h2 className="text-4xl md:text-5xl font-bold text-center">Habilidades Técnicas</h2>
            </div>

            {/* Carrusel */}
            <div className="overflow-hidden w-full max-w-6xl px-5">
                <div className="flex animate-slide whitespace-nowrap items-center">
                    {techIcons.concat(techIcons).map((tech, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center mx-10 text-5xl md:text-6xl"
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
