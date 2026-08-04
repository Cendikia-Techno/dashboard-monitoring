import { createDashboard } from "../../components/layout/dashboardLayout.js";
import { createHero } from "../../components/hero/hero.js";
import { createKPICard } from "../../components/cards/kpiCard.js";
import { createSection } from "../../components/layout/sectionCard.js";
import { createProgressList } from "../../components/lists/progressList.js";
import { createAttentionList } from "../../components/lists/attentionList.js";
import { createActivityList } from "../../components/lists/activityList.js";
import { getOverallStatistics, getNeedAttention } from "../../services/statistics.js";
import { getCurrentProject } from "../../projectManager.js";
import { createBreadcrumb } from "../../components/layout/breadcrumb.js";
import { createRecentUpdateList } from "../../components/lists/recentUpdateList.js";
import { getRecentUpdates } from "../../services/statistics.js";

export function renderSummary() {

    const summary = getOverallStatistics();
    const project = getCurrentProject();

    if (!summary) {

        return `<div class="loading">Loading Dashboard...</div>`;

    }

    const breadcrumb =

        createBreadcrumb({

            project: project.title,

            module: "Executive Summary"

        });
    // ===========================
    // Hero
    // ===========================

    const hero = createHero({

        lastUpdate:
            new Date().toLocaleString("id-ID")

    });

    // ===========================
    // KPI
    // ===========================

    const kpis = `

    <div class="qdp-kpi-grid">

        ${createKPICard({

        title: "ITP",

        value: summary.progressValue.itp + "%",

        icon: "fa-clipboard-check",

        color: "#0B2E59",

        subtitle: "Inspection Test Plan"

    })}

        ${createKPICard({

        title: "Quality Plan",

        value: summary.progressValue.qualityPlan + "%",

        icon: "fa-file-lines",

        color: "#2563EB",

        subtitle: "Quality Plan"

    })}

        ${createKPICard({

        title: "Inspection",

        value: summary.progressValue.inspection + "%",

        icon: "fa-magnifying-glass",

        color: "#16A34A",

        subtitle: "Completion"

    })}

        ${createKPICard({

        title: "Material",

        value: summary.progressValue.material + "%",

        icon: "fa-box",

        color: "#F59E0B",

        subtitle: "Readiness"

    })}

${createKPICard({
        title: "Launching",

        value: summary.progressValue.launching + "%",

        icon: "fa-ship",

        color: "#0EA5E9",

        subtitle: "Readiness"

    })}

${createKPICard({

        title: "TPTR",

        value: summary.progressValue.tptr + "%",

        icon: "fa-file-signature",

        color: "#DC2626",

        subtitle: "Documentation"

    })}

${createKPICard({

        title: "HAT / SAT",

        value: summary.progressValue.hatsat + "%",

        icon: "fa-gears",

        color: "#14B8A6",

        subtitle: "Function Test"

    })}

    </div>

    `;

    // ===========================
    // Section
    // ===========================

    const progress = createSection({

        title: "Overall Progress",

        content: createProgressList(

            summary.progress

        )

    });

    const attention = createSection({

        title: "Need Attention",

        content: createAttentionList(

            getNeedAttention()

        )

    });

    const recentUpdate = createSection({

        title: "Recent Update",

        content: createRecentUpdateList(

            getRecentUpdates()

        )

    });


    const bottom = `

    <div class="summary-bottom">

        ${attention}


    </div>

    `;

    // ===========================
    // Dashboard
    // ===========================

    return createDashboard({

        breadcrumb,

        hero,

        kpis,

        fullTop: [
            progress
        ],

        split: [
            attention,

            recentUpdate

        ],

        fullBottom: [],
        splitRatio: "2fr 1fr"

    });

}