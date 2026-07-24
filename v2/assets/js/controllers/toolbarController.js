import {
    getProjects,
    getCurrentProject,
    setCurrentProject,
    getCurrentCategory,
    getProjectsInCurrentCategory
} from "../projectManager.js";

import { loadDashboardData } from "../services/api.js";
import { loadModule, getCurrentModule } from "../router.js";
import { showPortal } from "./appController.js";

export function initToolbar() {

    const select =
        document.getElementById("projectSelect");

    const badge =
        document.getElementById("categoryBadge");

    if (badge) {

        badge.innerHTML = `

        <i class="fa-solid fa-layer-group"></i>

        ${getCurrentCategory()}

        `;

            }

    if (!select) return;

    // ==========================
    // Load Project List
    // ==========================

    select.innerHTML = "";

    getProjectsInCurrentCategory().forEach(project => {

        select.innerHTML += `

        <option value="${project.id}">
        ${project.title}
        </option>

        `;

    });

    select.value =
        getCurrentProject().id;

    // ====================================
    // SET PROJECT YANG SEDANG AKTIF
    // ====================================

    select.value = getCurrentProject().id;
    // ==========================
    // Back Portal
    // ==========================

    const backBtn =
        document.getElementById("backPortalBtn");

    if (backBtn) {

        backBtn.addEventListener("click", () => {

            showPortal();

        });

    }

    // ==========================
    // Change Project
    // ==========================

    select.addEventListener("change", async (e) => {

        setCurrentProject(e.target.value);

        console.log("Current Project :", e.target.value);

        await loadDashboardData();

        loadModule(getCurrentModule());

    });

}