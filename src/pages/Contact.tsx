import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { useForm } from '@/hooks/useForm'
import { validateContactForm } from '@/utils/validation'
import { formatDate, generateMailtoLink } from '@/utils/helpers'
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '@/constants'

const Contact = () => {
  const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  const myEmail = import.meta.env.VITE_MY_EMAIL

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [hasError, setHasError] = useState(false)

  const { values, errors, handleChange, handleBlur, reset } = useForm({
    initialValues: { name: '', email: '', message: '' },
    validate: validateContactForm,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validateContactForm(values)
    if (Object.keys(validationErrors).length > 0) return

    setIsSubmitting(true)
    setHasError(false)

    try {
      await emailjs.send(
        serviceID,
        templateID,
        {
          from_name: values.name,
          from_email: values.email,
          message: values.message,
          to_email: myEmail,
          date: formatDate(),
          reply_link: generateMailtoLink(values.email, 'Respuesta a tu mensaje', `Hola ${values.name},\n\n`),
        },
        publicKey,
      )
      setSent(true)
      reset()
      setTimeout(() => setSent(false), 5000)
    } catch {
      setHasError(true)
      setTimeout(() => setHasError(false), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass = (field: keyof typeof errors) =>
    `w-full px-4 py-3 rounded-lg border ${
      errors[field] ? 'border-red-500/50' : 'border-zinc-800'
    } bg-zinc-900 text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition`

  return (
    <section id="contact" className="min-h-screen flex flex-col items-center justify-center py-24 px-6" aria-labelledby="contact-heading">
      <div className="max-w-xl w-full">
        <p className="text-zinc-600 text-xs tracking-widest uppercase mb-3">Contacto</p>
        <h2 id="contact-heading" className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
          Hablemos
        </h2>
        <p className="text-zinc-500 mb-12">
          ¿Tienes un proyecto o una idea? Escribime y te respondo.
        </p>

        {sent && (
          <div className="mb-6 p-4 bg-white/5 border border-white/10 text-white rounded-lg text-sm" role="alert" aria-live="polite">
            {SUCCESS_MESSAGES.formSent}
          </div>
        )}

        {hasError && (
          <div className="mb-6 p-4 bg-red-500/5 border border-red-500/20 text-red-400 rounded-lg text-sm" role="alert" aria-live="assertive">
            {ERROR_MESSAGES.formSend}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label htmlFor="name" className="block text-sm text-zinc-500 mb-1.5">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass('name')}
              placeholder="Tu nombre"
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && <p id="name-error" className="mt-1.5 text-xs text-red-400" role="alert">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-zinc-500 mb-1.5">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass('email')}
              placeholder="tu@email.com"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && <p id="email-error" className="mt-1.5 text-xs text-red-400" role="alert">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm text-zinc-500 mb-1.5">Mensaje</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass('message')}
              placeholder="Contame de tu proyecto..."
              aria-required="true"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && <p id="message-error" className="mt-1.5 text-xs text-red-400" role="alert">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-white hover:bg-zinc-100 text-black font-semibold rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed"
            aria-disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Enviando...
              </span>
            ) : 'Enviar mensaje'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact
