const baseUrl = import.meta.env.VITE_BACKEND_URL;

//Auth Api
export const login_api = `${baseUrl}/auth/login`;
export const signup_api = `${baseUrl}/auth/register`;
export const logout_api = `${baseUrl}/auth/logout`;
export const getuser_api = `${baseUrl}/auth/getuser`;

// Project Api
export const allProject_api = `${baseUrl}/user/all-projects`;
export const create_projects_api = `${baseUrl}/user/create-project`;
export const update_task_api = `${baseUrl}/user/task/:taskId`;
export const create_task_api = `${baseUrl}/user/create-task`;
export const delete_task_api = `${baseUrl}/user/task/:taskId`;
