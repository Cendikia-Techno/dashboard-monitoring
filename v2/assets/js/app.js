import { initSidebar } from "./controllers/sidebarController.js";
import { initToolbar } from "./controllers/toolbarController.js";
import { loadModule } from "./router.js";
import { loadDashboardData } from "./services/api.js";

async function initApp(){

    initSidebar();

    initToolbar();

    await loadDashboardData();

    loadModule("summary");

}

initApp();