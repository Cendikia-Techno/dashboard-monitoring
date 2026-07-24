import { getCurrentProject } from "../../projectManager.js";

export function createHero({

    title,

    lastUpdate = "-",

    nextRefresh = "--:--",

    showRefreshButton = true

}) {

    const project = getCurrentProject();

    return `

<div class="qdp-hero">

    <div class="qdp-hero-left">

        <div class="hero-project">

            <div
                class="hero-project-icon">

                <i class="fa-solid ${project.icon}"></i>

            </div>

            <div>

                <h1>${project.title}</h1>

                <p>${project.description}</p>

            </div>

        </div>

        <h2 class="hero-page-title">

            ${title}

        </h2>

        ${project.dataSource ? `

        <div class="hero-link">

            <a
                href="${project.dataSource}"
                target="_blank">

                <i class="fa-solid fa-table"></i>

                Source Data

            </a>

        </div>

        ` : ""}

    </div>

    <div class="qdp-hero-right">

        <div class="hero-info">

            <div>

                <small>Last Update</small>

                <strong>

                    ${lastUpdate}

                </strong>

            </div>
             <div>

                <small>Next Refresh</small>

                <strong id="refreshCountdown">

                    ${nextRefresh}

                </strong>

            </div>

        </div>

        ${showRefreshButton ? `

<button
id="refreshNowBtn"
class="qdp-btn-refresh">

<i class="fa-solid fa-rotate-right"></i>

Refresh

</button>

`: ""}

    </div>

</div>

`;

}