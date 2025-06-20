import About from "./pages/About"
import Projects from "./pages/Projects"
import Header from "./pages/Header"
import Footer from "./pages/Footer";
import Contact from "./pages/Contact"

import "./styles/index.css"


const App = () => {
  return (
    <>
      <Header />

      <section id="about">
        <About />
      </section>
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 text-green-400 animate-bounce flex items-center gap-2 z-50">
        <span className="text-sm">Desliza</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-10 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      <section id="projects">
        <Projects />
      </section>

      <section id="contact">
        <Contact />
      </section>
      <Footer />

    </>
  )
}

export default App