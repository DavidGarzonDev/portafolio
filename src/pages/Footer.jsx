import React from "react";

const Footer = () => {
    return (
        <footer className="text-gray-400 p-10 text-center w-full">
            <p>© {new Date().getFullYear()} David Garzón - Todos los derechos reservados</p>
            <p className="text-sm text-gray-500 mt-1">Hecho con React + Vite</p>
        </footer>
    );
};

export default Footer;
