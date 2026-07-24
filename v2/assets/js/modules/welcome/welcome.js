import { QA_CATEGORIES } from "../../config/qaCategories.js";
import { getApplicationsByCategory } from "../../projectManager.js";

import { createDashboard } from "../../components/layout/dashboardLayout.js";
import { createApplicationCategory } from "../../components/portal/applicationCategory.js";

export function renderWelcome() {

    const sections = QA_CATEGORIES.map(category => {

        const apps =
            getApplicationsByCategory(category.id);

        if (apps.length === 0) return "";

        return createApplicationCategory(
            category,
            apps
        );

    }).join("");

    return createDashboard({

        hero: `

<div class="qa-welcome">

    <div class="qa-logo">

        <i class="fa-solid fa-shield-halved"></i>

    </div>

    <h1>Welcome to QA Portal</h1>

    <p>

        Quality Assurance Digital Platform

    </p>

</div>

`,

        kpis: "",

        fullTop: [

            sections

        ],

        split: [],

        fullBottom: []

    });

}