import {
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

    if (!select) return;

    // ==========================================
    // Category Badge
    // ==========================================

    if (badge) {

        badge.innerHTML = `

        <i class="fa-solid fa-layer-group"></i>

        ${getCurrentCategory()}

        `;

    }

    // ==========================================
    // Load Project Dropdown
    // ==========================================

    select.innerHTML = "";

    getProjectsInCurrentCategory().forEach(project => {

        select.innerHTML += `

            <option value="${project.id}">
                ${project.title}
            </option>

        `;

    });

    // Current Project
    select.value =
        getCurrentProject().id;

    // ==========================================
    // Back Portal
    // ==========================================

    const backBtn =
        document.getElementById("backPortalBtn");

    if (backBtn) {

        backBtn.onclick = () => {

            showPortal();

        };

    }

    // ==========================================
    // Change Project
    // ==========================================

    select.onchange = (e) => {

        const projectId = e.target.value;

        if (!projectId) return;

        // Simpan project aktif
        setCurrentProject(projectId);

        console.log("🚢 Switch Project :", projectId);

        // ==================================================
        // Background Refresh
        // ==================================================

        loadDashboardData();

    };

}