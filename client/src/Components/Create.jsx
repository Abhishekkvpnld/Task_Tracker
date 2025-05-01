import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";


const Create = ({ setAddTask, setCreate }) => {
    const navigate = useNavigate();
    const { user } = useUser();


    const [task, setTask] = useState({
        title: "",
        description: "",
        dueDate: "",
        status: "",
        attachment: "",
    });

    const handleButtonClick = (e) => {
        e.preventDefault();
        fileInputRef.current?.click();
    };


    const handleCategoryChange = (category) => {
        setTask((prev) => ({ ...prev, category }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!task.category || !task.description || !task.dueDate || !task.status || !task.title) {
            return toast.error("Please Provide All Details");
        }

        addDocument(task, {
            onSuccess: () => {
                setCreate((prev) => !prev);
                setTask({
                    title: "",
                    description: "",
                    dueDate: "",
                    status: "",
                });
                setAddTask(false);
                toast.success("Task Created Successfully!");
            },
            onError: (error) => {
                toast.error(error.message || "Failed to create task.");
            },
        });
    };

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    return (
        <div className="min-w-[100vw] flex items-center justify-center fixed min-h-[100vh] bg-white bg-opacity-70">
            <form
                className="border shadow-lg mt-11 w-[80%] md:w-[60%] lg:w-[50%] rounded-2xl bg-white p-4"
                onSubmit={handleSubmit}
            >
                <div className="w-full flex items-center justify-between h-10">
                    <h1 className="text-xl font-semibold">Create Task</h1>
                    <button
                        onClick={() => setAddTask(false)}
                        className="hover:scale-110 transition-all"
                    >
                        <CgClose size={20} />
                    </button>
                </div>

                <hr className="w-full mt-2 border" />

                <div className="flex flex-col gap-2 mt-5">
                    <input
                        type="text"
                        name="title"
                        placeholder="Task Title"
                        className="border-slate-300 border-2 px-3 py-2 w-[90%] rounded-lg"
                        value={task.title}
                        onChange={(e) => setTask({ ...task, title: e.target.value })}
                    />
                    <textarea
                        placeholder="Description"
                        name="description"
                        className="w-[90%] px-4 min-h-32 py-2 border-2 rounded-lg"
                        value={task.description}
                        onChange={(e) => setTask({ ...task, description: e.target.value })}
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-between mt-5 px-4">

                    <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col gap-2">
                            <h6 className="text-sm font-semibold text-slate-500">Due on*</h6>
                            <input
                                type="date"
                                className="text-xs lg:text-sm border border-slate-400 px-2 rounded-lg py-1 text-slate-500"
                                value={task.dueDate}
                                onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <h6 className="text-sm font-semibold text-slate-500">
                                Task Status*
                            </h6>
                            <select
                                className="border text-xs lg:text-sm border-slate-400 px-2 py-1 rounded-lg text-slate-500"
                                value={task.status}
                                onChange={(e) => setTask({ ...task, status: e.target.value })}
                            >
                                <option value="">Choose</option>
                                <option value="todo">TO-DO</option>
                                <option value="inprogress">IN-PROGRESS</option>
                                <option value="complete">COMPLETE</option>
                            </select>
                        </div>
                    </div>
                </div>



                <button
                    type="submit"
                    className="w-full bg-black text-white mt-5 rounded-3xl py-2 font-semibold"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Create;
