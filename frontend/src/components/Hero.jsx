import React, { useState, useCallback } from 'react';
import axios from 'axios';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../utils/cropUtils';

const Hero = ({ data, isEditing, setDraft }) => {
  const [uploading, setUploading] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleChange = (e, field) => {
    setDraft(prev => ({ ...prev, [field]: e.target.value }));
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };

  // Helper reader
  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  const confirmCropAndUpload = async () => {
    try {
      setUploading(true);
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      
      const formData = new FormData();
      formData.append('image', croppedImageBlob, 'profile.jpg');

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const res = await axios.post('/api/upload', formData, config);
      
      setDraft(prev => ({ ...prev, avatar: res.data }));
      setImageSrc(null); // close modal
      setUploading(false);
    } catch (e) {
      console.error(e);
      setUploading(false);
      alert('Failed to crop and upload image.');
    }
  };

  return (
    <section id="hero" className="hero" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{
          width: '150px', height: '150px', borderRadius: '50%', marginBottom: '2rem',
          background: data?.avatar ? `url(${data.avatar}) center/cover no-repeat` : 'rgba(255, 255, 255, 0.1)',
          boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)',
          border: '4px solid rgba(255,255,255,0.2)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden'
      }}>
        {!data?.avatar && <span style={{ color: '#aaa', fontSize: '0.8rem' }}>No Avatar</span>}
      </div>

      {isEditing ? (
        <>
          <label style={{ cursor: 'pointer', background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '20px', marginBottom: '2rem' }}>
            📸 Change Photo
            <input type="file" onChange={onFileChange} style={{ display: 'none' }} accept="image/*" />
          </label>
          <label>Role</label>
          <input 
            className="edit-input" 
            value={data?.role || ''} 
            onChange={(e) => handleChange(e, 'role')} 
            style={{ textAlign: 'center', marginBottom: '1rem', width: '300px' }}
          />
          <label>Name</label>
          <input 
            className="edit-input" 
            value={data?.name || ''} 
            onChange={(e) => handleChange(e, 'name')} 
            style={{ fontSize: '3rem', fontWeight:'800', textAlign:'center', marginBottom: '1rem' }}
          />
          <label>Bio Dashboard Details</label>
          <textarea 
            className="edit-input edit-textarea" 
            value={data?.bio || ''} 
            onChange={(e) => handleChange(e, 'bio')} 
            style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}
          />
        </>
      ) : (
        <>
          <p className="role">{data?.role || 'Guest'}</p>
          <h1>Hi, I'm {data?.name || 'User'}</h1>
          <p className="hero-bio">{data?.bio || 'Welcome to my portfolio.'}</p>
        </>
      )}
      {!isEditing && <a href="#projects" className="btn">View My Work</a>}

      {/* CROP MODAL OVERLAY */}
      {imageSrc && (
        <div className="crop-modal-overlay">
          <div className="crop-modal-content">
            <h3 style={{ marginBottom: '1rem' }}>Adjust Photo</h3>
            <div className="crop-container">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className="controls">
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e) => setZoom(e.target.value)}
              />
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setImageSrc(null)}>Cancel</button>
              <button className="btn-primary" onClick={confirmCropAndUpload} disabled={uploading}>
                {uploading ? 'Processing...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
