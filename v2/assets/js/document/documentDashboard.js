import { createDashboard } from "../components/layout/dashboardLayout.js";
import { createHero } from "../components/hero/hero.js";
import { createKPICard } from "../components/cards/kpiCard.js";
import { createSection } from "../components/layout/sectionCard.js";
import { createProgressList } from "../components/lists/progressList.js";
import { createStatusList } from "../components/lists/statusList.js";
import { createEnterpriseTable } from "../components/table/enterpriseTable.js";
import { createStatusBadge } from "../components/table/simpleTable.js";

export function createDocumentDashboard({

    project,

    title,

    subtitle,

    statistics

}) {

    const hero = createHero({

        title: `📋 ${project.name}`,

        subtitle,

        spreadsheet: project.spreadsheet,

        lastUpdate: new Date().toLocaleDateString("id-ID"),

        status: "🟢 Connected"

    });

    const kpis = `

<div class="qdp-kpi-grid">

${createKPICard({

        title: "Total Section",

        value: statistics.total,

        icon: "fa-list",

        color: "#2563EB"

    })}

${createKPICard({

        title: "Approved",

        value: statistics.approved,

        icon: "fa-circle-check",

        color: "#22C55E"

    })}

${createKPICard({

        title: "Review",

        value: statistics.review,

        icon: "fa-clock",

        color: "#F59E0B"

    })}

${createKPICard({

        title: "Completion",

        value: statistics.progress + "%",

        icon: "fa-chart-line",

        color: "#0B2E59"

    })}

</div>

`;

    const progress = createSection({

        title: "Progress by Section",

        content: createProgressList(

            statistics.contentProgress.map(item => ({

                title: item.title,

                value: item.progress

            }))

        )

    });

    const status = createSection({

        title: "Document Status",

        content: createStatusList([

            {

                title: "Approved",

                value: statistics.approved,

                color: "success"

            },

            {

                title: "Review",

                value: statistics.review,

                color: "warning"

            },

            {

                title: "Draft",

                value: statistics.draft,

                color: "danger"

            }

        ])

    });

    const rows = statistics.sections.map((item, index) => ({

        no: index + 1,

        contents: item.contents,

        progress: Math.round(item.progressDokumen) + "%",

        status: createStatusBadge(item.status)

    }));
    
    const detail = createSection({

        title: `Detail ${title}`,

        content: createEnterpriseTable({

            id: `${title.replace(/\s+/g, "")}Table`,

            headers: [

                "No",

                "Contents",

                "Progress",

                "Status"

            ],

            columns: [

                "no",

                "contents",

                "progress",

                "status"

            ],

            rows: rows,

            pageSize: 10

        })

    });

    // Dashboard //
    return createDashboard({

        hero,

        kpis,

        fullTop: [],

        split: [

            progress,

            status

        ],

        splitRatio: "2fr 1fr",

        fullBottom: [

            detail

        ]

    });
} 