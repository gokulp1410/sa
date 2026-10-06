export default function StudentTable({ students, onEdit, onDelete }) {
  if (students.length === 0) return <p>No students yet. Click "Add student" to create one.</p>;

  return (
    <table>
      <thead>
        <tr><th>Name</th><th>Email</th><th>Class</th><th>Actions</th></tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <tr key={s.id}>
            <td>{s.name}</td>
            <td>{s.email}</td>
            <td>{s.className}</td>
            <td>
              <button className="secondary" onClick={() => onEdit(s)}>Edit</button>{" "}
              <button className="danger" onClick={() => onDelete(s.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
