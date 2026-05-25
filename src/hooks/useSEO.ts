import { useEffect } from 'react'

interface SEOOptions {
  title: string
  description: string
}

const useSEO = ({ title, description }: SEOOptions) => {
  useEffect(() => {
    document.title = title
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', description)
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', title)
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', description)
  }, [title, description])
}

export default useSEO
