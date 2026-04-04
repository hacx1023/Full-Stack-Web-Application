import React from 'react';

const About = ({ data, isEditing, setDraft }) => {
  const handleExpChange = (index, field, value) => {
    const updatedExp = [...data.experience];
    updatedExp[index][field] = value;
    setDraft(prev => ({ ...prev, experience: updatedExp }));
  };

  const addExperience = () => {
    setDraft(prev => ({
      ...prev,
      experience: [...prev.experience, { company: '', role: '', duration: '', description: '' }]
    }));
  };

  const removeExperience = (index) => {
    const updatedExp = [...data.experience];
    updatedExp.splice(index, 1);
    setDraft(prev => ({ ...prev, experience: updatedExp }));
  };

  return (
    <section id="about" className="about-section">
      <h2>About Me</h2>
      <div className="about-grid">
        <div className="about-text">
          {isEditing ? (
            <textarea
              className="edit-input edit-textarea"
              value={data?.aboutText || ''}
              onChange={(e) => setDraft(prev => ({ ...prev, aboutText: e.target.value }))}
              style={{ width: '100%', minHeight: '200px' }}
              placeholder="Write a detailed description about your background and experience..."
            />
          ) : (
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>
              {data?.aboutText || 'Welcome to my about section!'}
            </div>
          )}
        </div>
        <div className="experience-list">
          {data.experience.map((exp, index) => (
            <div key={index} className="experience-card">
              {isEditing ? (
                <>
                  <input className="edit-input" placeholder="Role (e.g. Senior Dev)" value={exp.role} onChange={(e) => handleExpChange(index, 'role', e.target.value)} />
                  <input className="edit-input" placeholder="Company Name" value={exp.company} onChange={(e) => handleExpChange(index, 'company', e.target.value)} />
                  <input className="edit-input" placeholder="Duration (e.g. 2020 - 2023)" value={exp.duration} onChange={(e) => handleExpChange(index, 'duration', e.target.value)} />
                  <textarea className="edit-input edit-textarea" placeholder="Responsibilities Description" value={exp.description} onChange={(e) => handleExpChange(index, 'description', e.target.value)} />
                  <button onClick={() => removeExperience(index)} style={{background: '#ef4444', padding: '5px 15px', borderRadius: '5px', color:'white', border:'none', cursor:'pointer', marginTop:'10px'}}>Remove</button>
                </>
              ) : (
                <>
                  <h4>{exp.role}</h4>
                  <p className="company">{exp.company}</p>
                  <p className="duration">{exp.duration}</p>
                  <p className="desc">{exp.description}</p>
                </>
              )}
            </div>
          ))}
          
          {isEditing && (
            <button onClick={addExperience} className="btn" style={{marginTop: '1rem', width: '100%'}}>+ Add Experience</button>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
