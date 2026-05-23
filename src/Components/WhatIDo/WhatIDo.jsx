import React, { useState, useEffect, useRef } from "react";
import "./WhatIDo.css";

const services = [
  {
    number: "01",
    title: "Web Design",
    description:
      "I break down the complex user experience problem to create integrity-focused solutions that connect billions of people.",
  },
  {
    number: "02",
    title: "Front-End",
    description:
      "I specialize in building responsive and fast-working front-end web applications using React.js. My solutions focus on delivering seamless and intuitive user experiences for millions of users.",
  },
  {
    number: "03",
    title: "Back-End",
    description:
      "I build robust and scalable backend systems using Python, Django framework. My solutions ensure efficient data handling and seamless integration, providing a solid foundation for web applications.",
  },
  {
    number: "04",
    title: "Database",
    description:
      "I specialize in designing and managing databases using MySQL and Firebase. My expertise includes creating efficient database schemas, optimizing queries, ensuring data integrity, and security.",
  },
];

const WhatIDo = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // only once
        }
      },
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`whatido ${visible ? "whatido--visible" : ""}`}
      ref={sectionRef}
    >
      <div className="whatido__container">
        <h2 className={`whatido__heading whatido__fade whatido__fade--0`}>
          My Quality Service
        </h2>

        <p className="whatido__subtext whatido__fade whatido__fade--0">
          We put your ideas and thus your wishes in the form of a unique web
          project that inspires you and your customers.
        </p>

        <div className="whatido__list">
          {services.map((service, index) => (
            <div
              key={index}
              className={`whatido__item whatido__fade whatido__fade--${index + 1} ${
                activeIndex === index ? "whatido__item--active" : ""
              }`}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              <span className="whatido__number">{service.number}</span>
              <div className="whatido__info">
                <h3 className="whatido__title">{service.title}</h3>
                <p className="whatido__desc">{service.description}</p>
              </div>
              <span className="whatido__arrow">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;