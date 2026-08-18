import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";

import AsciiReveal from "./utils/flower.jsx";
import "./App.css";

function PageHeader() {
  return (
    <header className="page-header">
      <div className="logo-title">K.</div>
      <nav>
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a href="#project-section">Projects</a>
          </li>
          <li>
            <a>About Me</a>
          </li>
          <li>
            <a>Contact</a>
          </li>
        </ul>
      </nav>
      <button className="btn-primary">Get in Touch</button>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-text">
        <h1>
          I’m Keiomarah Chigudu, a Computer Science student, full stack
          developer and aspiring AI engineer.
        </h1>
        <button className="btn-primary">See Projects</button>
      </div>
      <div className="ascii-art-container">
        <AsciiReveal />
      </div>
    </section>
  );
}

function ProjectSection() {
  return (
    <section className="project-section" id="project-section">
      <div className="project-header">
        <h2>My Projects</h2>
      </div>
      <div className="project-panel"></div>
    </section>
  );
}
function App() {
  return (
    <>
      <PageHeader />
      <HeroSection />
      <ProjectSection />
    </>
  );
}

export default App;
