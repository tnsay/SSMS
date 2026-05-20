const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); 

        
        document.getElementById('errLoginEmail').textContent = '';
        document.getElementById('errLoginPassword').textContent = '';

        // Grab inputs
        const emailInput = document.getElementById('loginEmail').value.trim().toLowerCase();
        const passwordInput = document.getElementById('loginPassword').value;

        // Pull the array of registered users from our StorageEngine
        const users = StorageEngine.getUsers();

        // 1. Use the array .find() method to look for a matching email
        const matchedUser = users.find(user => user.email === emailInput);

        // 2. Error handling: Check if user exists
        if (!matchedUser) {
            document.getElementById('errLoginEmail').textContent = "No account found with this email.";
            return;
        }

        // 3. Error handling: Check if password matches
        if (matchedUser.password !== passwordInput) {
            document.getElementById('errLoginPassword').textContent = "Incorrect password.";
            return;
        }

        // 4. Success! Save the logged-in user state
        // We strip the password before saving for better practice, using object destructuring
        const { password, ...userSessionData } = matchedUser; 
        StorageEngine.setCurrentUser(userSessionData);

        // Redirect to dashboard
        alert(`Welcome back, ${userSessionData.fullName}!`);
        window.location.href = 'dashboard.html';
    });
}