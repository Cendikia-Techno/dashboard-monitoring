import { createDashboard } from "../components/layout/dashboardLayout.js";
import { createHero } from "../components/hero/hero.js";
import { createKPICard } from "../components/cards/kpiCard.js";
import { createSection } from "../components/layout/sectionCard.js";
import { createProgressList } from "../components/lists/progressList.js";
import { createEnterpriseTable } from "../components/table/enterpriseTable.js";

export function createProgressDashboard({

    project,

    title,

    subtitle,

    statistics,

    tableHeaders,

    tableColumns,

    rowMapper,

    leftPanel = null,
    rightPanel = null,
    bottomPanel = null

}) {
    console.log("Critical:", statistics.critical);

    // hero //
    const hero = createHero({

        title: `📊 ${project.name}`,

        subtitle,

        spreadsheet: project.spreadsheet,

        lastUpdate: new Date().toLocaleString("id-ID"),

        nextRefresh: "03:00",

        showRefreshButton: true

    });

    // KPI //
    const kpis = `

    <div class="qdp-kpi-grid">

    ${createKPICard({

        title: "Total Task",

        value: statistics.total,

        icon: "fa-list-check",

        color: "#7C3AED"

    })}

    ${createKPICard({

        title: "Finished",

        value: statistics.finish,

        icon: "fa-circle-check",

        color: "#22C55E"

    })}

    ${createKPICard({

        title: "Remaining",

        value: statistics.remaining,

        icon: "fa-clock",

        color: "#F59E0B"

    })}

    ${createKPICard({

        title: "Progress",

        value: statistics.progress + "%",

        icon: "fa-chart-line",

        color: "#0B2E59"

    })}

    </div>

    `;

    // left progress //
    const left = leftPanel ??

        createSection({

            title: "Progress by Category",

            content: createProgressList(

                statistics.categories

            )

        });

    // Right Critical //
    const right = rightPanel ??

        createSection({

            title: "Critical Progress",

            content: createProgressList(

                statistics.critical

            )

        });


    // Table //

    const rows = statistics.rows.map(rowMapper);

    const detail = createSection({

        title: `Detail ${title}`,

        content: createEnterpriseTable({

            id: `${title.replace(/\s+/g, "")}Table`,

            headers: tableHeaders,

            columns: tableColumns,

            rows,

            pageSize: 10

        })

    });

    return createDashboard({

        hero,

        kpis,

        fullTop: [],

        split: [
            left,
            right
        ],

        splitRatio: "1fr 1fr",

        fullBottom: [
            ...(bottomPanel ? [bottomPanel] : []),

            detail

        ]

    });
}