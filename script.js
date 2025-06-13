    function createMatrixRain() {
      const matrixContainer = document.getElementById('matrixRain');
      matrixContainer.innerHTML = '';
      const characters =
        '01010101DATACYBERINDIADIGITALWORLDCRYPTOHACKERBINARYMATRIXCODESECURITYNETWORKCLOUDSERVERDATABASEHTMLCSSJAVASCRIPTPYTHONLINUXWINDOWSANDROIDIOSWEBSITEMOBILENETWORKSECURITYFIREWALLVPNENCRYPTION';

      for (let i = 0; i < 15; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = Math.random() * 100 + '%';
        column.style.animationDelay = Math.random() * 8 + 's';
        column.style.animationDuration = Math.random() * 3 + 5 + 's';

        let columnText = '';
        for (let j = 0; j < 20; j++) {
          columnText +=
            characters.charAt(Math.floor(Math.random() * characters.length)) +
            '\n';
        }
        column.textContent = columnText;

        matrixContainer.appendChild(column);
      }
    }

    // Show error message helper
    function showError(field, message) {
      removeError(field);
      const errorMessage = document.createElement('span');
      errorMessage.className = 'error-message';
      errorMessage.textContent = message;
      field.parentElement.appendChild(errorMessage);
    }

    // Remove error message helper
    function removeError(field) {
      const error = field.parentElement.querySelector('.error-message');
      if (error) {
        error.remove();
      }
    }

    // Enhanced form validation and submission
    function validateAndSubmit() {
      const requiredFields = [
        'firstName',
        'lastName',
        'title',
        'birthDate',
        'gender',
        'maritalStatus',
        'nationality',
        'education',
        'email',
        'phone',
        'password',
        'confirmPassword',
      ];

      let isValid = true;
      let firstInvalidField = null;

      // Clear previous errors and errors styles
      document.querySelectorAll('.form-input, .form-select').forEach((field) => {
        field.style.borderColor = 'rgba(0, 255, 65, 0.3)';
        field.style.boxShadow = '';
        removeError(field);
      });

      // Validate required fields
      requiredFields.forEach((fieldId) => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
          field.style.borderColor = '#ff0040';
          field.style.boxShadow = '0 0 0 3px rgba(255, 0, 64, 0.3)';
          showError(field, 'This field is required.');
          isValid = false;
          if (!firstInvalidField) firstInvalidField = field;
        }
      });

      // Check terms checkbox
      const termsCheckbox = document.getElementById('terms');
      const termsLabel = termsCheckbox.parentElement;
      if (!termsCheckbox.checked) {
        isValid = false;
        termsLabel.style.animation = 'shake 0.5s ease-in-out';
        // Add error message if not exists
        if (!termsLabel.querySelector('.error-message')) {
          const err = document.createElement('span');
          err.className = 'error-message';
          err.textContent = 'You must agree to the terms.';
          termsLabel.appendChild(err);
        }
      } else {
        termsLabel.style.animation = '';
        const err = termsLabel.querySelector('.error-message');
        if (err) err.remove();
      }

      // Validate email format
      const email = document.getElementById('email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email.value && !emailRegex.test(email.value)) {
        email.style.borderColor = '#ff0040';
        email.style.boxShadow = '0 0 0 3px rgba(255, 0, 64, 0.3)';
        showError(email, 'Please enter a valid email address.');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = email;
      }

      // Validate password strength
      const password = document.getElementById('password');
      if (password.value && password.value.length < 8) {
        password.style.borderColor = '#ff0040';
        password.style.boxShadow = '0 0 0 3px rgba(255, 0, 64, 0.3)';
        showError(password, 'Password must be at least 8 characters.');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = password;
      }

      // Validate password match
      const confirmPassword = document.getElementById('confirmPassword');
      if (
        password.value &&
        confirmPassword.value &&
        password.value !== confirmPassword.value
      ) {
        confirmPassword.style.borderColor = '#ff0040';
        confirmPassword.style.boxShadow = '0 0 0 3px rgba(255, 0, 64, 0.3)';
        showError(confirmPassword, "Passwords don't match.");
        isValid = false;
        if (!firstInvalidField) firstInvalidField = confirmPassword;
      }

      if (isValid) {
        // Animate progress to 100%
        document.getElementById('progressFill').style.width = '100%';

        // Show success message with delay
        setTimeout(() => {
          document.getElementById('personalSection').style.display = 'none';
          document.getElementById('successMessage').classList.add('show');
        }, 500);
      } else {
        // Scroll to first invalid field
        if (firstInvalidField) {
          firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstInvalidField.focus();
        }

        // Show error animation
        const form = document.querySelector('.registration-form');
        form.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
          form.style.animation = '';
        }, 500);
      }
    }

    // Add shake animation CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
      }
    `;
    document.head.appendChild(style);

    // Remove error styling on input/focus
    document.querySelectorAll('.form-input, .form-select').forEach((field) => {
      field.addEventListener('input', function () {
        this.style.borderColor = 'rgba(0, 255, 65, 0.3)';
        this.style.boxShadow = '';
        removeError(this);
      });

      field.addEventListener('focus', function () {
        this.style.borderColor = '#00ff41';
        this.style.boxShadow = '0 0 0 3px rgba(0, 255, 65, 0.2), 0 0 20px rgba(0, 255, 65, 0.3)';
      });
    });

    // Progress bar updates
    const inputs = document.querySelectorAll('.form-input, .form-select');
    const progressFill = document.getElementById('progressFill');

    inputs.forEach((input) => {
      input.addEventListener('input', updateProgress);
    });

    function updateProgress() {
      const totalFields = inputs.length;
      let filledFields = 0;

      inputs.forEach((input) => {
        if (input.value.trim() !== '') filledFields++;
      });

      const percentage = Math.min((filledFields / totalFields) * 100, 95);
      progressFill.style.width = percentage + '%';
    }

    // Add staggered animation delay
    document.querySelectorAll('.form-group').forEach((group, index) => {
      group.style.animationDelay = index * 0.1 + 's';
    });

    // Initialize matrix rain on load
    createMatrixRain();

    // Refresh matrix rain periodically
    setInterval(createMatrixRain, 10000);
