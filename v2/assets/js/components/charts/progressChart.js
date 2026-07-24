export function createProgressChart({

    title,

    items

}) {

    return `

<div class="qdp-progress-chart">

    <div class="qdp-chart-title">

        <i class="fa-solid fa-chart-column"></i>

        ${title}

    </div>

    <div class="qdp-chart-body">

        ${items.map(item => `

            <div class="qdp-progress-row">

                <div class="qdp-progress-label">

                    ${item.label}

                </div>

                <div class="qdp-progress-bar">

                    <div

                        class="qdp-progress-fill"

                        style="width:${item.value}%">

                    </div>

                </div>

                <div class="qdp-progress-value">

                    ${item.value}%

                </div>

            </div>

        `).join("")}

    </div>

</div>

`;

}