import { createPortalLayout } from "../components/layout/portalLayout.js";
import { createDashboardShell } from "../components/layout/dashboardShell.js";

import { renderWelcome } from "../modules/welcome/welcome.js";
import { renderSidebar } from "../../../layouts/sidebar.js";
import { renderToolbar } from "../../../layouts/toolbar.js";

import { initSidebar } from "./sidebarController.js";
import { initToolbar } from "./toolbarController.js";

import { loadDashboardData } from "../services/api.js";
import { openApplication } from "../services/applicationLauncher.js";

import { loadModule, getCurrentModule } from "../router.js";

import { startAutoRefresh } from "../refresh/refreshManager.js";


// =====================================================
// PORTAL
// =====================================================

export function showPortal() {

    const portal = document.getElementById("portalContainer");
    const dashboard = document.getElementById("dashboardContainer");

    dashboard.style.display = "none";
    portal.style.display = "block";

    portal.innerHTML =
        createPortalLayout(
            renderWelcome()
        );

    // ===============================
    // OPEN APPLICATION
    // ===============================

    document
        .querySelectorAll(".qa-app-card")
        .forEach(card => {

            card.addEventListener("click", () => {

                openApplication(
                    card.dataset.id
                );

            });

        });

}


// =====================================================
// DASHBOARD
// =====================================================

export async function showDashboard() {

    const portal = document.getElementById("portalContainer");
    const dashboard = document.getElementById("dashboardContainer");

    portal.style.display = "none";
    dashboard.style.display = "block";

    dashboard.innerHTML =
        createDashboardShell();

    // Sidebar
    document.getElementById("sidebarContainer").innerHTML =
        renderSidebar();

    // Toolbar
    document.getElementById("toolbarContainer").innerHTML =
        renderToolbar();

    // Controller
    initSidebar();
    initToolbar();

    // Load API
    await loadDashboardData();

    // Load module aktif
    loadModule(getCurrentModule());

    // Auto Refresh
    startAutoRefresh(() => getCurrentModule());

}