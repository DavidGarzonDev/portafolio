// Utilidades de validación
import type { FormData, FormErrors } from '@/types'
import { VALIDATION_MESSAGES } from '@/constants'

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0
}

export const validateMinLength = (value: string, min: number): boolean => {
  return value.trim().length >= min
}

export const validateContactForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {}

  if (!validateRequired(data.name)) {
    errors.name = VALIDATION_MESSAGES.required('nombre')
  }

  if (!validateRequired(data.email)) {
    errors.email = VALIDATION_MESSAGES.required('correo')
  } else if (!validateEmail(data.email)) {
    errors.email = VALIDATION_MESSAGES.invalidEmail
  }

  if (!validateRequired(data.message)) {
    errors.message = VALIDATION_MESSAGES.required('mensaje')
  } else if (!validateMinLength(data.message, 10)) {
    errors.message = VALIDATION_MESSAGES.minLength('mensaje', 10)
  }

  return errors
}