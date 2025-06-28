import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../services/api';

const influencerCategories = [
  'Lifestyle Influencers',
  'Fashion and Beauty Influencers',
  'Food & Cooking Influencers',
  'Fitness & Health Influencers',
  'Travel Influencers',
  'Tech & Gadget Influencers',
  'Gaming Influencers',
  'Education & Informational Influencers',
  'Business & Entrepreneurship Influencers',
  'Entertainment & Comedy Influencers',
  'Art & Creativity Influencers',
  'Pet Influencers'
];

function InfluencerRegistration() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    location: '',
    instagram: '',
    instagram_followers: '',
    facebook: '',
    facebook_followers: '',
    youtube: '',
    youtube_followers: '',
    twitter: '',
    twitter_followers: '',
    category: '',
    termsAccepted: false
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.match('image.*')) {
        setErrors({
          ...errors,
          profileImage: 'Please select an image file (png, jpg, jpeg, gif)'
        });
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({
          ...errors,
          profileImage: 'Image size should be less than 5MB'
        });
        return;
      }
      
      setProfileImage(file);
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Clear error
      if (errors.profileImage) {
        setErrors({
          ...errors,
          profileImage: null
        });
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s\-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    
    // At least one social media handle
    if (!formData.instagram && !formData.facebook && !formData.youtube && !formData.twitter) {
      newErrors.socialMedia = 'At least one social media handle is required';
    }
    
    // Category selection
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    // Terms acceptance
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Format data for API
      const influencerData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        location: formData.location,
        instagram: formData.instagram || null,
        instagram_followers: formData.instagram_followers ? parseInt(formData.instagram_followers) : null,
        facebook: formData.facebook || null,
        facebook_followers: formData.facebook_followers ? parseInt(formData.facebook_followers) : null,
        youtube: formData.youtube || null,
        youtube_followers: formData.youtube_followers ? parseInt(formData.youtube_followers) : null,
        x: formData.twitter || null, // Twitter is stored as 'x' in the database
        x_followers: formData.twitter_followers ? parseInt(formData.twitter_followers) : null,
        category: formData.category
      };
      
      // Call API to create influencer
      const result = await api.createInfluencer(influencerData);
      
      // If we have a profile image, upload it and link to the influencer
      if (profileImage) {
        const uploadResult = await api.uploadProfileImage(profileImage, result[0].id);
        console.log('Image uploaded:', uploadResult);
      }
      
      console.log('Influencer created:', result);
      setIsSuccess(true);
      
      // Redirect to landing page after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error creating influencer:', error);
      setErrors({
        submit: 'Failed to submit your registration. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderImageUploadSection = () => {
    return (
      <div style={{ marginBottom: '20px' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '8px',
          fontSize: '14px',
          fontWeight: '500',
          color: '#333'
        }}>
          Profile Photo
        </label>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Image preview */}
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            border: '1px dashed #ccc',
            marginRight: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundColor: '#f9f9f9'
          }}>
            {imagePreview ? (
              <img 
                src={imagePreview} 
                alt="Profile Preview" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <span style={{ fontSize: '24px', color: '#ccc' }}>📷</span>
            )}
          </div>
          
          {/* Upload button */}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              style={{
                padding: '10px 15px',
                backgroundColor: '#f5f5f5',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Choose Photo
            </button>
            <p style={{ 
              fontSize: '12px', 
              color: '#666', 
              marginTop: '5px' 
            }}>
              JPG, PNG or GIF, max 5MB
            </p>
            {errors.profileImage && (
              <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                {errors.profileImage}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderSocialMediaSection = () => {
    return (
      <div style={{ marginBottom: '20px' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '8px',
          fontSize: '14px',
          fontWeight: '500',
          color: '#333'
        }}>
          Social Media Profiles
        </label>
        
        {/* Instagram */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          marginBottom: '15px',
          gap: '15px'
        }}>
          <div style={{ flex: 2 }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px',
              fontSize: '13px',
              color: '#666'
            }}>
              Instagram Handle
            </label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ 
                padding: '8px 10px',
                backgroundColor: '#f5f5f5',
                borderRadius: '5px 0 0 5px',
                border: '1px solid #ddd',
                borderRight: 'none',
                color: '#666'
              }}>@</span>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                placeholder="username"
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  border: '1px solid #ddd',
                  borderRadius: '0 5px 5px 0',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          </div>
          
          <div style={{ flex: 1 }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px',
              fontSize: '13px',
              color: '#666'
            }}>
              Followers
            </label>
            <input
              type="number"
              name="instagram_followers"
              value={formData.instagram_followers}
              onChange={handleChange}
              placeholder="0"
              min="0"
              style={{
                width: '100%',
                padding: '8px 10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
        </div>
        
        {/* Facebook */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          marginBottom: '15px',
          gap: '15px'
        }}>
          <div style={{ flex: 2 }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px',
              fontSize: '13px',
              color: '#666'
            }}>
              Facebook Username
            </label>
            <input
              type="text"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              placeholder="username"
              style={{
                width: '100%',
                padding: '8px 10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
          
          <div style={{ flex: 1 }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px',
              fontSize: '13px',
              color: '#666'
            }}>
              Followers
            </label>
            <input
              type="number"
              name="facebook_followers"
              value={formData.facebook_followers}
              onChange={handleChange}
              placeholder="0"
              min="0"
              style={{
                width: '100%',
                padding: '8px 10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
        </div>
        
        {/* YouTube */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          marginBottom: '15px',
          gap: '15px'
        }}>
          <div style={{ flex: 2 }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px',
              fontSize: '13px',
              color: '#666'
            }}>
              YouTube Channel
            </label>
            <input
              type="text"
              name="youtube"
              value={formData.youtube}
              onChange={handleChange}
              placeholder="channel name"
              style={{
                width: '100%',
                padding: '8px 10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
          
          <div style={{ flex: 1 }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px',
              fontSize: '13px',
              color: '#666'
            }}>
              Subscribers
            </label>
            <input
              type="number"
              name="youtube_followers"
              value={formData.youtube_followers}
              onChange={handleChange}
              placeholder="0"
              min="0"
              style={{
                width: '100%',
                padding: '8px 10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
        </div>
        
        {/* X (Twitter) */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          marginBottom: '15px',
          gap: '15px'
        }}>
          <div style={{ flex: 2 }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px',
              fontSize: '13px',
              color: '#666'
            }}>
              X (Twitter) Handle
            </label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ 
                padding: '8px 10px',
                backgroundColor: '#f5f5f5',
                borderRadius: '5px 0 0 5px',
                border: '1px solid #ddd',
                borderRight: 'none',
                color: '#666'
              }}>@</span>
              <input
                type="text"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                placeholder="username"
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  border: '1px solid #ddd',
                  borderRadius: '0 5px 5px 0',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          </div>
          
          <div style={{ flex: 1 }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px',
              fontSize: '13px',
              color: '#666'
            }}>
              Followers
            </label>
            <input
              type="number"
              name="twitter_followers"
              value={formData.twitter_followers}
              onChange={handleChange}
              placeholder="0"
              min="0"
              style={{
                width: '100%',
                padding: '8px 10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
        </div>
        
        {errors.socialMedia && (
          <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
            {errors.socialMedia}
          </p>
        )}
      </div>
    );
  };

  if (isSuccess) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        backgroundColor: '#f5f7fa',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '40px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '500px',
          width: '100%'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#e6f7ef',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '40px'
          }}>
            ✓
          </div>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: '700',
            marginBottom: '15px',
            color: '#333'
          }}>Registration Successful!</h2>
          <p style={{ 
            fontSize: '16px',
            color: '#666',
            marginBottom: '30px',
            lineHeight: '1.5'
          }}>
            Thank you for registering as an influencer. Your application has been submitted successfully and is under review.
          </p>
          <p style={{ fontSize: '14px', color: '#888' }}>
            Redirecting to landing page...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh',
      backgroundColor: '#f5f7fa',
      fontFamily: 'Inter, system-ui, sans-serif',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '1000px',
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: '700',
            marginBottom: '10px',
            color: '#333'
          }}>
            Influencer Registration
          </h1>
          <p style={{ 
            fontSize: '16px',
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Join our influencer network and collaborate on exciting campaigns
          </p>
        </div>

        {/* Form */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '30px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
        }}>
          <form onSubmit={handleSubmit}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '20px',
              marginBottom: '30px'
            }}>
              {/* Personal Information */}
              <div>
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: '600',
                  marginBottom: '20px',
                  color: '#333',
                  borderBottom: '1px solid #eaeaea',
                  paddingBottom: '10px'
                }}>
                  Personal Information
                </h3>

                <div style={{ marginBottom: '20px' }}>
                  <label 
                    htmlFor="name"
                    style={{ 
                      display: 'block',
                      marginBottom: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#333'
                    }}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      fontSize: '14px',
                      border: errors.name ? '1px solid #f44336' : '1px solid #ddd',
                      borderRadius: '6px',
                      backgroundColor: '#fff'
                    }}
                  />
                  {errors.name && (
                    <div style={{ color: '#f44336', fontSize: '12px', marginTop: '5px' }}>
                      {errors.name}
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label 
                    htmlFor="email"
                    style={{ 
                      display: 'block',
                      marginBottom: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#333'
                    }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      fontSize: '14px',
                      border: errors.email ? '1px solid #f44336' : '1px solid #ddd',
                      borderRadius: '6px',
                      backgroundColor: '#fff'
                    }}
                  />
                  {errors.email && (
                    <div style={{ color: '#f44336', fontSize: '12px', marginTop: '5px' }}>
                      {errors.email}
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label 
                    htmlFor="phone"
                    style={{ 
                      display: 'block',
                      marginBottom: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#333'
                    }}
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      fontSize: '14px',
                      border: errors.phone ? '1px solid #f44336' : '1px solid #ddd',
                      borderRadius: '6px',
                      backgroundColor: '#fff'
                    }}
                  />
                  {errors.phone && (
                    <div style={{ color: '#f44336', fontSize: '12px', marginTop: '5px' }}>
                      {errors.phone}
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label 
                    htmlFor="gender"
                    style={{ 
                      display: 'block',
                      marginBottom: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#333'
                    }}
                  >
                    Gender *
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      fontSize: '14px',
                      border: errors.gender ? '1px solid #f44336' : '1px solid #ddd',
                      borderRadius: '6px',
                      backgroundColor: '#fff'
                    }}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                  {errors.gender && (
                    <div style={{ color: '#f44336', fontSize: '12px', marginTop: '5px' }}>
                      {errors.gender}
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label 
                    htmlFor="location"
                    style={{ 
                      display: 'block',
                      marginBottom: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#333'
                    }}
                  >
                    Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, State, Country"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      fontSize: '14px',
                      border: errors.location ? '1px solid #f44336' : '1px solid #ddd',
                      borderRadius: '6px',
                      backgroundColor: '#fff'
                    }}
                  />
                  {errors.location && (
                    <div style={{ color: '#f44336', fontSize: '12px', marginTop: '5px' }}>
                      {errors.location}
                    </div>
                  )}
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: '600',
                  marginBottom: '20px',
                  color: '#333',
                  borderBottom: '1px solid #eaeaea',
                  paddingBottom: '10px'
                }}>
                  Social Media Handles
                </h3>
                <p style={{ 
                  fontSize: '13px',
                  color: '#666',
                  marginBottom: '15px'
                }}>
                  Please provide at least one social media handle
                </p>

                {renderSocialMediaSection()}
              </div>
            </div>

            {/* Categories */}
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600',
                marginBottom: '15px',
                color: '#333',
                borderBottom: '1px solid #eaeaea',
                paddingBottom: '10px'
              }}>
                Influencer Categories
              </h3>
              <p style={{ 
                fontSize: '13px',
                color: '#666',
                marginBottom: '15px'
              }}>
                Select your primary content category *
              </p>

              <div style={{ marginBottom: '20px' }}>
                <label 
                  htmlFor="category"
                  style={{ 
                    display: 'block',
                    marginBottom: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#333'
                  }}
                >
                  Primary Content Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    fontSize: '14px',
                    border: errors.category ? '1px solid #f44336' : '1px solid #ddd',
                    borderRadius: '6px',
                    backgroundColor: '#fff'
                  }}
                >
                  <option value="">Select your primary content category</option>
                  {influencerCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <div style={{ color: '#f44336', fontSize: '12px', marginTop: '5px' }}>
                    {errors.category}
                  </div>
                )}
              </div>
            </div>

            {/* Image Upload */}
            {renderImageUploadSection()}

            {/* Terms and Submit */}
            <div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start',
                marginBottom: '20px'
              }}>
                <input
                  type="checkbox"
                  id="termsAccepted"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleCheckboxChange}
                  style={{ 
                    marginRight: '10px',
                    marginTop: '3px'
                  }}
                />
                <label 
                  htmlFor="termsAccepted"
                  style={{ 
                    fontSize: '14px',
                    lineHeight: '1.5',
                    color: errors.termsAccepted ? '#f44336' : '#333'
                  }}
                >
                  I agree to the <Link to="/terms" style={{ color: '#0077b5', textDecoration: 'none' }}>Terms and Conditions</Link> and <Link to="/privacy" style={{ color: '#0077b5', textDecoration: 'none' }}>Privacy Policy</Link>.
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: '#ff6b4a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 24px',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting ? 0.7 : 1,
                    transition: 'all 0.2s'
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Register as Influencer'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InfluencerRegistration; 