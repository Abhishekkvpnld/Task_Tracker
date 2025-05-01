import express from "express";
import { createProject, updateTask, createTask, deleteTask, getAllProjects } from "../controllers/project.js";

const router = express.Router();

// Routes for Projects and Tasks
router.get("/all-projects" , getAllProjects)
router.post("/create-project", createProject); 
router.put("/task/:taskId", updateTask);
router.post("/create-task", createTask); 
router.delete("/task/:taskId", deleteTask); 

export default router;


