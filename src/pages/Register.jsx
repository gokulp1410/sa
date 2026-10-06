import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsers, saveUsers } from "../utils/storage.js";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match.");
    const users = getUsers();
    if (users.some((u) => u.email === form.email)) return setError("This email is already registered.");
    saveUsers([...users, { name: form.name, email: form.email, password: form.password }]);
    navigate("/login");
  };

  return (
    <div className="auth-page">
      <form className="card" onSubmit={handleSubmit}>
        <h2>User Registration</h2>
        {error && <p className="error">{error}</p>}
        <label>Name *</label>
        <input name="name" value={form.name} onChange={handleChange} required />
        <label>Email *</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
        <label>Password *</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} required />
        <label>Confirm password *</label>
        <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
        <button type="submit">Create account</button>
        <p>Already registered? <Link to="/login">Log in</Link></p>
      </form>
    </div>
  );
}
