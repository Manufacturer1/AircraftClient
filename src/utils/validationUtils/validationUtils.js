
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

        case 'cardName':
       
          if (!value.trim()) {
            errors[name] = 'Cardholder name is required';
          } else if (!/^[a-zA-Z\s-']+$/.test(value)) {
            errors[name] = 'Only letters, spaces, hyphens and apostrophes allowed';
          } else if (value.trim().length < 2) {
            errors[name] = 'Name is too short';
          } else {
            errors[name] = "";
          }
          break;

          case 'cardNumber':
            if (!value.trim()) {
              errors[name] = 'Card number is required';
            } else if (!/^[0-9\s]{13,19}$/.test(value)) {
              errors[name] = 'Invalid card number';
            } else {
              // Luhn algorithm validation
              const strippedValue = value.replace(/\s+/g, '');
              if (!isValidLuhn(strippedValue)) {
                errors[name] = 'Invalid card number';
              } else {
                errors[name] = "";
              }
            }
            break;

            case 'expirationDate':
              if (!value.trim()) {
                errors[name] = 'Expiry date is required';
              } else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(value)) {
                errors[name] = 'Invalid format (MM/YY)';
              } else {
                const [month, year] = value.split('/');
                const expiry = new Date(`20${year}`, month, 1);
                const today = new Date();
                if (expiry < today) {
                  errors[name] = 'Card has expired';
                } else {
                  errors[name] = "";
                }
              }
              break;
              case 'cardCvv':
                if (!value.trim()) {
                  errors[name] = 'CVV is required';
                } else if (!/^[0-9]{3,4}$/.test(value)) {
                  errors[name] = 'CVV must be 3 or 4 digits';
                } else {
                  errors[name] = "";
                }
                break;
    }

    
    
    return errors;
  };

  const isValidLuhn = (cardNumber) => {
    let sum = 0;
    let alternate = false;
    
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i), 10);
        
        if (alternate) {
            digit *= 2;
            if (digit > 9) {
                digit = (digit % 10) + 1;
            }
        }
        
        sum += digit;
        alternate = !alternate;
    }
    
    return sum % 10 === 0;
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