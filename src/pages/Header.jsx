import React from 'react';

const Header = () => {
    return (
        <header className="fixed top-0 left-0 w-full bg-black/40 backdrop-blur-xl z-50 py-0 border-b border-white/10">
            <nav className="w-full max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
                <a href="#about" className="text-white font-bold tracking-[0.2em] text-sm md:text-base">
                    DG<span className="text-gray-400">.DEV</span>
                </a>
                <ul className="flex justify-center gap-6 md:gap-12">
                    {[
                        { id: 'about', text: 'Sobre mí' },
                        { id: 'projects', text: 'Proyectos' },
                        { id: 'contact', text: 'Contacto' }
                    ].map((item) => (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                className="relative text-gray-300 hover:text-white text-base md:text-lg font-semibold transition-colors duration-300
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
