import { DASHBOARD_MODULES } from "./config/dashboardRegistry.js";

let currentModule = "summary";

// ===========================================
// CURRENT MODULE
// ===========================================

export function getCurrentModule() {

    return currentModule;

}

// ===========================================
// CURRENT MODULE INFO
// ===========================================

export function getCurrentModuleInfo() {

    return DASHBOARD_MODULES.find(

        module => module.id === currentModule

    );

}

// ===========================================
// LOAD MODULE
// ===========================================

export function loadModule(moduleId) {

    const module = DASHBOARD_MODULES.find(

        item => item.id === moduleId

    );

    if (!module) {

        console.error(`❌ Module "${moduleId}" not found.`);

        return;

    }

    currentModule = moduleId;

    const container =
        document.getElementById("main-content");

    if (!container) return;

    container.innerHTML =
        module.render();

    // Update active sidebar
    document
        .querySelectorAll(".menu li[data-module]")
        .forEach(menu => {

            menu.classList.remove("active");

            if (menu.dataset.module === moduleId) {

                menu.classList.add("active");

            }

        });

}

// ===========================================
// GET ALL MODULES
// ===========================================

export function getDashboardModules() {

    return DASHBOARD_MODULES;

}