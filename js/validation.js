export const Validator = {
    isValidEmail(email) {
        // Simple regex for basic email validation
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    },

    validateRegistration(fullName, email, password, confirmPassword, existingUsers) {
        const errors = {};

        if (fullName.trim().length < 3) {
            errors.fullName = "Full name must be at least 3 characters.";
        }

        if (!this.isValidEmail(email)) {
            errors.email = "Please enter a valid email address.";
        } else {
            // Check for duplicate emails (Requirement 1 & 16)
            const emailExists = existingUsers.some(user => user.email === email.trim().toLowerCase());
            if (emailExists) {
                errors.email = "This email is already registered.";
            }
        }

        if (password.length < 6) {
            errors.password = "Password must be at least 6 characters.";
        }

        if (password !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match.";
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }
};