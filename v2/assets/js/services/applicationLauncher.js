import {
    getApplicationById,
    setCurrentProject
}
    from "../projectManager.js";

import {
    showDashboard
}
    from "../controllers/appController.js";

export function openApplication(id) {

    const app =
        getApplicationById(id);

    if (!app) return;

    if (app.type === "dashboard") {

        setCurrentProject(id);

        showDashboard();

    }

    else {

        window.open(
            app.url,
            "_blank",
            "noopener,noreferrer"
        );

    }

}