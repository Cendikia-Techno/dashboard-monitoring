import { createProgressDashboard } from "../../progress/progressDashboard.js";
import { createProgressList } from "../../components/lists/progressList.js";
import { getTPTRStatistics } from "../../services/statistics.js";
import { createSection } from "../../components/layout/sectionCard.js";
import { getCurrentProject } from "../../projectManager.js";
import { createProgressChart } from "../../components/charts/progressChart.js";
import { createPieChart } from "../../components/charts/pieChart.js";


export function renderTPTR() {

    const project = getCurrentProject();

    const statistics = getTPTRStatistics();

    const progressChart = createSection({

        title: "Progress by Category",

        content: createProgressChart({

            title: "TPTR Progress",

            items: statistics.categories.map(item => ({

                label: item.title,

                value: item.value

            }))

        })

    });

    const statusChart = createSection({

        title: "TPTR Status",

        content: createPieChart({

            title: "Material Status",

            items: statistics.statusDistribution

        })

    });

    return createProgressDashboard({

        project,

        title: "TPTR",

        subtitle: "TPTR Readiness",

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
            "Document",
            "Progress",
            "Remark"

        ],

        tableColumns: [

            "no",
            "category",
            "document",
            "progress",
            "remark"

        ],

        rowMapper: (item, index) => ({

            no: index + 1,

            category: item.kategori.trim(),

            document: item.namaDokumen,

            progress: item.progress + "%",
            remark: item.remark || "-"

        })

    });

}