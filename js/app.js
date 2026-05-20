import { StorageEngine } from './storage.js';

// Executed immediately when the script evaluates
function checkAuthentication() {
    const currentUser = StorageEngine.getCurrentUser();

    // Route Guard: If no session token/user data exists, redirect to login
    if (!currentUser) {
        alert("Access Denied. Please login first.");
        window.location.href = 'index.html';
        return;
    }

    // Update greeting if element is found
    const welcomeName = document.getElementById('welcomeName');
    if (welcomeName) {
        welcomeName.textContent = currentUser.fullName;
    }
}

// Global Log Out behavior setup
function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            StorageEngine.clearCurrentUser();
            alert("Logged out successfully.");
            window.location.href = 'index.html';
        });
    }
}

// Run foundational checking functions
checkAuthentication();
document.addEventListener('DOMContentLoaded', () => {
    setupLogout();
    // Later, we will call a function here to display data calculations!
});