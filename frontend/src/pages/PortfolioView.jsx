import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import '../edit.css';

function PortfolioView() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  useEffect(() => {
    // Initial mock load
    const mockData = {
      name: "Alex Developer",
      role: "Senior Full Stack Engineer",
      bio: "Passionate software engineer with 5+ years of experience building scalable web applications.",
      aboutText: "I am a dedicated professional with a strong track record of delivering high-quality, scalable solutions. My expertise spans both frontend and backend development, enabling me to build seamless, end-to-end applications.\n\nWith a focus on performance, best practices, and elegant design, I aim to create web experiences that are not only functional but also visually stunning and user-friendly. Let's build something amazing together.",
      skills: ["React", "Node.js", "MongoDB", "Express", "TypeScript"],
      experience: [
        {
          company: "Tech Solutions Inc.",
          role: "Senior Developer",
          duration: "2021 - Present",
          description: "Leading the frontend team in rebuilding the core platform using React."
        }
      ],
      projects: [
        {
          title: "E-Commerce Platform",
          description: "A full-featured online store with payment processing.",
          technologies: ["React", "Redux", "Node.js"],
          link: "#"
        }
      ],
      contact: {
        email: "alex@example.com",
        phone: "+1 (555) 123-4567",
        linkedin: "linkedin.com/in/alexdev",
        github: "github.com/alexdev"
      }
    };
    const fetchPortfolio = async () => {
      try {
        const res = await axios.get(`/api/portfolio/${userId}`);
        // DB data found!
        setPortfolio(res.data);
        setDraft(res.data);
        setLoading(false);
      } catch (err) {
        // Fallback to mock template if new user
        setPortfolio(mockData);
        setDraft(mockData);
        setLoading(false);
      }
    };
    
    fetchPortfolio();
  }, [userId]);

  const handleSave = async () => {
    try {
      await axios.put(`/api/portfolio/${userId}`, draft);
      setPortfolio(draft);
      setIsEditing(false);
      alert('Portfolio completely saved!');
    } catch (err) {
      console.error('Failed to save');
      alert('Failed to save portfolio to database!');
    }
  };

  const handleCancel = () => {
    setDraft(portfolio);
    setIsEditing(false);
  };

  if (loading || !draft) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-logo">Portfolio.</div>
        <div className="navbar-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          <button onClick={handleLogout} className="btn" style={{ marginLeft: '2rem', padding: '0.5rem 1.5rem', background: 'transparent', border: '1px solid var(--accent)', color: 'var(--text-primary)' }}>Logout</button>
        </div>
      </nav>
      
      {isEditing ? (
        <>
          <button onClick={handleSave} className="fab-save-btn">💾 Save Changes</button>
          <button onClick={handleCancel} className="fab-cancel-btn">✕ Cancel</button>
        </>
      ) : (
        <button onClick={() => setIsEditing(true)} className="fab-edit-btn">✎ Edit Dashboard</button>
      )}

      <main>
        <Hero data={draft} isEditing={isEditing} setDraft={setDraft} />
        <About data={draft} isEditing={isEditing} setDraft={setDraft} />
        <Skills data={draft} isEditing={isEditing} setDraft={setDraft} />
        <Projects data={draft} isEditing={isEditing} setDraft={setDraft} />
        <Contact data={draft} isEditing={isEditing} setDraft={setDraft} />
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} {draft.name}. Built with MERN Stack.</p>
      </footer>
    </div>
  );
}

export default PortfolioView;
