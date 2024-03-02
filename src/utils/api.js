import axios from "axios"

export const getProjects = async () => {
    const projects = await axios.get('http://localhost:5000/projects')
    return projects.data
}

export const getProject = async (id) => {
    const project = await axios.get(`http://localhost:5000/project/${id}`)
    return project.data
}

export const getTasks = async (id) => {
    const project = await axios.get(`http://localhost:5000/tasks/${id}`)
    return project.data
}

export const getUsers = async () => {
    const users = await axios.get(`http://localhost:5000/users`)
    return users.data
}

export const createProject = async (project) => {
    const proj = await axios.post(`http://localhost:5000/projects`, project)
    return proj.data
}

export const createTask = async (task) => {
    const res = await axios.post(`http://localhost:5000/tasks`, task)
    return res.data
}

export const editTask = async (task) => {
    const res = await axios.put(`http://localhost:5000/tasks/${task._id}`, task)
    return res.data
}


export const updateProject = async (project) => {
    const res = await axios.put(`http://localhost:5000/projects/${project._id}`, project)
    return res.data
}

