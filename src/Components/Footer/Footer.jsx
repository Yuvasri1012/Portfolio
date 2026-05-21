import React from "react";
import "./Footer.css";

const Footer = () => {
  const handleDownload = () => {
    // Replace with your actual resume file path
    const link = document.createElement("a");
    link.href = "/YuvasriResume.pdf";
    link.download = "YuvasriResume.pdf";
    link.click();
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-tagline">
          Though I'm a fresher, I bring the fire to learn fast, work smart, and
          grow with your team.
        </p>
        <div className="footer-buttons">
          <a href="mailto:yuvasrir120@gmail.com" className="btn btn-primary">
            Hire Me
          </a>
          <button className="btn btn-outline" onClick={handleDownload}>
            Download Resume
          </button>
        </div>
        <p className="footer-copyright">© 2026 Yuvasri. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;