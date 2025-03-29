import React from 'react';
import MiFoto from "../assets/mi-foto.png";


import GithubIcon from "../assets/github-icon.png";
import LinkedinIcon from "../assets/linkedln-icon.png";

const About = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-5">
            <div className="flex flex-col md:flex-row items-center gap-6 max-w-5xl w-full">

                {/* Foto */}
                <div className="relative">
                    <div className="w-60  md:w-80 md: rounded-full flex items-center justify-center">
                        <img
                            src={MiFoto}
                            alt="Mi foto"
                            className="w-90  md:w-80 rounded-full object-cover"
                        />
                    </div>
                </div>

                {/* Texto */}
                <div className="text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold">
                        <span className="text-green-400">¡Hola!, soy David Garzon</span> 
                    </h2>
                    <h1 className="text-4xl md:text-6xl font-bold mt-2">
                        Desarrollador de software
                    </h1>
                    <p className="mt-4 text-lg">
                        Me llamo David Garzon y soy
                        <span className="text-green-400 font-semibold"> Junior Fullstack
                        </span>
                    </p>
                    <p className="mt-2 text-lg">
                        Apasionado por la tecnología y el desarrollo de software. Siempre en busca de aprender, mejorar y crear soluciones innovadoras.
                    </p>

                    {/* Iconos de Redes Sociales */}
                    <div className="flex justify-center md:justify-start gap-4 mt-8">
                        <a
                            href="https://github.com/DavidGarzonDev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-gray-100 rounded-2xl hover:bg-gray-300 transition-all transform hover:scale-110"
                        >
                            <img
                                src={GithubIcon}
                                alt="GitHub"
                                className="w-8 h-8 md:w-10 md:h-10"
                            />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/davidgarzondev/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-blue-600 rounded-2xl hover:bg-blue-500 transition-all transform hover:scale-110"
                        >
                            <img
                                src={LinkedinIcon}
                                alt="LinkedIn"
                                className="w-8 h-8 md:w-10 md:h-10"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;