import About from "./pages/About"
import Projects from "./pages/Projects"
import Header from "./pages/Header"
import Footer from "./pages/Footer";
import Contact from "./pages/Contact"

import "./styles/index.css"
import ScrollHint from "./components/ScrollHint";
import { TechSlider } from "./components/TechSlider";


const App = () => {
  return (
    <main className="relative overflow-hidden">
      <Header />
      <ScrollHint />

      <section id="about" className="relative">
        <About />
      </section>
      <TechSlider />

      <section id="projects" className="relative">
        <Projects />
      </section>

      <section id="contact" className="relative pb-16">
        <Contact />
      </section>
      <Footer />

    </main>
  )
}

export default App
