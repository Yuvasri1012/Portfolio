import React, { useEffect, useRef, useState } from "react";
import "./Hero.css";

const roles = ["Coder", "Explorer", "Designer"];

const Hero = () => {
  const heroRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const el = heroRef.current;
    if (el) {
      requestAnimationFrame(() => {
        el.classList.add("hero--visible");
      });
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setAnimating(false);
      }, 400); // half of CSS transition duration
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      {/* Background */}
      <div className="hero__bg">
        <img src="/background.jpg" alt="" className="hero__bg-img" />
        <div className="hero__bg-overlay" />
        <div className="hero__bg-grid" />
      </div>

      <div className="hero__container">
        {/* Left Content */}
        <div className="hero__content">
          <div className="hero__reveal hero__reveal--1">
            <h1 className="hero__heading">
              Hi, I'm <span className="hero__name">Yuvasri!</span>
            </h1>
          </div>

          <div className="hero__reveal hero__reveal--2">
            <h2 className="hero__role">
              Creative{" "}
              <span className={`hero__role-accent hero__role-cycle${animating ? " hero__role-cycle--exit" : " hero__role-cycle--enter"}`}>
                {roles[roleIndex]}
              </span>
            </h2>
          </div>

          <div className="hero__reveal hero__reveal--3">
            <p className="hero__tagline">
              From idea to interaction — I build interfaces that people
              remember.
            </p>
          </div>

          <div className="hero__reveal hero__reveal--4">
            <div className="hero__tech-icons">
              {/* HTML5 */}
              <span className="hero__icon" title="HTML5">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 3l2.1 23.4L16 29l8.9-2.6L27 3H5z" fill="#E44D26" />
                  <path d="M16 27.4V5h9.2l-1.8 20.4L16 27.4z" fill="#F16529" />
                  <path d="M16 13.5H11.5l-.3-3.5H16V6.6H7.6L8.5 17H16v-3.5zm0 9.4l-4.1-1.1-.3-3H8.2l.5 5.6L16 26v-3.1z" fill="#fff" />
                  <path d="M16 13.5v3.5h4.2l-.4 4.3-3.8 1v3.1l6.1-1.7.8-9.2H16zm.1-6.9v3.4h7.7l-.3-3.4H16.1z" fill="#EBEBEB" />
                </svg>
              </span>
              {/* CSS3 */}
              <span className="hero__icon" title="CSS3">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 3l2.1 23.4L16 29l8.9-2.6L27 3H5z" fill="#1572B6" />
                  <path d="M16 27.4V5h9.2l-1.8 20.4L16 27.4z" fill="#33A9DC" />
                  <path d="M16 13H11.3l.3 3.5H16V13zm0-6.4H7.7l.3 3.4H16V6.6zm0 12.8l-3.8 1-.3-3H8.5l.5 5.5L16 24v-4.6z" fill="#fff" />
                  <path d="M16 13h4.4l-.4 4.3-4 1.1v3.6l5.9-1.6.1-1.5.7-7.4H16V13zm0-6.4v3.4h8l-.3-3.4H16z" fill="#EBEBEB" />
                </svg>
              </span>
              {/* JavaScript */}
              <span className="hero__icon" title="JavaScript">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" fill="#F0DB4F" />
                  <path d="M18.8 25.3c.5.8 1.1 1.4 2.2 1.4 1 0 1.6-.5 1.6-1.1 0-.8-.6-1.1-1.7-1.5l-.6-.3c-1.7-.7-2.8-1.6-2.8-3.5 0-1.7 1.3-3 3.3-3 1.4 0 2.4.5 3.2 1.8l-1.7 1.1c-.4-.7-.8-1-1.5-1-.7 0-1.1.4-1.1 1 0 .7.4 1 1.4 1.4l.6.3c2 .8 3.1 1.7 3.1 3.6 0 2.1-1.6 3.2-3.8 3.2-2.1 0-3.5-1-4.1-2.4l1.9-1zm-9 .2c.3.6.6 1 1.3 1 .6 0 1-.3 1-1.2v-6.5h2.2v6.6c0 2.1-1.2 3-3 3-1.6 0-2.5-.8-3-1.9l1.5-1z" fill="#323330" />
                </svg>
              </span>
              {/* React */}
              <span className="hero__icon" title="React">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="2.5" fill="#61DAFB" />
                  <ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" />
                  <ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 16 16)" />
                  <ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 16 16)" />
                </svg>
              </span>
              {/* GitHub */}
              <span className="hero__icon" title="GitHub">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M16 2C8.27 2 2 8.27 2 16c0 6.19 4.01 11.43 9.57 13.29.7.13.95-.3.95-.67 0-.33-.01-1.21-.02-2.37-3.89.85-4.71-1.88-4.71-1.88-.64-1.62-1.56-2.05-1.56-2.05-1.27-.87.1-.85.1-.85 1.4.1 2.14 1.44 2.14 1.44 1.25 2.14 3.28 1.52 4.08 1.16.13-.9.49-1.52.89-1.87-3.11-.35-6.38-1.55-6.38-6.92 0-1.53.55-2.78 1.44-3.76-.14-.36-.62-1.78.14-3.71 0 0 1.18-.38 3.85 1.44A13.4 13.4 0 0 1 16 8.9c1.19.01 2.39.16 3.51.47 2.67-1.82 3.85-1.44 3.85-1.44.76 1.93.28 3.35.14 3.71.9.98 1.44 2.23 1.44 3.76 0 5.38-3.28 6.56-6.4 6.91.5.43.95 1.29.95 2.6 0 1.87-.02 3.38-.02 3.84 0 .37.25.81.96.67C25.99 27.43 30 22.19 30 16c0-7.73-6.27-14-14-14z" fill="white" />
                </svg>
              </span>
              {/* Python */}
              <span className="hero__icon" title="Python">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.9 3C11.6 3 9 5 9 8v2h7v1H6.5C3.9 11 2 13 2 16.1c0 3.1 1.9 5.4 4.5 5.4H8v-3c0-2.8 2-4.5 4.5-4.5h7c2.3 0 4-1.7 4-4V8c0-2.8-2.5-5-7.6-5zm-3 2.5c.8 0 1.5.7 1.5 1.5S13.7 8.5 12.9 8.5 11.4 7.8 11.4 7s.7-1.5 1.5-1.5z" fill="#3776AB" />
                  <path d="M24 11v3c0 2.8-2.1 4.5-4.5 4.5h-7c-2.2 0-4 1.8-4 4v3c0 2.8 2.6 5 7.6 5 4.3 0 6.9-2 6.9-5v-2h-7v-1h9.5c2.6 0 4.5-2 4.5-5.1C30 14.3 28.1 11 24 11zm-3 14.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5z" fill="#FFD43B" />
                </svg>
              </span>
              {/* Django */}
              <span className="hero__icon" title="Django">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="4" fill="#092E20" />
                  <path d="M17.5 5h3.2v16.3c-1.6.3-2.8.4-4.1.4-3.9 0-5.9-1.8-5.9-5.1 0-3.2 2.2-5.3 5.5-5.3.5 0 .9.1 1.3.2V5zm0 9c-.4-.1-.7-.2-1.1-.2-1.6 0-2.6 1-2.6 2.7 0 1.7.9 2.6 2.5 2.6.4 0 .7 0 1.2-.1V14z" fill="white" />
                  <path d="M22.5 11.5h3.2V23c0 3.3-2.4 4.6-5.8 4.6-1 0-1.9-.1-3-.4l.5-2.5c.8.2 1.5.3 2.3.3 1.7 0 2.8-.7 2.8-2.3v-.5c-.5.2-1 .3-1.7.3-2.9 0-4.7-1.9-4.7-5 0-3.3 2-5.3 5.2-5.3.7 0 1.3.1 1.7.2l-.5 2.4c-.4-.1-.7-.2-1.1-.2-1.4 0-2.2.9-2.2 2.8 0 1.7.8 2.7 2.2 2.7.4 0 .8-.1 1.1-.2V11.5z" fill="white" />
                </svg>
              </span>
            </div>
          </div>

          <div className="hero__reveal hero__reveal--5">
            <a href="/Yuvasri CV.pdf" download className="hero__cv-btn">
              <span className="hero__cv-btn-text">Download CV</span>
              <span className="hero__cv-btn-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="hero__cv-btn-glow" />
            </a>
          </div>
        </div>

        {/* Right - Photo */}
        <div className="hero__photo-wrap">
          <div className="hero__reveal hero__reveal--6">
            <div className="hero__photo-frame">
              <div className="hero__photo-border" />
              <div className="hero__photo-inner">
                <img src="/Yuva Photo.jpeg" alt="Yuvasri" className="hero__photo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;