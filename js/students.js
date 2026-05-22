import { StorageEngine } from './storage.js';
import { Validator } from './validation.js';

// DOM Form Elements Selection
const studentForm = document.getElementById('studentForm');

if (studentForm) {
    studentForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop native postbacks

        // 1. Clear previous validation error logs dynamically
        const errorFields = ['Name', 'Age', 'Gender', 'Course', 'Math', 'Physics', 'Prog'];
        errorFields.forEach(field => {
            const element = document.getElementById(`errStud${field}`) || document.getElementById(`errMark${field}`);
            if (element) element.textContent = '';
        });

        // 2. Extract inputs from HTML DOM
        const fullName = document.getElementById('studName').value;
        const age = document.getElementById('studAge').value;
        const gender = document.getElementById('studGender').value;
        const course = document.getElementById('studCourse').value;
        
        // Convert grades to raw numeric values
        const math = parseInt(document.getElementById('markMath').value);
        const physics = parseInt(document.getElementById('markPhysics').value);
        const programming = parseInt(document.getElementById('markProg').value);

        const studentDataInput = { fullName, age, gender, course, math, physics, programming };
        const existingStudents = StorageEngine.getStudents();

        // 3. Evaluate inputs using Business Rules engine
        const validation = Validator.validateStudent(studentDataInput, existingStudents);

        if (!validation.isValid) {
            // Render validation errors dynamically into target UI fields
            if (validation.errors.fullName) document.getElementById('errStudName').textContent = validation.errors.fullName;
            if (validation.errors.age) document.getElementById('errStudAge').textContent = validation.errors.age;
            if (validation.errors.gender) document.getElementById('errStudGender').textContent = validation.errors.gender;
            if (validation.errors.course) document.getElementById('errStudCourse').textContent = validation.errors.course;
            if (validation.errors.math) document.getElementById('errMarkMath').textContent = validation.errors.math;
            if (validation.errors.physics) document.getElementById('errMarkPhysics').textContent = validation.errors.physics;
            if (validation.errors.programming) document.getElementById('errMarkProg').textContent = validation.errors.programming;
            return; // Halt block
        }

        // 4. Fire Automated Math Calculations (Requirement 4)
        const calculations = Validator.calculateGradeAndStatus(math, physics, programming);

        // 5. Structure finalized Object to match mandatory template specification
        const finalStudentObject = {
            id: Date.now(), // Unique identity signature
            fullName: fullName.trim(),
            age: parseInt(age),
            gender,
            course,
            marks: {
                math,
                physics,
                programming
            },
            average: calculations.average,
            grade: calculations.grade,
            status: calculations.status,
            createdAt: new Date().toISOString().split('T')[0] // Formats cleanly to YYYY-MM-DD
        };

        // 6. Save data layer to engine
        StorageEngine.saveStudent(finalStudentObject);

        // 7. Success notification and form reset reset operations
        alert(`Student profile for ${finalStudentObject.fullName} generated successfully with Grade: ${finalStudentObject.grade}!`);
        studentForm.reset();
    });
}