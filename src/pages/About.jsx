import React from 'react';
import MiFoto from "../assets/mi-foto.png";

const About = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-6 pt-28 pb-12">
            <div className="flex flex-col md:flex-row items-center gap-10 max-w-5xl w-full">

                {/* Foto */}
                <div className="relative w-60 md:w-200 flex items-center justify-center ">
                    {/* Fondo difuminado */}
                    <div className="absolute inset-0 bg-white rounded-full blur-3xl opacity-20 z-0" />

                    {/* Imagen encima */}
                    <img
                        src={MiFoto}
                        alt="Mi foto"
                        className="relative z-10 w-100 md:w-90  rounded-full object-cover"
                    />
                </div>


                {/* Texto */}
                <div className="text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                        <span className="text-white">¡Hola!, soy David Garzón</span>
                    </h2>
                    <h1 className="text-4xl md:text-6xl font-semibold mt-2 leading-tight">
                        Desarrollador Backend con visión Fullstack
                    </h1>
                    <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                        <span className="px-3 py-1 rounded-full border border-white/30 text-sm text-gray-200">Node.js</span>
                        <span className="px-3 py-1 rounded-full border border-white/30 text-sm text-gray-200">APIs REST</span>
                        <span className="px-3 py-1 rounded-full border border-white/30 text-sm text-gray-200">PostgreSQL</span>
                    </div>
                    <p className="mt-4 text-lg text-gray-300">
                        Tecnólogo en Desarrollo de Software en formación por la Universidad del Valle, enfocado en construir servicios robustos, escalables y bien documentados.
                    </p>
                    <p className="mt-2 text-lg text-gray-300">
                        Trabajo con <span className="font-medium text-white">Node.js, bases de datos relacionales y arquitectura por capas</span>, sin dejar de cuidar la experiencia en interfaces.
                    </p >

                    <p className="mt-2 text-lg text-gray-300">
                        Me apasiona construir soluciones simples, eficientes y centradas en el usuario.
                    </p>

                    {/* Iconos de Redes Sociales */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-8">
                        <a
                            href="https://github.com/DavidGarzonDev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://www.linkedin.com/in/davidgarzondev/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="/Cv/cv-h.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-white text-black hover:bg-gray-200 transition-all rounded-full"
                        >
                            Descargar CV
                        </a>

                    </div>
                    <div className="flex gap-3 mt-6 justify-center md:justify-start">
                        <a href="#projects" className="px-5 py-2 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition-all">Ver proyectos</a>
                        <a href="#contact" className="px-5 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all">Hablemos</a>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default About;
