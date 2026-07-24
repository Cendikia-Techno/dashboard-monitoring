import { createDashboard } from "../../components/layout/dashboardLayout.js";
import { createHero } from "../../components/hero/hero.js";
import { createKPICard } from "../../components/cards/kpiCard.js";
import { createSection } from "../../components/layout/sectionCard.js";
import { createProgressList } from "../../components/lists/progressList.js";
import { createAttentionList } from "../../components/lists/attentionList.js";
import { createActivityList } from "../../components/lists/activityList.js";
import { getOverallStatistics } from "../../services/statistics.js";
import { getCurrentProject } from "../../projectManager.js";


export function renderSummary() {

    const summary = getOverallStatistics();
    const project = getCurrentProject();

    if (!summary) {

        return `<div class="loading">Loading Dashboard...</div>`;

    }
    // ===========================
    // Hero
    // ===========================

    const hero = createHero({

        title: "Executive Summary",

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

        content: createAttentionList([

            {

                title: "HAT/SAT",

                message: "12 item belum selesai",

                level: "high"

            },

            {

                title: "TPTR",

                message: "5 dokumen menunggu verifikasi",

                level: "medium"

            },

            {

                title: "Material",

                message: "18 material belum diterima",

                level: "high"

            }

        ])

    });

    const activity = createSection({

        title: "Recent Activity",

        content: createActivityList([

            {
                title: "Vendor PT ABC mengunggah ITP",
                time: "08:10 WIB",
                type: "success"
            },

            {
                title: "Quality Plan diperbarui",
                time: "08:35 WIB",
                type: "info"
            },

            {
                title: "Material diterima di QA",
                time: "09:05 WIB",
                type: "warning"
            },

            {
                title: "BA Closing selesai",
                time: "09:40 WIB",
                type: "success"
            }

        ])

    });

    const bottom = `

    <div class="summary-bottom">

        ${attention}

        ${activity}

    </div>

    `;

    // ===========================
    // Dashboard
    // ===========================

    return createDashboard({

        hero,

        kpis,

        fullTop: [

            progress

        ],

        split: [

            attention,

            activity

        ],

        fullBottom: [],
        splitRatio: "1fr 1fr"

    });

}