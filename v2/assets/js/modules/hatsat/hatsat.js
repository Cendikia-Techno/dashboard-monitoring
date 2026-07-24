import { createProgressDashboard } from "../../progress/progressDashboard.js";
import { createProgressList } from "../../components/lists/progressList.js";
import { getHATSATStatistics } from "../../services/statistics.js";
import { createSection } from "../../components/layout/sectionCard.js";
import { getCurrentProject } from "../../projectManager.js";
import { createProgressChart } from "../../components/charts/progressChart.js";
import { createPieChart } from "../../components/charts/pieChart.js";

export function renderHATSAT() {

    const project = getCurrentProject();

    const statistics = getHATSATStatistics();

    const progressChart = createSection({

        title: "Progress by Category",

        content: createProgressChart({

            title: "HATSAT Progress",

            items: statistics.categories.map(item => ({

                label: item.title,

                value: item.value

            }))

        })

    });

    const statusChart = createSection({

        title: "HATSAT Status",

        content: createPieChart({

            title: "Material Status",

            items: statistics.statusDistribution

        })

    });

    return createProgressDashboard({

        project,

        title: "HAT / SAT",

        subtitle: "Harbour Acceptance Test & Sea Acceptance Test",

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

            "Function Test",

            "Status",

            "Plan",

            "Actual"

        ],

        tableColumns: [

            "no",

            "category",

            "system",

            "inspection",

            "status",

            "plan",

            "actual"

        ],

        rowMapper: (item, index) => ({

            no: index + 1,

            category: item.kategori,

            system: item.sistem,

            inspection: item.inspeksi,

            status: item.statusFungsi,

            plan: item.planDate || "-",

            actual: item.actualDate || "-"

        })

    });

}