import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const myEmail = import.meta.env.VITE_MY_EMAIL;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sent, setSent] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio";
        if (!formData.email.trim()) {
            newErrors.email = "El correo es obligatorio";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Correo no válido";
        }
        if (!formData.message.trim()) newErrors.message = "Por favor escribe tu mensaje";
        if (formData.message.length < 10) newErrors.message = "El mensaje es muy corto (mínimo 10 caracteres)";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        
        setIsSubmitting(true);
        
        try {
            const emailData = {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
                to_email: myEmail,
                date: new Date().toLocaleString('es-ES', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                reply_link: `mailto:${formData.email}?subject=Respuesta a tu mensaje&body=Hola ${encodeURIComponent(formData.name)},%0A%0A`
            };

            await emailjs.send(serviceID, templateID, emailData, publicKey);
            
            setSent(true);
            setFormData({ name: "", email: "", message: "" });
            setTimeout(() => setSent(false), 5000);
        } catch (error) {
            console.error("Error al enviar el mensaje:", error);
            setErrors({ submit: "Error al enviar. Intenta nuevamente." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-green-500 mb-8">Contáctame</h2>
            
            {sent && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                    ¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.
                </div>
            )}
            
            {errors.submit && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    {errors.submit}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                        placeholder="Tu nombre completo"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                        placeholder="tu@email.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                        Mensaje
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                        placeholder="Escribe tu mensaje aquí (mínimo 10 caracteres)..."
                    ></textarea>
                    {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition duration-200 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Enviando...
                            </span>
                        ) : 'Enviar Mensaje'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Contact;