import { TECH_STACK } from '@/constants'

const TechSlider = () => {
  return (
    <section className="py-10 border-y border-zinc-900 overflow-hidden" aria-label="Tecnologías que utilizo">
      <div
        className="flex gap-6 animate-slide w-max"
        role="list"
        aria-label="Lista de tecnologías"
      >
        {[...TECH_STACK, ...TECH_STACK].map((tech, index) => (
          <div
            key={index}
            className="flex-shrink-0 px-5 py-2 border border-zinc-800 rounded-full text-sm text-zinc-400 whitespace-nowrap"
            role="listitem"
          >
            {tech.name}
          </div>
        ))}
      </div>
    </section>
  )
}

export default TechSlider
