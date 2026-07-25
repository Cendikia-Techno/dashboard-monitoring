export function createBreadcrumb({

    project,

    module

}) {

    return `

<div class="qdp-breadcrumb">

    <span>

        <i class="fa-solid fa-house"></i>

        QA Portal

    </span>

    <i class="fa-solid fa-chevron-right"></i>

    <span>

        Dashboard

    </span>

    <i class="fa-solid fa-chevron-right"></i>

    <span>

        ${module}

    </span>

    <i class="fa-solid fa-chevron-right"></i>

    <strong>

        ${project}

    </strong>

</div>

`;

}