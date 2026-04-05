import React from 'react';

const Skills = ({ data, isEditing, setDraft }) => {
  const handleChange = (e) => {
    // Preserve formatting during edits, splits by comma to form the array state behind the scenes
    setDraft(prev => ({ 
      ...prev, 
      skills: e.target.value.split(',').map(s => s.trimStart()) 
    }));
  };

  return (
    <section id="skills" className="skills-section">
      <h2>My Skills</h2>
      {isEditing ? (
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '15px' }}>
          <label style={{display: 'block', marginBottom: '1rem', color: '#94a3b8'}}>Comma Separated Skills</label>
          <textarea 
            className="edit-input edit-textarea" 
            value={data.skills.join(', ')} 
            onChange={handleChange} 
            placeholder="React, CSS, HTML..."
          />
        </div>
      ) : (
        <div className="skills-container">
          {data.skills.map((skill, index) => (
            skill.trim() && <div key={index} className="skill-tag">{skill}</div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Skills;
