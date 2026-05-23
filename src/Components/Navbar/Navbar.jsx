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
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0, rootMargin: "-50% 0px -50% 0px" }
    );
    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Scroll glow effect
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Outside click — use closeMenu
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu(); // ✅ setMenuOpen(false) இல்லை
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [menuOpen]);

  // ✅ useEffect for overflow REMOVE பண்ணிட்டோம் — directly handle பண்றோம்

  const closeMenu = () => {
    document.body.style.overflow = ""; // ✅ Immediately restore
    setMenuOpen(false);
  };

  const openMenu = () => {
    document.body.style.overflow = "hidden";
    setMenuOpen(true);
  };

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setActive(id);
    closeMenu(); // ✅ overflow restore + drawer close — ஒரே function

    setTimeout(() => {
      const target = document.getElementById(id);
      if (!target) return;
      const navbarHeight = window.innerWidth <= 768 ? 70 : 90;
      const top = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }, 450);
  };

  const navLinks = [
    { id: "home",     label: "Home" },
    { id: "about",    label: "About" },
    { id: "skills",   label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact",  label: "Contact" },
  ];

  return (
    <>
      <nav className="navbar" ref={menuRef}>
        <img src="purple logo.png" alt="Logo" className="logo" />

        <ul className="menu desktop-menu">
          {navLinks.map(({ id, label }) => (
            <li key={id} className={active === id ? "nav-active" : ""}>
              <a href={`#${id}`} onClick={(e) => handleNavClick(e, id)}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <a href="mailto:yuvasrir120@gmail.com" target="_blank" rel="noreferrer" className="desktop-hire">
          <button className="hiremebtn">Hire Me !</button>
        </a>

        {/* ✅ openMenu / closeMenu use பண்றோம் */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => menuOpen ? closeMenu() : openMenu()}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* ✅ closeMenu — overflow restore ஆகும் */}
      <div
        className={`mobile-overlay ${menuOpen ? "show" : ""}`}
        onClick={closeMenu}
      />

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <ul>
          {navLinks.map(({ id, label }, i) => (
            <li
              key={id}
              className={active === id ? "nav-active" : ""}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <a href={`#${id}`} onClick={(e) => handleNavClick(e, id)}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a href="mailto:yuvasrir120@gmail.com" target="_blank" rel="noreferrer">
          <button className="hiremebtn mobile-hire">Hire Me !</button>
        </a>
      </div>
    </>
  );
};

export default Navbar;