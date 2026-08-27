import { useState } from "react";
import AsciiReveal from "./utils/flower.jsx";
import hyperImage from "./assets/hyper-image.jpg";
import bloomMock from "./assets/bloom-mock.webp";
import cafeMock from "./assets/cafe-mock.webp";
import metaMock from "./assets/meta-mock.webp";
import reactFlaskLogo from "./assets/react-flask-logo.webp";
import reactFlaskPostLogo from "./assets/react-flask-post-logo.webp";
import cssLogo from "./assets/css-js-logo.webp";
import kLogo from "./assets/k-logo.png";
import "./App.css";
import useInViewOnce from "./hooks/useInViewOnce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const CONTACT_ENDPOINT = "/.netlify/functions/contact";
const projects = [
  /*{
    id: 3,
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
    link: "",
  }*/ {
    id: 1,
    name: "Architecture Firm Portfolio Site",
    description: `
    I designed and built a portfolio site for Metamorphosis AIDPM, an architecture 
    firm based in Harare Zimbabwe. I communicated frequently with the principal architect 
    to develop a digital presence that aligned with their brand image. I implemented a simple
     PHP backend to handle contact form enquiries which are routed to their admin email address. 
    `,
    image: metaMock,
    stack: cssLogo,
    link: "https://metamorphosis.co.zw/",
  },
  {
    id: 2,
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
    link: "https://bloomapp2026.netlify.app/",
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
  const [showMenu, setShowMenu] = useState(false);
  const displayMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <header className="page-header">
      <div className="logo-title">
        <img src={kLogo} alt="yellow k logo" />
      </div>
      <button
        className="menu-icon"
        onClick={(e) => {
          displayMenu(e);
        }}
      >
        <FontAwesomeIcon
          icon={faBars}
          aria-label="menu icon"
          aria-expanded={showMenu}
        />
      </button>
      <nav className={`header-nav ${showMenu ? "show" : ""}`}>
        <ul>
          <li>
            <a href="#project-section">Projects</a>
          </li>
          <li>
            <a href="#about-section">About Me</a>
          </li>
          <li>
            <a href="#contact-section">Contact</a>
          </li>
        </ul>
      </nav>
      <a href="#contact-section" className="header-btn">
        <button className="btn-primary">Get in Touch</button>
      </a>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="hero-section" id="hero-section">
      <div className="hero-text">
        <h1>
          I am Keiomarah Chigudu, a Computer Science Student, Full-Stack
          Developer and Aspiring AI Engineer.
        </h1>
        <a href="#project-section" className="hero-btn">
          <button className="btn-primary">See Projects</button>
        </a>
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
          <p className="subtext">Personal projects I've completed.</p>
        </div>
        <div className="projects-tabs-container">
          {projects.map((project) => {
            return (
              <button
                key={`button-${project.id}`}
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
          <img
            className="project-image"
            src={selectedProject.image}
            alt="desktop computer open on project"
            loading="lazy"
          />
          <div className="project-details-container">
            <img
              className="project-stack"
              src={selectedProject.stack}
              alt="programming stack logos"
              loading="lazy"
            />
            <p className="project-description">
              {selectedProject.description}{" "}
              <a
                className="visit-links"
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit here ↗︎
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const [selectedRole, setSelectedRole] = useState(workExperience[0]);
  const [eduRef, eduInView] = useInViewOnce();
  const [workRef, workInView] = useInViewOnce();
  const [interestsRef, interestsInView] = useInViewOnce();
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
                  rel="noopener noreferrer"
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
                  rel="noopener noreferrer"
                >
                  Bloom ↗︎
                </a>
                , a wellness application app while learning to manage complex UI
                state in React. Learning to solve problems that no course
                outline anticipated has been better preparation for the pace of
                the AI and software landscape than any single module could be.
              </p>
            </div>
            <div className="about-image" ref={eduRef}>
              <div className={`bar-row row-1 ${eduInView ? "play" : ""}`}></div>
              <img src={hyperImage} alt="" aria-hidden="true" loading="lazy" />
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
                    <span
                      className={`arrow ${selectedRole.id === role.id ? "unhide" : ""}`}
                    >
                      ↪
                    </span>{" "}
                    {role.role}
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
            <div className="about-image" ref={workRef}>
              <div
                className={`bar-row row-1 ${workInView ? "play" : ""}`}
              ></div>
              <img src={hyperImage} alt="" aria-hidden="true" loading="lazy" />
            </div>
          </div>
          <div className="about-card">
            <div className="about-card-text">
              <h3>Interests.</h3>
              <p>
                I’m currently exploring{" "}
                <span className="highlight">AI and machine learning</span> from
                the ground up, building a foundation in theory while applying
                what I learn practically. I’m particularly interested in AI’s
                potential to automate time-consuming tasks and expand access to
                opportunities in{" "}
                <span className="highlight">
                  education, healthcare, and infrastructure
                </span>
                . Outside of engineering, I love{" "}
                <span className="highlight">reading</span> widely. I enjoy
                encountering different perspectives, ideas, cultures, and
                periods of history—curiosity that shapes how I approach both
                technology and the world around me.
              </p>
            </div>
            <div className="about-image" ref={interestsRef}>
              <div
                className={`bar-row row-1 ${interestsInView ? "play" : ""}`}
              ></div>
              <img src={hyperImage} alt="" aria-hidden="true" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // honeypot — stays empty for real users
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "", website: "" });
      } else {
        setStatus("error");
        setErrorMessage(
          result.error || "Something went wrong. Please try again.",
        );
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Could not reach the server. Please try again later.");
    }
  };

  return (
    <section className="contact-section" id="contact-section">
      <div className="small-header">Contact Me</div>
      <h2>Let's Work Together.</h2>
      <p>
        I’m always open to new opportunities, collaborations, and meaningful
        projects. If you have an idea or would like to work together, I’d love
        to hear from you.
      </p>
      <div className="contact-form-glow">
        <div className="contact-form-container">
          <div className="art-container">
            <div className="art-2">
              <AsciiReveal />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <h3>Let's Build Something Meaningful.</h3>
            <fieldset>
              <label>
                Name
                <input
                  name="name"
                  placeholder="John Appleseed"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  placeholder="johnappleseed@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
            </fieldset>
            <label>Message</label>
            <textarea
              name="message"
              rows="9"
              placeholder="Message..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            {/* Honeypot field — hidden from real users via CSS, bots fill it in */}
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              tabIndex="-1"
              autoComplete="off"
              style={{ position: "absolute", left: "-9999px" }}
              aria-hidden="true"
            />

            <button
              type="submit"
              className="btn-primary submit-btn"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending..." : "Submit"}
            </button>

            {status === "success" && (
              <p className="form-status success">
                Thanks — your message has been sent. I'll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="form-status error">{errorMessage}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <img src={kLogo} className="footer-logo" alt="yellow k logo" />
          <p>
            Building things at the intersection of design, code, and wellbeing.
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>Navigate</h4>
            <a href="#project-section">Projects</a>
            <a href="#about-section">About Me</a>
            <a href="#contact-section">Contact</a>
          </div>

          <div className="footer-col">
            <h4>Elsewhere</h4>
            <a
              href="https://github.com/keiomarah"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗︎
            </a>
            <a
              href="https://www.linkedin.com/in/keiomarah-chigudu-48466a16b/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗︎
            </a>
            <a href="mailto:keiomarah@hotmail.com">Email ↗︎</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Keiomarah Chigudu. All rights reserved.
        </p>
        <a href="#" className="back-to-top">
          Back to top ↑
        </a>
      </div>
    </footer>
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
      <Footer />
    </>
  );
}

export default App;
