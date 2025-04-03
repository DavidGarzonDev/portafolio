import React from 'react';

const Header = () => {
    return (
        <header className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-md z-50 py-0 shadow-sm ">
            <nav className="w-full">
                <ul className="flex justify-center space-x-0 md:space-x-15 w-full p-2">
                    {[
                        { id: 'about', text: 'Sobre mí' },
                        { id: 'projects', text: 'Proyectos' },
                        { id: 'contact', text: 'Contacto' }
                    ].map((item) => (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                className="relative text-gray-300 hover:text-white text-xl font-semibold transition-colors duration-300
                    after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-1 after:bg-green-400 
                    after:transition-all after:duration-500 hover:after:w-full"
                            >
                                {item.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;