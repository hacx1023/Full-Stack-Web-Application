import React from 'react';

const Projects = ({ data, isEditing, setDraft }) => {
  const handleProjChange = (index, field, value) => {
    const updatedProj = [...data.projects];
    if(field === 'technologies') {
        updatedProj[index][field] = value.split(',').map(s => s.trimStart());
    } else {
        updatedProj[index][field] = value;
    }
    setDraft(prev => ({ ...prev, projects: updatedProj }));
  };

  const addProject = () => {
    setDraft(prev => ({
      ...prev,
      projects: [...prev.projects, { title: '', description: '', technologies: [], link: '' }]
    }));
  };

  const removeProject = (index) => {
    const updatedProj = [...data.projects];
    updatedProj.splice(index, 1);
    setDraft(prev => ({ ...prev, projects: updatedProj }));
  };

  return (
    <section id="projects" className="projects-section">
      <h2>Featured Projects</h2>
      <div className="projects-grid">
        {data.projects.map((proj, index) => (
          <div key={index} className="project-card">
            {isEditing ? (
               <>
                 <label>Project Title</label>
                 <input className="edit-input" value={proj.title} onChange={(e) => handleProjChange(index, 'title', e.target.value)} />
                 <label>Project Description</label>
                 <textarea className="edit-input edit-textarea" value={proj.description} onChange={(e) => handleProjChange(index, 'description', e.target.value)} />
                 <label>Technologies (Comma separated)</label>
                 <input className="edit-input" value={proj.technologies.join(', ')} onChange={(e) => handleProjChange(index, 'technologies', e.target.value)} />
                 <label>Link URL</label>
                 <input className="edit-input" value={proj.link} onChange={(e) => handleProjChange(index, 'link', e.target.value)} />
                 <button onClick={() => removeProject(index)} style={{background: '#ef4444', padding: '8px 15px', borderRadius: '5px', color:'white', border:'none', cursor:'pointer', marginTop:'15px'}}>Remove Project</button>
               </>
            ) : (
                <>
                  <h3>{proj.title}</h3>
                  <p>{proj.description}</p>
                  <div className="project-tech">
                    {proj.technologies.map((tech, i) => (
                        tech.trim() && <span key={i}>{tech}</span>
                    ))}
                  </div>
                  <a href={proj.link} className="project-link" target="_blank" rel="noopener noreferrer">
                    View Project <span>→</span>
                  </a>
                </>
            )}
          </div>
        ))}
        {isEditing && (
          <div style={{display:'flex', justifyContent:'center', alignItems:'center', border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '15px', minHeight: '200px', cursor:'pointer'}} onClick={addProject}>
            <button className="btn">+ Add Project</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
