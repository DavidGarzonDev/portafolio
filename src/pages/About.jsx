import React from 'react';
import MiFoto from "../assets/mi-foto.png";

const About = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-5">
            <div className="flex flex-col md:flex-row items-center gap-6 max-w-5xl w-full">
                {/* Foto */}
                <div className="relative">
                    <div className="w-60 h-32 md:w-100 md:h-10 rounded-full flex items-center justify-center mb-5">
                        <img
                            src={MiFoto}
                            alt="Mi foto"
                            className="w-60 h-60 md:w-80 md:h-80 rounded-full object-cover"
                        />
                    </div>
                </div>

                {/* Texto */}
                <div className="text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold">
                        <span className="text-green-400">¡Hola!, soy</span> 
                    </h2>
                    <h1 className="text-4xl md:text-6xl font-bold mt-2">
                        Desarrollador de software
                    </h1>
                    <p className="mt-4 text-lg">
                        Me llamo David Garzon y soy
                        <span className="text-green-400"> Junior Fullstack</span>
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
                            className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                viewBox="0 0 24 24"
                                fill="white"
                            >
                                <path d="M12 0.297c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.8 8.207 11.385.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.84 1.239 1.84 1.239 1.07 1.834 2.809 1.304 3.495.997.108-.775.419-1.305.762-1.605-2.665-.304-5.466-1.333-5.466-5.931 0-1.31.469-2.381 1.235-3.22-.123-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.267 1.983-.399 3.002-.404 1.018.005 2.044.137 3.002.404 2.292-1.552 3.297-1.23 3.297-1.23.654 1.653.241 2.873.118 3.176.768.839 1.235 1.91 1.235 3.22 0 4.609-2.805 5.625-5.476 5.922.43.372.823 1.103.823 2.222v3.293c0 .319.192.694.8.577 4.767-1.586 8.2-6.082 8.2-11.385 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/davidgarzondev/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-600 p-2 rounded-lg hover:bg-blue-500 transition"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                viewBox="0 0 24 24"
                                fill="white"
                            >
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 20h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.792-1.75-1.768s.784-1.75 1.75-1.75c.969 0 1.75.782 1.75 1.75s-.781 1.768-1.75 1.768zm13.5 12.268h-3v-5.604c0-3.262-3.916-3.012-3.916 0v5.604h-3v-11h3v1.707c1.396-2.586 7-2.777 7 2.476v6.817z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;