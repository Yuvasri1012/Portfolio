import React from "react";
import "./Footer.css";

const Footer = () => {
  const handleDownload = () => {
    // Replace with your actual resume file path
    const link = document.createElement("a");
    link.href = "/Yuvasri CV.pdf";
    link.download = "Yuvasri CV.pdf";
    link.click();
    document.body.appendChild(link); 
    link.click();
    document.body.removeChild(link);
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
          <a href="/Yuvasri CV.pdf" className="btn btn-outline" onClick={handleDownload}>
            Download Resume
          </a>
        </div>
        <p className="footer-copyright">© 2026 Yuvasri. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;