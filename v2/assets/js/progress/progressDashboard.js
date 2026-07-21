import { createDashboard } from "../components/layout/dashboardLayout.js";
import { createHero } from "../components/hero/hero.js";
import { createKPICard } from "../components/cards/kpiCard.js";
import { createSection } from "../components/layout/sectionCard.js";
import { createProgressList } from "../components/lists/progressList.js";
import { createSimpleTable } from "../components/table/simpleTable.js";

export function createProgressDashboard({

    project,

    title,

    subtitle,

    stats

}) {

    // hero //
    const hero = createHero({

        title: `📊 ${project.name}`,

        subtitle,

        lastUpdate: new Date().toLocaleDateString("id-ID"),

        status: "🟢 Connected"

    });

    // KPI //
    const kpis = `

    <div class="qdp-kpi-grid">

    ${createKPICard({

        title: "Total Item",

        value: stats.totalItem,

        icon: "fa-list",

        color: "#2563EB"

    })}

    ${createKPICard({

        title: "Total Task",

        value: stats.totalTask,

        icon: "fa-list-check",

        color: "#7C3AED"

    })}

    ${createKPICard({

        title: "Finished",

        value: stats.finishTask,

        icon: "fa-circle-check",

        color: "#22C55E"

    })}

    ${createKPICard({

        title: "Progress",

        value: stats.averageProgress + "%",

        icon: "fa-chart-line",

        color: "#0B2E59"

    })}

    </div>

    `;

    // Progress //
    const progress = createSection({

        title: "Progress by Item",

        content: createProgressList(

            stats.categoryProgress.map(item => ({

                title: item.category,

                value: item.progress

            }))

        )

    });

    // Critical //
    const critical = createSection({

        title: "Critical Progress",

        content: createProgressList(

            stats.rows

                .filter(item => item.remaining > 0)

                .sort((a, b) => a.progress - b.progress)

                .slice(0, 5)

                .map(item => ({

                    title: `${item.kategori} • ${item.item}`,

                    value: Math.round(item.progress)

                }))

        )

    });

    // Table //
    
    const rows = stats.rows.map((item, index) => `

        <tr>

        <td>${index + 1}</td>

        <td>${item.kategori}</td>

        <td>${item.item}</td>

        <td>${item.totalTask}</td>

        <td>${item.finish}</td>

        <td>${Math.round(item.progress)}%</td>

        <td>${item.remaining}</td>

        </tr>

        `);

    const detail = createSection({

        title: `Detail ${title}`,

        content: createSimpleTable(

            [

                "No",

                "Category",

                "Item",

                "Task",

                "Finish",

                "Progress",

                "Remaining"

            ],

            rows

        )

    });

    return createDashboard({

        hero,

        kpis,

        fullTop: [],

        split: [

            progress,

            critical

        ],

        splitRatio: "1fr 1fr",

        fullBottom: [

            detail

        ]

    });
}