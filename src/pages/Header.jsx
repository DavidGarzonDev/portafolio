import React from 'react';

const Header = () => {
    return (
        <header className="fixed top-0 left-0 w-full bg-black/60 backdrop-blur-2xl z-50 py-0">
            <nav className="w-full max-w-4xl mx-auto px-4 py-3">
                <ul className="flex justify-center gap-6 md:gap-12">
                    {[
                        { id: 'about', text: 'Sobre mí' },
                        { id: 'projects', text: 'Proyectos' },
                        { id: 'contact', text: 'Contacto' }
                    ].map((item) => (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                className="relative text-gray-300 hover:text-white text-sm md:text-base font-medium transition-colors duration-300
                    after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-1 after:bg-white 
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
