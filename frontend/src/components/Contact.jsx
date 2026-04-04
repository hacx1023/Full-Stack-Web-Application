import React from 'react';

const Contact = ({ data, isEditing, setDraft }) => {
  const handleChange = (e, field) => {
    setDraft(prev => ({ 
       ...prev, 
       contact: { ...prev.contact, [field]: e.target.value }
    }));
  };

  return (
    <section id="contact" className="contact-section">
      <h2>Get In Touch</h2>
      <div className="contact-container">
        {isEditing ? (
           <div style={{width: '100%', maxWidth: '450px', textAlign: 'left'}}>
             <label style={{color:'#94a3b8', display:'block', marginBottom:'5px'}}>Email Address</label>
             <input className="edit-input" value={data.contact.email} onChange={(e) => handleChange(e, 'email')} />
             
             <label style={{color:'#94a3b8', display:'block', marginBottom:'5px', marginTop:'15px'}}>Phone Number</label>
             <input className="edit-input" value={data.contact.phone} onChange={(e) => handleChange(e, 'phone')} />
             
             <label style={{color:'#94a3b8', display:'block', marginBottom:'5px', marginTop:'15px'}}>LinkedIn (URL without https://)</label>
             <input className="edit-input" value={data.contact.linkedin} onChange={(e) => handleChange(e, 'linkedin')} />
             
             <label style={{color:'#94a3b8', display:'block', marginBottom:'5px', marginTop:'15px'}}>GitHub (URL without https://)</label>
             <input className="edit-input" value={data.contact.github} onChange={(e) => handleChange(e, 'github')} />
           </div>
        ) : (
           <>
             <p>
               I'm currently looking for new opportunities. Whether you have a question or just want to say hi, 
               I'll try my best to get back to you!
             </p>
             <a href={`mailto:${data.contact.email}`} className="btn">Say Hello</a>
             <div className="social-links">
               {data.contact.github && (
                 <a href={`https://${data.contact.github}`} target="_blank" rel="noopener noreferrer">GitHub</a>
               )}
               {data.contact.linkedin && (
                 <a href={`https://${data.contact.linkedin}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>
               )}
               {data.contact.phone && <span>{data.contact.phone}</span>}
             </div>
           </>
        )}
      </div>
    </section>
  );
};

export default Contact;
