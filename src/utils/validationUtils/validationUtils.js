
export const validateField = (name, value) => {
    const errors = {};
    
    switch (name) {
      case 'name':
      case 'surname':
      case 'contactName':
      case 'contactSurname':
        if (!value.trim()) {
          errors[name] = 'This field is required';
        } else if (!/^[a-zA-Z\s-']+$/.test(value)) {
          errors[name] = 'Only letters, spaces, hyphens and apostrophes allowed';
        }
        else{
          errors[name] = "";
        }
        break;
        
      case 'birthday':
        if (!value) {
          errors[name] = 'Birthday is required';
        } else {
          const birthDate = new Date(value);
          const today = new Date();
          const minDate = new Date();
          minDate.setFullYear(today.getFullYear() - 120);
          
          if (birthDate > today) {
            errors[name] = 'Birthday cannot be in the future';
          } else if (birthDate < minDate) {
            errors[name] = 'Please enter a valid date';
          }
          else{
            errors[name] = "";
          }
        }
        break;
        
      case 'passportNumber':
        if (!value.trim()) {
          errors[name] = 'Passport number is required';
        } else if (!/^[a-zA-Z0-9]{6,20}$/.test(value)) {
          errors[name] = 'Passport number must be 6-20 alphanumeric characters';
        }
        else{
          errors[name] = "";
        }
        break;
        
      case 'passportExpiryDate':
        if (!value) {
          errors[name] = 'Expiry date is required';
        } else {
          const expiryDate = new Date(value);
          const today = new Date();
          
          if (expiryDate <= today) {
            errors[name] = 'Passport must be valid';
          }
          else{
            errors[name] = '';
          }
        }
        break;
        
      case 'email':
        if (!value.trim()) {
          errors[name] = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors[name] = 'Please enter a valid email address';
        }
        else{
          errors[name] = "";
        }
        break;
        
      case 'phoneNumber':
        if (!value.trim()) {
          errors[name] = 'Phone number is required';
        } else if (!/^0\d{8}$/.test(value)) {
          
          errors[name] = 'Please enter a valid phone number';
        }
       
        else{
          errors[name] = "";
        }
        break;
        
      case 'nationality':
      case 'country':
        if (!value) {
          console.log(value);
          errors[name] = 'This field is required';
        }
        else{
          errors[name] = "";
        }
        break;
    }

    
    
    return errors;
  };

  
  export const validateForm = (formData) => {
    const errors = {};
    
    Object.keys(formData).forEach(field => {
      const fieldErrors = validateField(field, formData[field]);
      if (fieldErrors[field]) {
        errors[field] = fieldErrors[field];
      }
    });
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };