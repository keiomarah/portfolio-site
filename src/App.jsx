import AsciiReveal from "./utils/flower.jsx";
import hyperImage from "./assets/hyper-image.jpg";
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
            <a href="#about-section">About Me</a>
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
        <div className="projects-tabs-container">
          <button className="project-tab">
            <span className="arrow">↪</span> Mood Reflection Application
          </button>
          <button className="project-tab">
            <span className="arrow">↪</span> Cafe Ordering Application
          </button>
          <button className="project-tab">
            <span className="arrow">↪</span> Architecture Portfolio Website
          </button>
        </div>
      </div>
      <div className="project-panel"></div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="about-section" id="about-section">
      <div className="about-section-header">
        <h2>About Me</h2>
      </div>
      <div className="about-section-cards-container">
        <div className="about-card">
          <div className="about-card-text">
            <h3>Education.</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <img src={hyperImage} />
        </div>
        <div className="about-card">
          <div className="about-card-text">
            <h3>Work Experience.</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <img src={hyperImage} />
        </div>
        <div className="about-card">
          <div className="about-card-text">
            <h3>Interest.</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <img src={hyperImage} />
        </div>
      </div>
      <div className="about-section-header"></div>
    </section>
  );
}
function App() {
  return (
    <>
      <PageHeader />
      <HeroSection />
      <ProjectSection />
      <AboutSection />
    </>
  );
}

export default App;
