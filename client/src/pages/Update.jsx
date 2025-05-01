import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const UpdateTaskPage = ({ tasks, setTasks }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    //   const existingTask = tasks.find((task) => task.id === id);

    const [form, setForm] = useState({
        title: "",
        description: "",
        dueDate: "",
        status: "",
        project: "",
    });

    //   useEffect(() => {
    //     if (existingTask) {
    //       setForm(existingTask);
    //     }
    //   }, [existingTask]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...form } : task
        );
        setTasks(updatedTasks);
        navigate("/");
    };

    //   if (!existingTask) return <p>Task not found</p>;

    return (
        <>
            <Navbar  required={false}/>
            <div className="p-4 max-w-md mx-auto">
                <h2 className="text-xl font-bold mb-4">Update Task</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="border p-2 rounded"
                        required
                    />
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="border p-2 rounded"
                        rows="3"
                    />
                    <input
                        name="dueDate"
                        type="date"
                        value={form.dueDate}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    >
                        <option value="todo">To-Do</option>
                        <option value="inprogress">In Progress</option>
                        <option value="complete">Complete</option>
                    </select>
                    <input
                        name="project"
                        value={form?.project}
                        disabled
                        onChange={handleChange}
                        placeholder="Project Name"
                        className="border p-2 rounded"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Update Task
                    </button>
                </form>
            </div>
        </>
    );
};

export default UpdateTaskPage;
