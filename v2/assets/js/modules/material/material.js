import { createProgressDashboard } from "../../progress/progressDashboard.js";
import { createProgressList } from "../../components/lists/progressList.js";
import { getMaterialStatistics } from "../../services/statistics.js";
import { createSection } from "../../components/layout/sectionCard.js";
import { getCurrentProject } from "../../projectManager.js";
import { createProgressChart } from "../../components/charts/progressChart.js";
import { createPieChart } from "../../components/charts/pieChart.js";

export function renderMaterial() {
    const statistics = getMaterialStatistics();
    console.log("statusDistribution:", statistics.statusDistribution);
    const progressChart = createSection({

        title: "Progress by Category",

        content: createProgressChart({

            title: "Material Progress",

            items: statistics.categories.map(item => ({

                label: item.title,

                value: item.value

            }))

        })

    });

    const statusChart = createSection({

        title: "Material Status",

        content: createPieChart({

            title: "Material Status",

            items: statistics.statusDistribution

        })

    });

    return createProgressDashboard({

        project: getCurrentProject(),

        title: "Material",

        subtitle: "Material Readiness Dashboard",

        statistics: getMaterialStatistics(),

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

            "Material",

            "Arrival Date",

            "Used Date",

            "Status"

        ],

        tableColumns: [

            "no",

            "category",

            "material",

            "arrival",

            "used",

            "status"

        ],

        rowMapper: (item, index) => ({

            no: index + 1,

            category: item.kategori,

            material: item.material,

            arrival: new Date(item.arrivalDate)

                .toLocaleDateString("id-ID"),

            used: new Date(item.usedDate)

                .toLocaleDateString("id-ID"),

            status: item.status

        })

    });

}