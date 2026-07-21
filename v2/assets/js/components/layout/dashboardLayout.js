export function createDashboard({

    hero = "",

    kpis = "",

    fullTop = [],

    split = [],

    fullBottom = [],

    splitRatio = "1fr 1fr"

}) {

    return `

    <div class="dashboard-page">

        ${hero}

        ${kpis}

        ${fullTop.join("")}

        ${split.length
            ?

            `
                <div
                class="qdp-section-grid"
                style="grid-template-columns:${splitRatio};"
                >

                ${split.join("")}

                </div>
                `

            : ""
        }

        ${fullBottom.join("")}

    </div>

    `;

}