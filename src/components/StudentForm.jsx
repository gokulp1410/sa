import { useState } from "react";

// Used for both "Add student" and "Edit student".
export default function StudentForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || { name: "", email: "", className: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form className="card student-form" onSubmit={handleSubmit}>
      <h3>{initial ? "Edit student" : "Add student"}</h3>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="className" placeholder="Class" value={form.className} onChange={handleChange} required />
      <div className="row">
        <button type="submit">Save</button>
        <button type="button" className="secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
