import { useState, useEffect, useRef } from "react";
import "./Projects.css";

const projects = [
  {
    id: 1,
    title: "BigBoom",
    description: "A modern e-commerce experience with dynamic product views and smart cart actions.",
    category: "E-commerce",
    image: "/ProjectImage/BigBoom.png",
    link: "https://bigboomsite.netlify.app/",
    techStack: "HTML, CSS, JavaScript",
  },
  {
    id: 2,
    title: "Cravento",
    description: "A fresh and colorful storefront for daily grocery essentials.",
    category: "E-commerce",
    image: "/ProjectImage/Cravento.png",
    link: "https://your-fashionhub-site.com",
    techStack: "React.js, Django, SQLite3",
  },
  {
    id: 3,
    title: "Portfolio",
    description: "Developer portfolio with project showcases and blogs.",
    category: "Portfolio",
    image: "/ProjectImage/Portfolio.png",
    link: "https://your-fashionhub-site.com",
    techStack: "React.js",
  },
  {
    id: 4,
    title: "Brain Pick",
    description: "A fun game that tests logical thinking through number guesses.",
    category: "Tasks",
    image: "/ProjectImage/BrainPick.png",
    link: "https://brainpick.netlify.app/",
    techStack: "HTML, Tailwind CSS, JavaScript",
  },
  {
    id: 5,
    title: "Todo List",
    description: "A clean task list to plan and complete daily work.",
    category: "Tasks",
    image: "/ProjectImage/TodoList.png",
    link: "https://todolistesite.netlify.app/",
    techStack: "HTML, CSS, JavaScript",
  },
  {
    id: 6,
    title: "Instagram",
    description: "A simple Instagram-style interface supporting likes, comments, and saves.",
    category: "Tasks",
    image: "/ProjectImage/Insta.png",
    link: "https://instaproject1.netlify.app/",
    techStack: "React",
  },
  {
    id: 7,
    title: "Expense Tracker",
    description: "A simple tool used to record, monitor, and control your daily expenses.",
    category: "Tasks",
    image: "/ProjectImage/Expense.png",
    link: "https://expense-tracker-ektl.onrender.com",
    techStack: "Django, MySQL",
  },
  {
    id: 8,
    title: "Vehicle Mart",
    description: "A small marketplace for selling vehicles with ease.",
    category: "E-commerce",
    image: "/ProjectImage/Vehiclemart.png",
    link: "https://vehiclemart-project.onrender.com/home/",
    techStack: "Django",
  },
];

const filters = ["All", "Portfolio", "E-commerce", "Tasks"];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [revealedIds, setRevealedIds] = useState(new Set());
  // ✅ Mobile: track which card is tapped/active
  const [activeCardId, setActiveCardId] = useState(null);
  const cardRefs = useRef([]);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.dataset.id);
            setRevealedIds((prev) => new Set([...prev, id]));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [filtered]);

  // ✅ Mobile tap: toggle card active state
  const handleCardTap = (e, projectId, projectLink) => {
    // If card is not yet active — activate it (show info)
    if (activeCardId !== projectId) {
      e.preventDefault(); // prevent link navigation on first tap
      setActiveCardId(projectId);
      return;
    }
    // If already active — second tap navigates to link (handled by <a> tag naturally)
    setActiveCardId(null);
  };

  // ✅ Close active card when tapping outside
  useEffect(() => {
    const handleOutsideTouch = (e) => {
      if (!e.target.closest(".project-card")) {
        setActiveCardId(null);
      }
    };
    document.addEventListener("touchstart", handleOutsideTouch);
    return () => document.removeEventListener("touchstart", handleOutsideTouch);
  }, []);

  return (
    <section className="projects-section">
      <div className="projects-bg-blob blob-1" />
      <div className="projects-bg-blob blob-2" />

      <div className="projects-container">
        <div className="projects-header">
          <h2 className="projects-title">My Recent Works</h2>
          <p className="projects-subtitle">
            We put your ideas and thus your wishes in the form of a unique web
            project that inspires you and your customers.
          </p>
        </div>

        {/* ✅ Filter buttons with touch-action */}
        <div className="projects-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? "filter-btn--active" : ""}`}
              onClick={() => {
                setActiveFilter(filter);
                setActiveCardId(null); // reset active card on filter change
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filtered.map((project, index) => (
            <div
              key={project.id}
              data-id={project.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`project-card ${revealedIds.has(project.id) ? "card-visible" : "card-hidden"} ${
                activeCardId === project.id ? "card-tapped" : ""
              }`}
              style={{ transitionDelay: `${index * 0.12}s` }}
              // ✅ Mobile tap handler
              onTouchEnd={(e) => handleCardTap(e, project.id, project.link)}
            >
              <div className="project-card__image-wrap">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-card__image"
                />
                <div className="project-card__image-overlay" />
              </div>

              <div className="project-card__info">
                <div className="project-card__info-left">
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__desc">{project.description}</p>
                  <div className="project-card__tech">
                    {project.techStack.split(", ").map((tech) => (
                      <span key={tech} className="project-card__tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__arrow"
                  aria-label="View project"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}