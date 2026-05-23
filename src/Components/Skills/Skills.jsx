import { useEffect, useRef, useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import "./Skills.css";

/* ── Postman SVG Icon ── */
const PostmanIcon = () => (
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <circle cx="16" cy="16" r="16" fill="#FF6C37" />
    <path
      d="M18.2 9.4l-5.6 5.6 2.4 2.4-1.2 1.2-2.4-2.4-2 2c-.3.3-.3.8 0 1.1l4.9 4.9c.3.3.8.3 1.1 0l8.4-8.4c.3-.3.3-.8 0-1.1l-4.9-4.9c-.2-.3-.5-.4-.7-.4z"
      fill="#fff"
    />
    <circle cx="18.5" cy="13.5" r="1.5" fill="#FF6C37" />
  </svg>
);

/* ── Render SVG Icon ── */
const RenderIcon = () => (
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <rect width="32" height="32" rx="8" fill="#46E3B7" />
    <path
      d="M9 23V9h7.5c2.5 0 4.5 2 4.5 4.5S19 18 16.5 18H13v5H9zm4-8.5h3.5c.8 0 1.5-.7 1.5-1.5S17.3 11.5 16.5 11.5H13V14.5z"
      fill="#fff"
    />
    <path d="M19.5 18l4 5h-4.5l-3.5-5h4z" fill="#fff" />
  </svg>
);

/* ── Skill data ── */
const SKILLS = [
  { label: "HTML",       percent: 92, icon: <img src="/SkillsIcon/HTML.png"   alt="HTML" /> },
  { label: "CSS",        percent: 90, icon: <img src="/SkillsIcon/CSS.png"    alt="CSS" /> },
  { label: "JavaScript", percent: 87, icon: <img src="/SkillsIcon/JS.png"     alt="JavaScript" /> },
  { label: "React",      percent: 82, icon: <img src="/SkillsIcon/React.png"  alt="React" /> },
  { label: "Python",     percent: 80, icon: <img src="/SkillsIcon/Python.png" alt="Python" /> },
  { label: "Django",     percent: 80, icon: <img src="/SkillsIcon/Django.png" alt="Django" /> },
];

/* ── Other Tools data ── */
const OTHER_TOOLS = [
  { label: "Postman",    icon: <PostmanIcon /> },
  { label: "Render",     icon: <RenderIcon /> },
  {
    label: "Git & GitHub",
    icon: <GitHubIcon sx={{ width: "100%", height: "100%", color: "inherit" }} />,
  },
];

/* ── Component ── */
export default function Skills() {
  const sectionRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [percents, setPercents] = useState(SKILLS.map(() => 0));

  /* Trigger once when section enters viewport */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !revealed) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [revealed]);

  /* Animate percent counters when revealed */
  useEffect(() => {
    if (!revealed) return;
    SKILLS.forEach((skill, i) => {
      const delay    = i * 120;
      const duration = 1200;
      const start    = performance.now() + delay;
      const target   = skill.percent;

      const step = (now) => {
        const elapsed  = now - start;
        if (elapsed < 0) { requestAnimationFrame(step); return; }
        const progress = Math.min(elapsed / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3);
        const value    = Math.round(eased * target);
        setPercents((prev) => {
          const next = [...prev];
          next[i] = value;
          return next;
        });
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, [revealed]);

  return (
    <section className="skills-section" ref={sectionRef}>
      {/* Header */}
      <div className="skills-header">
        <h2>My skills</h2>
        <p>
          We put your ideas and thus your wishes in the form of a unique web
          project that inspires you and your customers.
        </p>
      </div>

      {/* Skills Grid */}
      <div className="skills-grid">
        {SKILLS.map((skill, i) => (
          <div
            key={skill.label}
            className={`skill-card ${revealed ? "is-visible" : ""}`}
          >
            <div className="skill-icon">{skill.icon}</div>
            <div className="skill-percent">{percents[i]}%</div>
            <div className="skill-bar-track">
              <div
                className="skill-bar-fill"
                style={{
                  width: revealed ? `${skill.percent}%` : "0%",
                  transitionDelay: `${i * 120}ms`,
                }}
              />
            </div>
            <div className="skill-label">{skill.label}</div>
          </div>
        ))}
      </div>

      {/* Other Tools */}
      <div className="other-tools-wrapper">
        <div className="other-tools-header">
          <span className="other-tools-emoji">🧰</span>
          <h3>Other Tools</h3>
        </div>
        <div className="other-tools-grid">
          {OTHER_TOOLS.map((tool, i) => (
            <div
              key={tool.label}
              className={`tool-card ${revealed ? "is-visible" : ""}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="tool-icon">{tool.icon}</div>
              <div className="tool-label">{tool.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}