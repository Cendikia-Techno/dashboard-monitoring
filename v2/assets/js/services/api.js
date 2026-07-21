import { getCurrentProject } from "../projectManager.js";
import { setDashboardData } from "./dataStore.js";

export async function loadDashboardData() {

    const project = getCurrentProject();

    if (!project.api) {

        console.warn("API belum dikonfigurasi.");

        return null;

    }

    try {

        const response = await fetch(project.api);

        const data = await response.json();

        console.log("API Response:", data);

        setDashboardData(data);

        console.log("Dashboard data loaded");

        return data;

    } catch (err) {

        console.error("Failed load data", err);

        return null;

    }

}