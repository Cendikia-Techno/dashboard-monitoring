export function createDashboard({

    hero = "",

    kpis = "",

    sections = []

}) {

    return `

    <div class="dashboard-layout">

        ${hero}

        ${kpis}

        ${sections.join("")}

    </div>

    `;

}