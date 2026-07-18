import { projects } from "../../config/projects.js";

let currentProject = projects[0];

export function getCurrentProject() {
    return currentProject;
}

export function setCurrentProject(projectId) {

    const project = projects.find(p => p.id === projectId);

    if (project) {
        currentProject = project;
    }

}

export function getProjects() {
    return projects;
}