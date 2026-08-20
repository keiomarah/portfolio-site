import { useState } from "react";
import AsciiReveal from "./utils/flower.jsx";
import hyperImage from "./assets/hyper-image.jpg";
import bloomMock from "./assets/bloom-mock.png";
import cafeMock from "./assets/cafe-mock.png";
import metaMock from "./assets/meta-mock.png";
import reactFlaskLogo from "./assets/react-flask-logo.png";
import reactFlaskPostLogo from "./assets/react-flask-post-logo.png";
import cssLogo from "./assets/css-js-logo.png";
import "./App.css";

const projects = [
  {
    id: 1,
    name: "Multi-Cafe Ordering App",
    description: `
    Basil is a multi-café ordering application developed in Flask, 
    React and PostgreSQL. The application allows for  cafés to register, 
    add and manage their menu and process online orders. Customers are 
    able to register and make online orders from affiliated cafes. JWT 
    and OAuth were used to ensure secure authentication. The UI was first 
    designed in Figma, then translated to custom UI components in React. 
    `,
    image: cafeMock,
    stack: reactFlaskPostLogo,
  },
  {
    id: 2,
    name: "Architecture Firm Portfolio Site",
    description: `
    I designed and built a portfolio site for Metamorphosis AIDPM, an architecture 
    firm based in Harare Zimbabwe. I communicated frequently with the principal architect 
    to develop a digital presence that aligned with their brand image. I implemented a simple
     PHP backend to handle contact form enquiries which are routed to their admin email address. 
    `,
    image: metaMock,
    stack: cssLogo,
  },
  {
    id: 3,
    name: "Mood Reflection Journal App",
    description: `
    Bloom is a full-stack mood reflection and journal web application I 
    designed and built end-to-end. I implemented secure authentication using 
    JWT stored in HTTP-only cookies. The database was implemented using 
    SQLAlchemy and it was exposed through a RESTful Flask API. 
    The frontend is a custom UI built in React with nested modal 
    flows managed by state. 
    `,
    image: bloomMock,
    stack: reactFlaskLogo,
  },
];
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
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const changeProject = (e) => {
    setSelectedProject(projects[e.currentTarget.dataset.project]);
  };
  return (
    <section className="project-section" id="project-section">
      <div className="project-header">
        <h2>My Projects</h2>
        <div className="projects-tabs-container">
          {projects.map((project) => {
            return (
              <button
                className={`project-tab ${selectedProject.id === project.id ? "selected" : ""}`}
                data-project={project.id - 1}
                onClick={(e) => {
                  changeProject(e);
                }}
              >
                <span className="arrow">↪</span> {project.name}
              </button>
            );
          })}
        </div>
      </div>
      <div className="project-panel">
        <div className="project-panel-content" key={selectedProject.id}>
          <p className="project-number">{`0${selectedProject.id}/03`}</p>
          <img className="project-image" src={selectedProject.image} />
          <div className="project-details-container">
            <img className="project-stack" src={selectedProject.stack} />
            <p className="project-description">{selectedProject.description}</p>
          </div>
        </div>
      </div>
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

function ContactSection() {
  return (
    <sectio className="contact-section">
      <div className="contact-header">
        <h2>Get in Touch</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore.
        </p>
      </div>
      <div className="contact-form-container">
        <form></form>
      </div>
    </sectio>
  );
}
function App() {
  return (
    <>
      <PageHeader />
      <HeroSection />
      <ProjectSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}

export default App;
