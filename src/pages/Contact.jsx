import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "../styles/Contact.css";

const Contact = () => {
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [errors, setErrors] = useState({});
    const [sent, setSent] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio.";
        if (!formData.email.includes("@")) newErrors.email = "Correo no válido.";
        if (!formData.message.trim()) newErrors.message = "Mensaje vacío.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            emailjs
                .send(
                    serviceID,
                    templateID,
                    {
                        user_name: formData.name,
                        user_email: formData.email,
                        message: formData.message,
                        to_email: import.meta.env.VITE_MY_EMAIL
                    },
                    publicKey
                )
                .then(() => {
                    setSent(true);
                    setFormData({ name: "", email: "", message: "" });
                    setTimeout(() => setSent(false), 3000);
                })
                .catch((error) => console.error("Error al enviar el mensaje:", error));
        }
    };

    return (
        <div>
            <h2>Contacto</h2>
            {sent && <p style={{ color: "green" }}>Mensaje enviado con éxito!</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nombre:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

                <label htmlFor="email">Correo Electrónico:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

                <label htmlFor="message">Mensaje:</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange}></textarea>
                {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}

                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default Contact;
