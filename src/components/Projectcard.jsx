import React from "react";

const ProjectCard = ({
    title,
    description,
    image,
    githubLink,
    vercelLink,
    technologies = [],
    
}) => {
    return (
        <div className="bg-neutral-900 text-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full border border-gray-700 hover:border-green-400 transition-all hover:scale-105">
            
            {image ? (
                <div className="w-full aspect-video bg-gray-800">
                    <img
                        src={image}
                        alt={title}
                        className="object-cover h-full w-full"
                    />
                </div>
            ) : (
                <div className="p-6 pb-0">
                    <h2 className="text-4xl font-bold mb-2">{title}</h2>
                </div>
            )}

            <div className="flex flex-col flex-grow p-6">
                
                {image && <h2 className="text-3xl font-bold mb-2">{title}</h2>}

                
                <p className="text-gray-300 mb-4 text-lg leading-relaxed"> {/* Texto más grande y espaciado */}
                    {description}
                </p>

                {/* Tecnologías */}
                {technologies.length > 0 && (
                    <div className="mt-auto mb-4">
                        <span className="text-gray-400 block mb-2">Tecnologías:</span>
                        <div className="flex flex-wrap gap-2">
                            {technologies.map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-emerald-900 rounded-full text-sm text-green-300 hover:scale-110 transition-all cursor-pointer"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Botones */}
                <div className="flex justify-end gap-3 mt-4">
                    {githubLink && (
                        <a
                            href={githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all hover:scale-105"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="white"
                            >
                                <path d="M12 0.297c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.8 8.207 11.385.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.84 1.239 1.84 1.239 1.07 1.834 2.809 1.304 3.495.997.108-.775.419-1.305.762-1.605-2.665-.304-5.466-1.333-5.466-5.931 0-1.31.469-2.381 1.235-3.22-.123-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.267 1.983-.399 3.002-.404 1.018.005 2.044.137 3.002.404 2.292-1.552 3.297-1.23 3.297-1.23.654 1.653.241 2.873.118 3.176.768.839 1.235 1.91 1.235 3.22 0 4.609-2.805 5.625-5.476 5.922.43.372.823 1.103.823 2.222v3.293c0 .319.192.694.8.577 4.767-1.586 8.2-6.082 8.2-11.385 0-6.627-5.373-12-12-12z" />
                            </svg>
                            <span>GitHub</span>
                        </a>
                    )}
                    {vercelLink && (
                        <a
                            href={vercelLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-all hover:scale-105"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="white"
                            >
                                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 3.429l7.714 13.371H4.286L12 3.429z" />
                            </svg>
                            <span>Ver Demo</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;