import React from 'react'

const Contact = () => {
    return (
        <div>
            <h2>Contacto</h2>
            <form>
                <label htmlFor="name">Nombre:</label>
                <input type="text" id="name" name="name" required />

                <label htmlFor="email">Correo Electrónico:</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="message">Mensaje:</label>
                <textarea id="message" name="message" required></textarea>

                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default Contact