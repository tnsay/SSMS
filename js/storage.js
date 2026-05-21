const KEYS = {
    USERS: 'sms_users',
    LOGGED_IN_USER: 'sms_current_user',
    STUDENTS: 'sms_students',
    THEME: 'sms_theme'
};

export const StorageEngine = {
    // Generic getters and setters
    get(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error(`Error reading ${key} from localStorage`, error);
            return null;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error writing ${key} to localStorage`, error);
        }
    },

    // Specific helpers using ES6 Arrow Functions & Spread Operator
    getUsers() {
        return this.get(KEYS.USERS) || [];
    },

    saveUser(newUser) {
        const users = this.getUsers();
        this.set(KEYS.USERS, [...users, newUser]); // Spread operator to append
    },

    getCurrentUser() {
        return this.get(KEYS.LOGGED_IN_USER);
    },

    setCurrentUser(user) {
        this.set(KEYS.LOGGED_IN_USER, user);
    },

    clearCurrentUser() {
        localStorage.removeItem(KEYS.LOGGED_IN_USER);
    }

    getStudents() {
        return this.get(KEYS.STUDENTS) || [];
    },

    saveStudent(newStudent) {
        const students = this.getStudents();
        this.set(KEYS.STUDENTS, [...students, newStudent]); // Spread operator requirement
    },

    updateStudentsCollection(updatedArray) {
        this.set(KEYS.STUDENTS, updatedArray);
    }






};