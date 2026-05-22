import { useState, useCallback } from 'react'
import type { FormData, FormErrors } from '@/types'

interface UseFormOptions {
  initialValues: FormData
  validate: (values: FormData) => FormErrors
}

interface UseFormReturn {
  values: FormData
  errors: FormErrors
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleBlur: () => void
  reset: () => void
  isValid: boolean
}

export const useForm = ({ initialValues, validate }: UseFormOptions): UseFormReturn => {
  const [values, setValues] = useState<FormData>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    
    // Validar en tiempo real si ya fue touched
    if (touched[name]) {
      const validationErrors = validate({ ...values, [name]: value })
      setErrors(prev => ({ ...prev, [name]: validationErrors[name] }))
    }
  }, [touched, validate, values])

  const handleBlur = useCallback(() => {
    const validationErrors = validate(values)
    setErrors(validationErrors)
    setTouched(Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {}))
  }, [validate, values])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }, [initialValues])

  const isValid = Object.keys(validate(values)).length === 0

  return { values, errors, handleChange, handleBlur, reset, isValid }
}