import { createProgressDashboard } from "../../progress/progressDashboard.js";
import { createProgressList } from "../../components/lists/progressList.js";
import { getInspectionStatistics } from "../../services/statistics.js";
import { createSection } from "../../components/layout/sectionCard.js";
import { getCurrentProject } from "../../projectManager.js";
import { createProgressChart } from "../../components/charts/progressChart.js";
import { createPieChart } from "../../components/charts/pieChart.js";

export function renderInspection() {
    const project = getCurrentProject();

    const statistics = getInspectionStatistics();

    const progressChart = createSection({

        title: "Progress by Category",

        content: createProgressChart({

            title: "Inspection Progress",

            items: statistics.categories.map(item => ({

                label: item.title,

                value: item.value

            }))

        })

    });

    return createProgressDashboard({

        project,

        statistics: getInspectionStatistics(),

        leftPanel: progressChart,

        rightPanel: createSection({

            title: "🔥 Critical Top 5",

            content: createProgressList(

                statistics.critical

            )

        }),

        tableHeaders: [

            "No",

            "Category",

            "Inspection Item",

            "Finish",

            "Total",

            "Progress"

        ],

        tableColumns: [

            "no",

            "category",

            "item",

            "finish",

            "total",

            "progress"

        ],

        rowMapper: (item, index) => ({

            no: index + 1,

            category: item.kategori,

            item: item.item,

            finish: item.finish,

            total: item.totalTask,

            progress: Math.round(item.progress) + "%"

        })

    });

}