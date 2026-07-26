import { getCurrentProject } from "../../projectManager.js";
import { getCurrentModuleInfo } from "../../router.js";

export function createHero({

    lastUpdate = "-",

    nextRefresh = "--:--",

    showRefreshButton = true

}) {

    const project = getCurrentProject();

    const module = getCurrentModuleInfo();

    return `

<div class="qdp-hero">

    <div class="qdp-hero-left">

        <div class="hero-project">

            <div class="hero-project-icon">

                <i class="fa-solid ${project.icon}"></i>

            </div>

            <div>

                <h1>${project.title}</h1>

                <p>${project.description}</p>

            </div>

        </div>

        ${module.subtitle ? `

        <p class="hero-page-subtitle">

            ${module.subtitle}

        </p>

        ` : ""}

        ${project.dataSource || project.dataRingkas ? `

        <div class="hero-links">

            ${project.dataSource ? `

            <div class="hero-link">

                <a
                    href="${project.dataSource}"
                    target="_blank"
                    rel="noopener noreferrer">

                    <i class="fa-solid fa-table"></i>

                    Source Data (Inspection Status)

                    <i class="fa-solid fa-arrow-up-right-from-square"></i>

                </a>

            </div>

            ` : ""}

            ${project.dataRingkas ? `

            <div class="hero-link">

                <a
                    href="${project.dataRingkas}"
                    target="_blank"
                    rel="noopener noreferrer">

                    <i class="fa-solid fa-chart-simple"></i>

                    Source Data (Tim Ringkas)

                    <i class="fa-solid fa-arrow-up-right-from-square"></i>

                </a>

            </div>

            ` : ""}

        </div>

        ` : ""}

    </div>

    <div class="qdp-hero-right">

        <div class="hero-info">

            <div>

                <small>Last Update</small>

                <strong id="lastUpdateText">

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

        ` : ""}

    </div>

</div>

`;

}