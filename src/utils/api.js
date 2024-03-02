import axios from "axios"

const API_URL = 'http://localhost:5000'

export const getProjects = async () => {
    const projects = await axios.get(`${API_URL}/projects`)
    return projects.data
}

export const getProject = async (id) => {
    const project = await axios.get(`${API_URL}/project/${id}`)
    return project.data
}

export const getTasks = async (id) => {
    const project = await axios.get(`${API_URL}/tasks/${id}`)
    return project.data
}

export const getUsers = async () => {
    const users = await axios.get(`${API_URL}/users`)
    return users.data
}

export const createProject = async (project) => {
    const proj = await axios.post(`${API_URL}/projects`, project)
    return proj.data
}

export const createTask = async (task) => {
    const res = await axios.post(`${API_URL}/tasks`, task)
    return res.data
}

export const editTask = async (task) => {
    const res = await axios.put(`${API_URL}/tasks/${task._id}`, task)
    return res.data
}


export const updateProject = async (project) => {
    const res = await axios.put(`${API_URL}/projects/${project._id}`, project)
    return res.data
}

