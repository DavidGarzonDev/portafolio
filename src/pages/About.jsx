import React from 'react';
import MiFoto from "../assets/mi-foto.png";

import GithubIcon from "../assets/github-icon.png";
import LinkedinIcon from "../assets/linkedln-icon.png";

const About = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-5">
            <div className="flex flex-col md:flex-row items-center gap-6 max-w-5xl w-full">

                {/* Foto */}
                <div className="relative w-60 md:w-200 flex items-center justify-center ">
                    {/* Fondo difuminado */}
                    <div className="absolute inset-0 bg-green-400 rounded-full blur-3xl opacity-20 z-0" />

                    {/* Imagen encima */}
                    <img
                        src={MiFoto}
                        alt="Mi foto"
                        className="relative z-10 w-100 md:w-90  rounded-full object-cover"
                    />
                </div>


                {/* Texto */}
                <div className="text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold">
                        <span className="text-green-400">¡Hola!, soy David Garzón</span>
                    </h2>
                    <h1 className="text-4xl md:text-6xl font-bold mt-2">
                        Desarrollador Fullstack Junior
                    </h1>
                    <p className="mt-4 text-lg text-gray-300">
                        Tecnólogo en Desarrollo de Software en formación por la Universidad del Valle, con enfoque en el desarrollo Front-End.
                    </p>
                    <p className="mt-2 text-lg text-gray-300">
                        Trabajo con <span className="font-medium text-white">React, JavaScript y PostgreSQL</span>, aplicando buenas prácticas con Git y GitHub bajo metodologías ágiles como Scrum.
                    </p >

                    <p className="mt-2 text-lg text-gray-300">
                        Me apasiona construir soluciones simples, eficientes y centradas en el usuario.
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
