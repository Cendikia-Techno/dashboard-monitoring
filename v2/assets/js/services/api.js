import { getCurrentProject } from "../projectManager.js";
import { setDashboardData } from "./dataStore.js";

export async function loadDashboardData() {

    const project = getCurrentProject();

    if (!project.api) {
        console.warn("API belum dikonfigurasi.");
        return;
    }

    try {

        const response = await fetch(project.api);

        const data = await response.json();

        setDashboardData(data);

        console.log("Dashboard data loaded");

    } catch (err) {

        console.error("Failed load data", err);

    }

}