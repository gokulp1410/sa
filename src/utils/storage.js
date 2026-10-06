// Fake "backend": saves data in the browser's localStorage.
const read = (key, fallback) => JSON.parse(localStorage.getItem(key)) ?? fallback;
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const getUsers = () => read("users", []);
export const saveUsers = (users) => write("users", users);

export const getCurrentUser = () => read("currentUser", null);
export const setCurrentUser = (user) => write("currentUser", user);
export const logout = () => localStorage.removeItem("currentUser");

export const getStudents = () => read("students", []);
export const saveStudents = (students) => write("students", students);
