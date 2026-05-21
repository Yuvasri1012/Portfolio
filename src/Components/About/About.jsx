import React, { useState, useEffect, useRef } from "react";
import "./About.css";

const About = () => {
  const [activeTab, setActiveTab] = useState("biography");
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target); // only once
          }
        });
      },
      { threshold: 0.15 }
    );

    const section = sectionRef.current;
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const biographyData = [
    { label: "Name", value: "Yuvasri" },
    { label: "Birthday", value: "10 April, 2004" },
    { label: "Age", value: "23" },
    { label: "Address", value: "Srivilliputhu, Tamil Nadu" },
    { label: "Email", value: "yuvasrir120@gmail.com" },
    { label: "Mobile No", value: "(+91) 8610126247" },
  ];

  const educationData = [
    {
      title: "B.SC - Computer Science",
      institution: "Arulmigu Kalasalingam College of Arts and Science",
      year: "Jun 2021 – May 2024",
      location: "Krishnankoil, Tamil Nadu",
    },
    {
      title: "HSC",
      institution: "Sacred Heart Girls Higher Secondary School",
      year: "Jun 2019 – Apr 2021",
      location: "Srivilliputhur, Tamil Nadu",
    },
    {
      title: "Data Processing Associate",
      institution: "AAA Techno Park",
      year: "Sep 2024 – Nov 2025",
      location: "Sivakasi, Tamil Nadu",
    },
    {
      title: "Full Stack Web Development",
      institution: "Code Purple Academy",
      year: "Dec 2025 – May 2026",
      location: "Sivakasi, Tamil Nadu",
    },
  ];

  return (
    <section className="about reveal-section" id="about" ref={sectionRef}>
      <h2 className="about-title">About Me</h2>

      <div className="about-tabs">
        <button
          className={`tab-btn ${activeTab === "biography" ? "active" : ""}`}
          onClick={() => setActiveTab("biography")}
        >
          Biography
        </button>
        <button
          className={`tab-btn ${activeTab === "education" ? "active" : ""}`}
          onClick={() => setActiveTab("education")}
        >
          Education
        </button>
      </div>

      {activeTab === "biography" && (
        <div className="biography-card">
          <div className="bio-grid">
            {biographyData.map((item, index) => (
              <div
                className="bio-item stagger-child"
                key={index}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <span className="bio-label">{item.label}</span>
                <span className="bio-value">{item.value}</span>
                <div className="bio-divider" />
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "education" && (
        <div className="education-grid">
          {educationData.map((item, index) => (
            <div
              className="edu-card stagger-child"
              key={index}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="edu-title">{item.title}</h3>
              <p className="edu-institution">{item.institution}</p>
              <p className="edu-year">{item.year}</p>
              {item.location && (
                <p className="edu-location">{item.location}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default About;