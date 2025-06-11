function validateAndNext() {
            const requiredFields = [
                'firstName', 'lastName', 'title', 'birthDate', 
                'gender', 'maritalStatus', 'nationality', 'idNumber', 
                'occupation', 'education'
            ];
            
            let isValid = true;
            
            requiredFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (!field.value.trim()) {
                    field.style.borderColor = '#e74c3c';
                    isValid = false;
                } else {
                    field.style.borderColor = '#e1e5e9';
                }
            });
            
            if (isValid) {
                document.getElementById('personalInfo').style.display = 'none';
                document.getElementById('successMessage').classList.add('show');
            } else {
                alert('Please fill in all required fields.');
            }
        }
        
        // Remove red border on input
        document.querySelectorAll('.form-input, .form-select').forEach(field => {
            field.addEventListener('input', function() {
                this.style.borderColor = '#e1e5e9';
            });
        });
