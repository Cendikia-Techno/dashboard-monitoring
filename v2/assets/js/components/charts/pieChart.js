let pieChartCounter = 0;

export function createPieChart({

    title,

    items,

    colors = []

}) {

    const chartId = `pieChart-${pieChartCounter++}`;

    setTimeout(() => {

        const canvas = document.getElementById(chartId);

        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        new Chart(ctx, {

            type: "doughnut",

            data: {

                labels: items.map(item => item.status),

                datasets: [

                    {

                        data: items.map(item => item.value),

                        backgroundColor:

                            colors.length

                                ? colors

                                : [

                                    "#22C55E",
                                    "#F59E0B",
                                    "#EF4444",
                                    "#3B82F6",
                                    "#8B5CF6",
                                    "#06B6D4"

                                ],

                        borderWidth: 2,

                        borderColor: "#ffffff"

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                cutout: "65%",

                plugins: {

                    legend: {

                        position: "bottom",

                        labels: {

                            usePointStyle: true,

                            padding: 20

                        }

                    },

                    title: {

                        display: true,

                        text: title,

                        font: {

                            size: 16,

                            weight: "bold"

                        }

                    }

                }

            }

        });

    }, 0);

    return `

<div class="qdp-pie-chart">

    <canvas id="${chartId}"></canvas>

</div>

`;

}