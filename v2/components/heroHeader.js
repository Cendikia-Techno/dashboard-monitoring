export function createHeroHeader({

    project,

    progress,

    lastUpdate,

    version = "QDP v2.0.0-dev",

    status = "Online",

    kpis = []

}) {

    return `

    <div class="hero-header">

        <div class="hero-top">

            <div class="hero-title">

                <h1>🚢 ${project}</h1>

                <p>Quality Assurance Dashboard</p>

            </div>

            <div class="hero-status">

                <span class="badge online">🟢 ${status}</span>

                <span class="badge version">${version}</span>

            </div>

        </div>

        <div class="hero-middle">

            <div class="hero-progress">

                <small>Overall Progress</small>

                <div class="progress-bar">

                    <div class="progress-fill"

                        style="width:${progress}%">

                    </div>

                </div>

                <strong>${progress}%</strong>

            </div>

            <div class="hero-update">

                <small>Last Update</small>

                <strong>${lastUpdate}</strong>

            </div>

        </div>

        <div class="hero-bottom">

            ${kpis.map(item => `

                <div class="mini-kpi">

                    <span>${item.label}</span>

                    <strong>${item.value}</strong>

                </div>

            `).join("")}

        </div>

    </div>

    `;

}