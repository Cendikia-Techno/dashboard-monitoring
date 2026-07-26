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

<div class="portal-hero">

    <img
        src="assets/images/logo_qa.png"
        class="portal-logo"
        alt="QA Portal">

    <h1>

        QA Portal

    </h1>

    <p>

        Quality Assurance Digital Platform

    </p>

    <span>

        One Portal • One Data • One Quality

    </span>

</div>

<div class="portal-divider">

    Choose Quality Application

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