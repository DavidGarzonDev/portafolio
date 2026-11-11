# Portafolio — David Garzón

[![Sitio](https://img.shields.io/badge/davidgarzon.dev-000?style=for-the-badge&logo=vercel&logoColor=white)](https://www.davidgarzon.dev)

Portafolio personal en español e inglés, con proyectos en producción, experiencia y educación. Estilo minimalista en blanco y negro, con una mascota pixel-art interactiva y partículas de fondo.

## Stack

- **React 19** + **TypeScript** (modo estricto)
- **Vite** y **Tailwind CSS v4**
- **Framer Motion** para animaciones
- **React Router** para las páginas
- **Vitest** + Testing Library para pruebas
- **ESLint** con `typescript-eslint`
- Desplegado en **Vercel**

## Características

- **Bilingüe (ES/EN)**: botón en el encabezado; recuerda la elección del visitante y, si no hay, usa el idioma del navegador.
- **Mascota interactiva**: camina en la portada, salta en arco a la esquina al hacer scroll, salta al cambiar de página o al darle clic, mira hacia el mouse y saluda la primera vez que alguien entra.
- **Partículas** en un canvas de fondo.
- Respeta `prefers-reduced-motion`.

## Desarrollo

```bash
npm install
```

```bash
npm run dev
```

Otros comandos:

```bash
npm run build       # build de producción
npm run lint        # ESLint
npm run typecheck   # revisa tipos sin compilar
npm test            # pruebas
```

## Estructura

```
src/
├── components/   # PixelBuddy, Particles, ProjectCard, TechIcon…
├── constants/    # ⭐ proyectos, experiencia y perfil (textos en ES y EN)
├── i18n/         # idioma: contexto, hook y textos de la interfaz
├── pages/        # Hero, About, Projects, Header, Footer
├── hooks/        # useSEO
└── styles/       # estilos globales y animaciones
```

Para cambiar contenido, edita `src/constants/index.ts`. Cada texto visible lleva su versión `es` y `en`; las pruebas fallan si falta alguna.

## Contacto

[LinkedIn](https://www.linkedin.com/in/davidgarzondev/) · [juanxavif@gmail.com](mailto:juanxavif@gmail.com)
