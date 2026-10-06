import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentForm from "../components/StudentForm.jsx";
import StudentTable from "../components/StudentTable.jsx";
import { getCurrentUser, logout, getStudents, saveStudents } from "../utils/storage.js";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [students, setStudents] = useState(getStudents());
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null); // the student being edited

  const update = (list) => { setStudents(list); saveStudents(list); };

  const handleSave = (data) => {
    if (editing) update(students.map((s) => (s.id === editing.id ? { ...s, ...data } : s)));
    else update([...students, { ...data, id: Date.now() }]);
    closeForm();
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this student?")) update(students.filter((s) => s.id !== id));
  };

  const openEdit = (student) => { setEditing(student); setShowForm(true); };
  const closeForm = () => { setEditing(null); setShowForm(false); };
  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <div className="dashboard">
      <header>
        <h2>Home / Dashboard</h2>
        <span>Hi, {user.name} <button className="secondary" onClick={handleLogout}>Log out</button></span>
      </header>
      <div className="toolbar">
        <h3>Student list</h3>
        <button onClick={() => setShowForm(true)}>Add student</button>
      </div>
      {showForm && <StudentForm initial={editing} onSave={handleSave} onCancel={closeForm} />}
      <StudentTable students={students} onEdit={openEdit} onDelete={handleDelete} />
    </div>
  );
}
