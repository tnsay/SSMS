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


// DASHBOARD STATISTICS SYSTEM 
function renderDashboardStatistics() {
    const students = StorageEngine.getStudents();

    // Elements verification check
    if (!document.getElementById('statTotal')) return;

    // 1. Total Count Calculation
    const totalStudents = students.length;
    document.getElementById('statTotal').textContent = totalStudents;

    if (totalStudents === 0) {
        return; // Halt if no student records exist yet
    }

    // 2. Passed vs Failed Counts using array filter()
    const passedStudents = students.filter(student => student.status === 'Pass').length;
    const failedStudents = students.filter(student => student.status === 'Fail').length;

    document.getElementById('statPassed').textContent = passedStudents;
    document.getElementById('statFailed').textContent = failedStudents;

    // 3. Overall Class Average using array reduce()
    const totalAverageSum = students.reduce((sum, student) => sum + student.average, 0);
    const overallClassAverage = (totalAverageSum / totalStudents).toFixed(1);

    document.getElementById('statAverage').textContent = `${overallClassAverage}%`;

    // 4. Find Top Student using array sort() and destructuring
    // We make a shallow copy [...students] so we don't manipulate the original saved array ordering
    const sortedStudents = [...students].sort((a, b) => b.average - a.average);
    const topStudent = sortedStudents[0];

    const topStudentDetails = document.getElementById('topStudentDetails');
    if (topStudentDetails && topStudent) {
        topStudentDetails.innerHTML = `
            <div class="top-student-profile">
                <h4><strong>Name:</strong> ${topStudent.fullName}</h4>
                <p><strong>Course:</strong> ${topStudent.course}</p>
                <p><strong>Overall Score:</strong> ${topStudent.average}% (Grade ${topStudent.grade})</p>
            </div>
        `;
    }
}

// Global Log Out handler
function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
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

    renderDashboardStatistics(); // Hydrates data onto screen immediately on mount




});