import { QA_APPLICATIONS } from "./config/qaApplications.js";

// hanya dashboard
const projects =
    QA_APPLICATIONS.filter(
        app => app.type === "dashboard"
    );

let currentProject = projects[0];

// ==========================
// Current Project
// ==========================

export function getCurrentProject() {

    return currentProject;

}

export function setCurrentProject(projectId) {

    const project =
        projects.find(
            p => p.id === projectId
        );

    if (project) {

        currentProject = project;

    }

}

// ==========================
// Dashboard List
// ==========================

export function getProjects() {

    return projects;

}

// ==========================
// All Applications
// ==========================

export function getApplications() {

    return QA_APPLICATIONS;

}

// ==========================
// By Category
// ==========================

export function getApplicationsByCategory(categoryId) {

    return QA_APPLICATIONS.filter(

        app => app.category === categoryId

    );

}

// ==========================
// By Id
// ==========================

export function getApplicationById(id) {

    return QA_APPLICATIONS.find(

        app => app.id === id

    );

}

export function getCurrentCategory() {

    return currentProject.category;

}

export function getProjectsInCurrentCategory() {

    return projects.filter(

        p => p.category === currentProject.category

    );

}