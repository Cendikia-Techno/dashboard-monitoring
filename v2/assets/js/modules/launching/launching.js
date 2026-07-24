import { createProgressDashboard } from "../../progress/progressDashboard.js";
import { createProgressList } from "../../components/lists/progressList.js";
import { getLaunchingStatistics } from "../../services/statistics.js";
import { createSection } from "../../components/layout/sectionCard.js";
import { getCurrentProject } from "../../projectManager.js";
import { createProgressChart } from "../../components/charts/progressChart.js";
import { createPieChart } from "../../components/charts/pieChart.js";

export function renderLaunching() {

    const project = getCurrentProject();

    const statistics = getLaunchingStatistics();

    const progressChart = createSection({

        title: "Progress by Category",

        content: createProgressChart({

            title: "Launching Progress",

            items: statistics.categories.map(item => ({

                label: item.title,

                value: item.value

            }))

        })

    });

    const statusChart = createSection({

        title: "Launching Status",

        content: createPieChart({

            title: "Material Status",

            items: statistics.statusDistribution

        })

    });

    return createProgressDashboard({

        project,

        title: "Launching",

        subtitle: "Launching Readiness",

        statistics,

        leftPanel: progressChart,

        rightPanel: statusChart,

        bottomPanel: createSection({

            title: "🔥 Critical Top 5",

            content: createProgressList(

                statistics.critical

            )

        }),

        tableHeaders: [

            "No",
            "Category",
            "System",
            "Inspection",
            "Status",
            "PIC",
            "Plan",
            "Actual"

        ],

        tableColumns: [

            "no",
            "category",
            "system",
            "inspection",
            "status",
            "pic",
            "plan",
            "actual"

        ],

        rowMapper: (item, index) => ({

            no: index + 1,

            category: item.kategori,

            system: item.sistem,

            inspection: item.inspeksi,

            status: item.statusInspeksi,

            pic: item.pic,

            plan: item.planDate,

            actual: item.actualDate || "-"

        })

    });

}