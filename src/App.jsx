import About from "./pages/About"
import Projects from "./pages/Projects"
import Header from "./pages/Header"
import Footer from "./pages/Footer";
import Contact from "./pages/Contact"

import "./styles/index.css"
import ScrollHint from "./components/ScrollHint";


const App = () => {
  return (
    <>
      <Header />

      <section id="about">
        <About />
      </section>
      <ScrollHint />

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