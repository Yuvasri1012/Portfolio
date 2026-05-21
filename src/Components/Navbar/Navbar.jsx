import { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [active, setActive] = useState("");

  useEffect(() => {
  const sections = document.querySelectorAll("section[id]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    {
      threshold: 0,
      rootMargin: "-50% 0px -50% 0px",
    }
  );

  sections.forEach((sec) => observer.observe(sec));
  return () => observer.disconnect();
}, []);

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 10) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

  return (
    <nav className="navbar">
      <img src="purple logo.png" alt="Logo" className="logo" />
      <ul className="menu">
        <li className={active === "home" ? "nav-active" : ""}>
          <a href="#home">Home</a>
        </li>
        <li className={active === "about" ? "nav-active" : ""}>
          <a href="#about">About</a>
        </li>
        <li className={active === "skills" ? "nav-active" : ""}>
          <a href="#skills">Skills</a>
        </li>
        <li className={active === "projects" ? "nav-active" : ""}>
          <a href="#projects">Projects</a>
        </li>
        <li className={active === "contact" ? "nav-active" : ""}>
          <a href="#contact">Contact</a>
        </li>
      </ul>
      <a href="mailto:yuvasrir120@gmail.com" target="_blank" rel="noreferrer">
        <button className="hiremebtn">Hire Me !</button>
      </a>
    </nav>
  );
};

export default Navbar;
