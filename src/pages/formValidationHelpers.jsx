// Regular Expressions
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

// Date/Time Check Helpers

/**
 * Checks if the given date is today.
 * @param {Date} someDate - The date to check.
 * @returns {boolean} True if the date is today.
 */
export const isToday = (someDate) => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

/**
 * Checks if the given date string is in the past (relative to today).
 * @param {string} dateString - The date string (e.g., 'YYYY-MM-DD').
 * @returns {boolean} True if the date is in the past.
 */
export const isPastDate = (dateString) => {
  const selectedDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time part for accurate date comparison
  return selectedDate < today;
};

/**
 * Checks if the given time string is in the past, only if the date is today.
 * @param {string} dateString - The date string.
 * @param {string} timeString - The time string (e.g., 'HH:MM').
 * @returns {boolean} True if the time is in the past and the date is today.
 */
export const isPastTime = (dateString, timeString) => {
  if (!dateString || !timeString) return false;

  const selectedDate = new Date(dateString);

  if (isToday(selectedDate)) {
    const [hours, minutes] = timeString.split(":");
    const selectedDateTime = new Date();
    selectedDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    const now = new Date();
    return selectedDateTime < now;
  }
  return false;
};

// --- Full Form Validation Logic ---

/**
 * Validates all fields in the form data and returns an object of errors.
 * @param {object} formData - The current state of the form data.
 * @returns {object} An object where keys are field names and values are error messages.
 */
export const validateAllFields = (formData) => {
  let errors = {};

  // First Name
  if (!formData['first-name'].trim()) {
    errors['first-name'] = "First name is required.";
  }

  // Last Name
  if (!formData['last-name'].trim()) {
    errors['last-name'] = "Last name is required.";
  }

  // Email
  if (!formData.email.trim()) {
    errors.email = "Email is required.";
  } else if (!emailRegex.test(formData.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  // Phone
  if (!formData.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!phoneRegex.test(formData.phone.trim())) {
    errors.phone = "Please enter a valid phone number (e.g., 123-456-7890).";
  }

  // People (Select dropdown)
  if (!formData.people) {
    errors.people = "Select number of people";
  }

  // Date
  if (!formData.date) {
    errors.date = "Please select a date.";
  } else if (isPastDate(formData.date)) {
    errors.date = "Please select a future date.";
  }

  // Time
  if (!formData.time) {
    errors.time = "Please select a time.";
  } else if (formData.date && isPastTime(formData.date, formData.time)) {
    errors.time = "Please select a future time.";
  }

  return errors;
};