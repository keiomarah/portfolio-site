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

const workExperience = [
  {
    id: 1,
    role: "Freelance Development",
    date: "Jan 2026 - Present",
    description: `I run a freelance web development business, designing and 
    building custom sites for local businesses. The work has sharpened my 
    ability to translate non-technical stakeholder needs into responsive, 
    well-designed pages and taught me to prioritise client communication.`,
    skills: ["Custom Development", "UI/UX", "Requirements Gathering"],
  },
  {
    id: 2,
    role: "English Tutoring",
    date: "Apr 2025 - Present",
    description: `I teach English remotely to adult professionals across a 
    range of skill levels. The role has sharpened a skill that transfers 
    directly to engineering such as communication. It's also built the 
    self-management remote engineering teams depend on: owning my schedule 
    and staying reliable to people I've never met in person.`,
    skills: ["Communication", "Self-management", "Remote Work"],
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
        <div>
          <h2>My Projects</h2>
          <p>Personal projects I've completed</p>
        </div>
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
  const [selectedRole, setSelectedRole] = useState(workExperience[0]);
  const changeRole = (e) => {
    setSelectedRole(workExperience[e.currentTarget.dataset.role]);
  };

  return (
    <section className="about-section" id="about-section">
      <div className="about-background"></div>
      <div className="about-content">
        <h2 className="about-section-header">About Me</h2>
        <div className="about-section-cards-container">
          <div className="about-card">
            <div className="about-card-text">
              <h3>Education.</h3>
              <p>
                Currently a part-time second-year student at{" "}
                <a
                  className="about-links"
                  href="https://en.wikipedia.org/wiki/University_of_South_Africa"
                  target="_blank"
                >
                  the University of South Africa ↗︎
                </a>
                , pursuing a bachelor's degree in Computer Science. Studying at
                a distance-learning institution has cultivated a strong sense of
                ownership over my own learning - without the traditional
                classroom accountability, the discipline has had to be
                self-imposed. The flexibility of my studies has allowed me to
                pursue several independent projects beyond my syllabus and build
                real software: <a className="about-links">Basil ↗︎</a>, a
                multi-cafe ordering platform with a Flask/React/PostgreSQL stack
                or developing{" "}
                <a
                  className="about-links"
                  href="https://bloomapp2026.netlify.app/"
                  target="_blank"
                >
                  Bloom ↗︎
                </a>
                , a wellness application app while learning to manage complex UI
                state in React. Learning to solve problems that no course
                outline anticipated has been better preparation for the pace of
                the AI and software landscape than any single module could be.
              </p>
            </div>
            <div className="about-image">
              <div className="bar-row row-1"></div>
              <img src={hyperImage} />
            </div>
          </div>
          <div className="about-card">
            <div className="about-card-text">
              <h3>Work Experience.</h3>
              <div className="projects-tabs-container">
                {workExperience.map((role) => (
                  <button
                    key={role.id}
                    className={`project-tab work-tab ${selectedRole.id === role.id ? "selected" : ""}`}
                    data-role={role.id - 1}
                    onClick={changeRole}
                  >
                    <span className="arrow">↪</span> {role.role}
                  </button>
                ))}
              </div>
              <div className="about-tab-content" key={selectedRole.id}>
                <p className="role-date">{selectedRole.date}</p>
                <p>{selectedRole.description}</p>
                <div className="skills">
                  {selectedRole.skills.map((skill) => (
                    <div key={skill}>{skill}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="about-image">
              <div className="bar-row row-1"></div>
              <img src={hyperImage} />
            </div>
          </div>
          <div className="about-card">
            <div className="about-card-text">
              <h3>Interests.</h3>
              <p>
                I’m currently exploring AI and machine learning from the ground
                up, building a foundation in theory while applying what I learn
                practically. I’m particularly interested in AI’s potential to
                automate time-consuming tasks and expand access to opportunities
                in education, healthcare, and infrastructure. Outside of
                engineering, I love reading widely. I enjoy encountering
                different perspectives, ideas, cultures, and periods of
                history—curiosity that shapes how I approach both technology and
                the world around me.
              </p>
            </div>
            <div className="about-image">
              <div className="bar-row row-1"></div>
              <img src={hyperImage} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="contact-section">
      <div className="small-header">Contact Me</div>
      <h2>Let's Work Together.</h2>
      <p>Open to collaborate with you on whatever you want I guess.</p>
      <div className="contact-form-container">
        <div className="art-2">
          <AsciiReveal />
        </div>
        <form>
          <h3>Lets work Together.</h3>
          <fieldset>
            <label>
              Name
              <input />
            </label>
            <label>
              Email
              <input />
            </label>
          </fieldset>
          <label>
            Message
            <textarea></textarea>
          </label>
        </form>
      </div>
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
      <ContactSection />
    </>
  );
}

export default App;
