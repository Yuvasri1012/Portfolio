import { useEffect, useState, useRef } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Active section tracking
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

  // Scroll glow effect
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (navbar) {
        if (window.scrollY > 10) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [menuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (id) => {
    setActive(id);
    setMenuOpen(false);
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      <nav className="navbar" ref={menuRef}>
        <img src="purple logo.png" alt="Logo" className="logo" />

        {/* Desktop Menu */}
        <ul className="menu desktop-menu">
          {navLinks.map(({ id, label }) => (
            <li key={id} className={active === id ? "nav-active" : ""}>
              <a href={`#${id}`} onClick={() => handleNavClick(id)}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Hire Me */}
        <a
          href="mailto:yuvasrir120@gmail.com"
          target="_blank"
          rel="noreferrer"
          className="desktop-hire"
        >
          <button className="hiremebtn">Hire Me !</button>
        </a>

        {/* Hamburger Button */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`mobile-overlay ${menuOpen ? "show" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <ul>
          {navLinks.map(({ id, label }, i) => (
            <li
              key={id}
              className={active === id ? "nav-active" : ""}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <a href={`#${id}`} onClick={() => handleNavClick(id)}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="mailto:yuvasrir120@gmail.com"
          target="_blank"
          rel="noreferrer"
        >
          <button className="hiremebtn mobile-hire">Hire Me !</button>
        </a>
      </div>
    </>
  );
};

export default Navbar;