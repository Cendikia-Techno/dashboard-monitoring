export function createDashboard({

    hero = "",

    kpis = "",

    sections = []

}) {

    return `

    <div class="dashboard-page">

        ${hero}

        ${kpis}

        ${sections.join("")}

    </div>

    `;

}