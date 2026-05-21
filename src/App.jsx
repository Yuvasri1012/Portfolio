import Navbar from './Components/Navbar/Navbar'
import './App.css'
import Hero from './Components/Hero/Hero'
import WhatIDo from './Components/WhatIDo/WhatIDo'
import Projects from './Components/Projects/Projects'
import Skills from './Components/Skills/Skills'
import Scrolltotop from './Components/Scrolltotop/Scrolltotop'
import Contact from './Components/Contact/Contact'
import Footer from './Components/Footer/Footer'
import About from './Components/About/About'

function App() {
  return (
    <>
      <Navbar />
      <section id="home">
        <Hero />
      </section>
        <WhatIDo />
        <section id="projects">
      <Projects />
      </section>
      <section id="skills">
        <Skills/>
      </section>
      <Scrolltotop/>
      <section id="contact">
        <Contact/>
      </section>
      <section id="about">
        <About/>
      </section>
      <Footer/>
    </>
  )
}

export default App