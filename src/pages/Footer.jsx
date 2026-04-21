import React from "react";

const Footer = () => {
    return (
        <footer className="text-gray-300 p-6 text-center w-full border-t border-white/10 bg-black/30 backdrop-blur-md">
            <p>© {new Date().getFullYear()} David Garzón - Todos los derechos reservados</p>
            <p className="text-sm text-gray-500 mt-1">Hecho con React + Vite</p>
        </footer>
    );
};

export default Footer;
