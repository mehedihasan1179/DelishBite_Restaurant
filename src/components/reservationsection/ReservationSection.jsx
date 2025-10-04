import React, { useState, useEffect, useCallback } from 'react';
// Assuming this import path is correct for your project structure
import { 
  validateAllFields 
} from '../../pages/formValidationHelpers'; 
import PrimaryButton from '../../pages/PrimaryButton';

import videoSrc from '../../assets/Direk Mandy Reyes Food Reel 2017.mp4';

// Initial state for form data
const initialFormData = {
  'first-name': '',
  'last-name': '',
  email: '',
  phone: '',
  people: '',
  date: '',
  time: '',
  'additional-info': '',
};

const ReservationSection = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [minDate, setMinDate] = useState('');

  // --- 1. Set Minimum Date on Mount ---
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    setMinDate(`${year}-${month}-${day}`);
  }, []);

  // --- 2. Input Change Handler ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update the form data state
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear the error for this field as the user starts typing/selecting
    // This is optional but good UX
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  // --- 3. Blur Handler (Uses useCallback to always access the latest formData) ---
  const handleBlur = useCallback((e) => {
    const { name } = e.target;

    // We pass the current formData to validateAllFields to get up-to-date validation for the whole form.
    // If you only want to validate the single field, you'd call a specific helper.
    const currentErrors = validateAllFields(formData); 
    
    // Only update the errors state for the field that was just blurred
    setErrors(prev => ({ ...prev, [name]: currentErrors[name] }));
    
  }, [formData]); // Dependency on formData ensures handleBlur is recreated when formData changes

  // --- 4. Submit Handler (Uses useCallback for stability) ---
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    // Run final validation on the entire form data
    const validationErrors = validateAllFields(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("Reservation submitted successfully! We'll contact you soon.");
      
      // Reset form and state
      setFormData(initialFormData);
      setErrors({});
    }
    
  }, [formData]); // Dependency on formData ensures handleSubmit uses the latest form data
  
  // Helper to determine the 'active' class for styling 
  const isFieldActive = (name) => {
    return !!formData[name];
  };

  const InputGroup = ({ name, type = 'text', label, isSelect = false, options = [] }) => {
    const isError = errors[name];
    
    // The 'active' class mimics the original float label behavior
    const activeClass = isFieldActive(name) ? 'active' : '';

    // The 'has-value' class is usually needed for date/time inputs to style them when selected
    const valueClass = (name === 'date' || name === 'time') && formData[name] ? 'has-value' : '';
    
    return (
      <div className={`form-group ${name === 'first-name' || name === 'last-name' ? 'form-group-half' : ''}`}>
        {isSelect ? (
          <select 
            id={name} 
            name={name} 
            // Correctly apply activeClass to select
            className={`input-group ${activeClass}`}
            value={formData[name]}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="" disabled></option>
            {options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            id={name}
            name={name}
            // Correctly apply activeClass and valueClass to input
            className={`input-group ${activeClass} ${valueClass}`}
            value={formData[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            min={name === 'date' ? minDate : undefined}
          />
        )}
        {/* Field Label: Apply activeClass to the label as well */}
        <span className={`${name} field-label ${activeClass}`}>{label}</span>
        {isError && <p className="error-message">{isError}</p>}
      </div>
    );
  };
  
  return (
    <section id="reservation-section" className="reservation-section">
      <div className="container">
        <div className="text-view">
          <h2>Make a Reservation</h2>
          <p className="des">
            Book your table today and enjoy an unforgettable dining experience at DelishBite.
          </p>
        </div>
        <div className="reservation-container">
          <div className="left-form">
            <form id="reservation-form" onSubmit={handleSubmit}>
              
              {/* Form Groups using the InputGroup component */}
              <div className="form-group form-group-row">
                <InputGroup name="first-name" label="First Name" />
                <InputGroup name="last-name" label="Last Name" />
              </div>
              
              <div className="form-group">
                <InputGroup name="email" type="email" label="Email" />
              </div>

              <div className="form-group">
                <InputGroup name="phone" type="tel" label="Phone" />
              </div>

              <div className="form-group form-group-row">
                <div className="form-group-third form-group">
                  <InputGroup 
                    name="people" 
                    label="No. of people" 
                    isSelect={true}
                    options={['1', '2', '3', '4', '5', '6+']}
                  />
                </div>
                <div className="form-group-third form-group">
                  <InputGroup name="date" type="date" label="Date" />
                </div>
                <div className="form-group-third form-group">
                  <InputGroup name="time" type="time" label="Time" />
                </div>
              </div>
              
              {/* Additional Info (Textarea) */}
              <div className="form-group">
                <p className="additional-info">Additional Information</p>
                <textarea
                  id="additional-info"
                  name="additional-info"
                  rows="4"
                  value={formData['additional-info']}
                  onChange={handleChange}
                ></textarea>
              </div>

              <PrimaryButton type="submit" className="primary-btn">
                Make a Reservation
              </PrimaryButton>
            </form>
          </div>
          
          {/* Right Video Section */}
          <div className="right-video">
            <video className="fullscreen-video" autoPlay muted loop playsInline controls>
              <source
                src={videoSrc}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReservationSection;