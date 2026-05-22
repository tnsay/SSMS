import { StorageEngine } from './storage.js';
import { Validator } from './validation.js';

// Grab forms from the DOM
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');


if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop page reload

        // Target and clear out previous error texts
        const errName = document.getElementById('errName');
        const errEmail = document.getElementById('errEmail');
        const errPassword = document.getElementById('errPassword');
        const errConfirm = document.getElementById('errConfirm');

        if (errName) errName.textContent = '';
        if (errEmail) errEmail.textContent = '';
        if (errPassword) errPassword.textContent = '';
        if (errConfirm) errConfirm.textContent = '';

        // Read values entered by the user
        const fullName = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;
        
        // Pull current list to check for duplicates
        const existingUsers = StorageEngine.getUsers();

        // Run validation rules from your validation module
        const validation = Validator.validateRegistration(fullName, email, password, confirmPassword, existingUsers);

        // If validation fails, show the errors on screen and HALT
        if (!validation.isValid) {
            if (validation.errors.fullName && errName) errName.textContent = validation.errors.fullName;
            if (validation.errors.email && errEmail) errEmail.textContent = validation.errors.email;
            if (validation.errors.password && errPassword) errPassword.textContent = validation.errors.password;
            
            //  mismatch error onto screen
            if (validation.errors.confirmPassword && errConfirm) {
                errConfirm.textContent = validation.errors.confirmPassword;
            }
            return; 
        }

        if (errName) errName.textContent = '';
        if (errEmail) errEmail.textContent = '';
        if (errPassword) errPassword.textContent = '';
        if (errConfirm) errConfirm.textContent = '';


        // If everything fine, build user profile object
        const newUser = {
            id: Date.now(),
            fullName,
            email: email.toLowerCase().trim(),
            password // Saved safely as raw text for this assignment
        };

        // Write to local storage
        StorageEngine.saveUser(newUser);
        
        setTimeout(() => {
            alert('Registration successful! Redirecting to login...');
            window.location.href = 'index.html'; 
        }, 10);
    });
}


if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); 

        document.getElementById('errLoginEmail').textContent = '';
        document.getElementById('errLoginPassword').textContent = '';

        const emailInput = document.getElementById('loginEmail').value.trim().toLowerCase();
        const passwordInput = document.getElementById('loginPassword').value;

        const users = StorageEngine.getUsers();
        const matchedUser = users.find(user => user.email === emailInput);

        if (!matchedUser) {
            document.getElementById('errLoginEmail').textContent = "No account found with this email.";
            return;
        }

        if (matchedUser.password !== passwordInput) {
            document.getElementById('errLoginPassword').textContent = "Incorrect password.";
            return;
        }

        const { password, ...userSessionData } = matchedUser; 
        StorageEngine.setCurrentUser(userSessionData);

        alert(`Welcome back, ${userSessionData.fullName}!`);
        // window.location.href = 'dashboard.html';
        
        window.location.replace('dashboard.html'); // Use replace to prevent back navigation to login
    });
}