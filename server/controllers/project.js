import Project from "../models/Project.js";
import User from "../models/UserModel.js";
import Task from "../models/TaskModel.js";



//Get User details
export const userDetails = async (req, res) => {
    try {

        const userData = await userModel.findById(req?.user?.id);

        res.status(200).json({
            data: userData,
            message: "User details...🪪",  
            success: true,
            error: false
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            success: false,
            errror: true
        });
    };
};

// Create a new project
export const createProject = async (req, res) => {
  const { name, userId } = req.body;

  try {
    // Validate if the user has created more than 4 projects
    const user = await User.findById(userId).populate("projects");
    if (user.projects.length >= 4) {
      return res.status(400).json({
        success: false,
        message: "You cannot create more than 4 projects 🤦",
      });
    }

    // Create the project
    const newProject = new Project({ name });
    const savedProject = await newProject.save();

    // Add project to the user's projects list
    user.projects.push(savedProject._id);
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Project created successfully 🎉",
      data: savedProject,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the project.",
      error: true,
    });
  }
};

export const getAllProjects = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find user by userId and populate the projects
    const user = await User.findById(userId).populate("projects");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found 🤦",
      });
    }

    // Get all projects associated with the user
    const projects = user.projects;

    return res.status(200).json({
      success: true,
      message: "Projects fetched successfully 🎉",
      data: projects,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching projects.",
      error: true,
    });
  }
};

// Update a task (by task ID)
export const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, status, completedAt } = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found 🤦",
      });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.completedAt = completedAt || task.completedAt;

    const updatedTask = await task.save();

    return res.status(200).json({
      success: true,
      message: "Task updated successfully 🎉",
      data: updatedTask,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the task.",
      error: true,
    });
  }
};

// Create a new task under a project
export const createTask = async (req, res) => {
  const { projectId, title, description } = req.body;

  try {
    if (!projectId || !title) {
      return res.status(400).json({
        success: false,
        message: "Project ID and title are required 🤦",
      });
    }

    // Find the project to attach the task to
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found 🤦",
      });
    }

    // Create the task
    const newTask = new Task({ title, description });
    const savedTask = await newTask.save();

    // Add the task to the project
    project.tasks.push(savedTask._id);
    await project.save();

    return res.status(201).json({
      success: true,
      message: "Task created successfully 🎉",
      data: savedTask,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the task.",
      error: true,
    });
  }
};

// Delete a task by ID
export const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found 🤦",
      });
    }

    // Remove task from associated projects
    await Project.updateMany({ tasks: taskId }, { $pull: { tasks: taskId } });

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully 🎉",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the task.",
      error: true,
    });
  }
};
