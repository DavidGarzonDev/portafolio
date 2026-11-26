import { useEffect, useRef, useState } from 'react'
import { Mesh, Program, Renderer, Triangle } from 'ogl'

/**
 * Fondo de luz en WebGL (OGL): un círculo de luz granulada como de proyector, rayos
 * volumétricos que giran despacio y niebla que se desplaza. La luz se inclina un poco
 * hacia el mouse. Si no hay WebGL o se prefiere menos movimiento, se usa un círculo en CSS.
 */

const vertex = /* glsl */ `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec2 uMouse;
  uniform vec2 uCenter;
  varying vec2 vUv;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.03;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    float aspect = uRes.x / uRes.y;
    vec2 p = vec2((vUv.x - 0.5) * aspect, vUv.y - 0.5);
    vec2 c = vec2((uCenter.x - 0.5) * aspect, uCenter.y - 0.5) + uMouse * 0.035;
    vec2 d = p - c;
    float r = length(d);

    // Disco de luz con borde suave y un halo alrededor
    float disk = smoothstep(0.28, 0.04, r);
    float halo = exp(-r * 3.8) * 0.5;

    // Rayos volumétricos que giran despacio
    float ang = atan(d.y, d.x);
    float rays = fbm(vec2(ang * 2.6 + uTime * 0.03, r * 1.5 - uTime * 0.05));
    rays = pow(rays, 2.6) * exp(-r * 1.6) * 1.6;

    // Niebla que se desplaza, más espesa abajo
    float fog = fbm(p * 2.4 + vec2(uTime * 0.035, uTime * 0.01));
    fog = smoothstep(0.38, 0.95, fog) * (0.25 + 0.75 * smoothstep(0.1, -0.5, p.y)) * exp(-r * 1.3);

    float light = disk * 0.92 + halo + rays * 0.55;
    light *= 0.8 + 0.3 * fog;

    // Grano de fotocopia dentro de la luz, como en el cine antiguo
    float g = hash(gl_FragCoord.xy * 0.73 + floor(uTime * 18.0) * 17.13);
    light *= 0.72 + 0.5 * g;

    // Todo se desvanece hacia los bordes del lienzo, sin cortes visibles
    float edge = smoothstep(0.0, 0.3, vUv.x) * smoothstep(1.0, 0.7, vUv.x)
               * smoothstep(0.0, 0.12, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
    float v = clamp((light + fog * 0.16) * edge, 0.0, 1.0);
    gl_FragColor = vec4(vec3(v), v);
  }
`

interface NoirLightProps {
  /** Centro de la luz en coordenadas 0–1 del lienzo (y hacia arriba). */
  cx?: number
  cy?: number
  className?: string
}

const NoirLight = ({ cx = 0.5, cy = 0.62, className = '' }: NoirLightProps) => {
  const hostRef = useRef<HTMLDivElement>(null)
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let renderer: Renderer
    try {
      renderer = new Renderer({ alpha: true, premultipliedAlpha: true, dpr: Math.min(window.devicePixelRatio, 1.5) })
    } catch {
      setFallback(true)
      return
    }
    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)
    gl.canvas.style.width = '100%'
    gl.canvas.style.height = '100%'
    host.appendChild(gl.canvas)

    const program = new Program(gl, {
      vertex,
      fragment,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uRes: { value: [1, 1] },
        uMouse: { value: [0, 0] },
        uCenter: { value: [cx, cy] },
      },
    })
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })

    const resize = () => {
      const { width, height } = host.getBoundingClientRect()
      renderer.setSize(width, height)
      program.uniforms.uRes.value = [width, height]
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(host)

    // El mouse inclina la luz con suavidad
    const target = [0, 0]
    const onMove = (e: PointerEvent) => {
      target[0] = (e.clientX / window.innerWidth - 0.5) * 2
      target[1] = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    // Solo se dibuja mientras está en pantalla
    let visible = true
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(host)

    let frame = 0
    const start = performance.now()
    const loop = (now: number) => {
      frame = requestAnimationFrame(loop)
      if (!visible) return
      const m = program.uniforms.uMouse.value as number[]
      m[0] += (target[0] - m[0]) * 0.04
      m[1] += (target[1] - m[1]) * 0.04
      program.uniforms.uTime.value = reduce ? 0 : (now - start) / 1000
      renderer.render({ scene: mesh })
    }
    if (reduce) {
      renderer.render({ scene: mesh })
    } else {
      frame = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
      gl.canvas.remove()
    }
  }, [cx, cy])

  return (
    <div ref={hostRef} className={`pointer-events-none ${className}`} aria-hidden="true">
      {fallback && <div className="noir-spot absolute left-1/2 top-[38%] aspect-square w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full" />}
    </div>
  )
}

export default NoirLight
