import React from "react";

const ProjectCard = ({ title, description, image, link }) => {
    return (
        <div className="flex items-center">
            <div className="card bg-base-100 w-90 shadow-lg">
                {image == "" && (
                    <figure>
                        <img src={image} alt={title} className="object-cover h-48 w-full" />
                    </figure>
                )}
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <p>{description}</p>
                    <div className="card-actions justify-end">
                        <a href={link} target="_blank" rel="noopener noreferrer">
                            <button className="btn btn-primary">Ver Proyecto</button>
                            <button className="btn btn-primary">Ingresar al proyecto</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;