import { createDashboard } from "../../components/layout/dashboardLayout.js";
import { createHero } from "../../components/hero/hero.js";
import { createKPICard } from "../../components/cards/kpiCard.js";
import { createSection } from "../../components/layout/sectionCard.js";
import { createProgressList } from "../../components/lists/progressList.js";
import { createAttentionList } from "../../components/lists/attentionList.js";
import { createActivityList } from "../../components/lists/activityList.js";

export function renderSummary() {

    // ===========================
    // Hero
    // ===========================

    const hero = createHero({

        title: "🚢 Landing Dock Project #1",

        subtitle: "Executive Quality Dashboard",

        lastUpdate: "18 Jul 2026",

        status: "🟢 Connected"

    });

    // ===========================
    // KPI
    // ===========================

    const kpis = `

    <div class="kpi-grid">

        ${createKPICard({

        title: "ITP",

        value: "245",

        icon: "fa-clipboard-check",

        color: "#0B2E59",

        subtitle: "Inspection Test Plan"

    })}

        ${createKPICard({

        title: "Quality Plan",

        value: "132",

        icon: "fa-file-lines",

        color: "#2563EB",

        subtitle: "Quality Plan"

    })}

        ${createKPICard({

        title: "Inspection",

        value: "84%",

        icon: "fa-magnifying-glass",

        color: "#16A34A",

        subtitle: "Completion"

    })}

        ${createKPICard({

        title: "Material",

        value: "92%",

        icon: "fa-box",

        color: "#F59E0B",

        subtitle: "Readiness"

    })}

    </div>

    `;

    // ===========================
    // Section
    // ===========================

    const progress = createSection({

        title: "Overall Progress",

        content: createProgressList([

            { title: "ITP", value: 81 },

            { title: "Quality Plan", value: 73 },

            { title: "Inspection", value: 91 },

            { title: "Launching", value: 78 },

            { title: "Material", value: 84 },

            { title: "TPTR", value: 69 },

            { title: "HAT/SAT", value: 55 }

        ])

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

        sections: [

            progress,

            bottom

        ]

    });

}