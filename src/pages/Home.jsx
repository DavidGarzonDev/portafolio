import React from "react";
import "../styles/Home.css"

const Home = () => {
    return (
        <>
            <div className="avatar">
                <div className="w-24 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <main className="home">
                <h2>Bienvenido a mi portafolio</h2>
                <p>Aquí encontrarás mis proyectos y habilidades.</p>

            </main>
        </>
    );
};

export default Home;
