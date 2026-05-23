import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import BgImage from "/BackgroundImage.webp";

const SERVICE_ID  = "service_xxxxxxx";
const TEMPLATE_ID = "template_xxxxxxx";
const PUBLIC_KEY  = "xxxxxxxxxxxxxxxx";

const SERVICES = [
  "Frontend Development",
  "Backend Development",
  "Full Stack Development",
  "UI/UX Design",
  "Other",
];

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [dropOpen, setDropOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !revealed) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [revealed]);

  const handle = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const selectService = (s) => {
    setForm((prev) => ({ ...prev, service: s }));
    setDropOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        firstName: form.firstName,
        lastName:  form.lastName,
        email:     form.email,
        phone:     form.phone,
        service:   form.service,
        message:   form.message,
      },
      PUBLIC_KEY
    );
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
  };

  return (
    <section
      className="contact-section"
      ref={sectionRef}
      style={{
        backgroundImage: `
          linear-gradient(rgba(13, 11, 20, 0.82), rgba(13, 11, 20, 0.82)),
          url(${BgImage})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="contact-inner">

        {/* ── Left: Form ── */}
        <div className={`contact-form-side reveal-left ${revealed ? "is-visible" : ""}`}>
          <h2 className="contact-heading">
            Let's work together!
          </h2>
          <p className="contact-sub">
            I design and code beautifully simple things and I love what I do.
            Just simple like that!
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                className="form-input"
                type="text"
                name="firstName"
                placeholder="First name"
                value={form.firstName}
                onChange={handle}
                required
              />
              <input
                className="form-input"
                type="text"
                name="lastName"
                placeholder="Last name"
                value={form.lastName}
                onChange={handle}
                required
              />
            </div>

            <div className="form-row">
              <input
                className="form-input"
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handle}
                required
              />
              <input
                className="form-input"
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handle}
              />
            </div>

            {/* Custom dropdown */}
            <div
              className="form-dropdown"
              onClick={() => setDropOpen((p) => !p)}
            >
              <span className={form.service ? "selected" : "placeholder"}>
                {form.service || "Choose Service"}
              </span>
              <svg
                className={`drop-arrow ${dropOpen ? "open" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
              {dropOpen && (
                <ul className="drop-list">
                  {SERVICES.map((s) => (
                    <li
                      key={s}
                      className={`drop-item ${form.service === s ? "active" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        selectService(s);
                      }}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <textarea
              className="form-textarea"
              name="message"
              placeholder="Message"
              value={form.message}
              onChange={handle}
              rows={7}
              required
            />

            <button className="form-submit" type="submit">
              Send message
            </button>
          </form>
        </div>

        {/* ── Right: Contact Info ── */}
        <div className={`contact-info-side reveal-right ${revealed ? "is-visible" : ""}`}>

          <a className="info-item" href="tel:+918610126247">
            <div className="info-icon"><LocalPhoneRoundedIcon /></div>
            <div>
              <p className="info-label">Phone</p>
              <p className="info-value">+91 8610126247</p>
            </div>
          </a>

          <a className="info-item" href="mailto:yuvasrir120@gmail.com">
            <div className="info-icon"><EmailRoundedIcon /></div>
            <div>
              <p className="info-label">Email</p>
              <p className="info-value">yuvasrir120@gmail.com</p>
            </div>
          </a>

          <a
            className="info-item"
            href="https://www.google.com/maps/place/Mariamman+Kovil+Street,+Srivilliputhur,+Tamil+Nadu+626125/@9.5139514,77.6305126,16.96z/data=!4m10!1m2!2m1!1s29%2F32,marriamman+kovil+chekkai+street+,srivilliputhur!3m6!1s0x3b06dcb9960225af:0x1b9b07160b1667b5!8m2!3d9.5121272!4d77.6357139!15sCjUyOS8zMixtYXJpYW1tYW4ga292aWwgY2hla2thZGkgc3RyZWV0ICxzcml2aWxsaXB1dGh1cpIBDHN1YmxvY2FsaXR5MeABAA!16s%2Fg%2F1tdm24w_?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="info-icon"><LocationOnRoundedIcon /></div>
            <div>
              <p className="info-label">Address</p>
              <p className="info-value">
                29/32, Marriamman Kovil<br />
                Chekkai Street, Srivilliputhur.
              </p>
            </div>
          </a>

          {/* ── Social Links ── */}
          <div className="social-links-wrapper">
            <p className="social-links-label">Social Links</p>
            <div className="social-links-list">

              <a
                className="social-link-item"
                href="https://github.com/Yuvasri1012"  
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon className="social-link-icon" />
                <span>GitHub</span>
              </a>

              <a
                className="social-link-item"
                href="hhttps://www.linkedin.com/in/yuvasriravikumar/"  
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon className="social-link-icon" />
                <span>LinkedIn</span>
              </a>

              <a
                className="social-link-item"
                href="https://wa.me/918610126247"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="social-link-icon" />
                <span>WhatsApp</span>
              </a>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}