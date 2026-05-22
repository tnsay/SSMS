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
    },
    
    calculateGradeAndStatus(math, physics, programming) {
        // Average Formula Requirement
        const average = parseFloat(((math + physics + programming) / 3).toFixed(2));
        
        // Grade System Rules
        let grade = 'F';
        if (average >= 90) grade = 'A';
        else if (average >= 80) grade = 'B';
        else if (average >= 70) grade = 'C';
        else if (average >= 60) grade = 'D';

        // Pass/Fail Status Condition
        const status = average >= 60 ? 'Pass' : 'Fail';

        return { average, grade, status };
    },

    validateStudent(data, existingStudents) {
        const errors = {};

        if (!data.fullName.trim()) errors.fullName = "Full Name is required.";
        
        // Duplicate student warning requirement
        const isDuplicate = existingStudents.some(s => s.fullName.toLowerCase() === data.fullName.trim().toLowerCase());
        if (isDuplicate) errors.fullName = "Warning: A student with this name already exists.";

        // Age Boundaries check (16-40)
        const age = parseInt(data.age);
        if (isNaN(age) || age < 16 || age > 40) {
            errors.age = "Age must be between 16 and 40.";
        }

        if (!data.gender) errors.gender = "Gender configuration is required.";
        if (!data.course) errors.course = "Course selection is required.";

        // Marks Validation (0-100)
        const subjectMarks = { math: data.math, physics: data.physics, programming: data.programming };
        for (const [subject, mark] of Object.entries(subjectMarks)) {
            const m = parseInt(mark);
            if (isNaN(m) || m < 0 || m > 100) {
                errors[subject] = `${subject.charAt(0).toUpperCase() + subject.slice(1)} mark must be between 0 and 100.`;
            }
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }

};