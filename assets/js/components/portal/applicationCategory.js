import { createApplicationCard } from "./applicationCard.js";

export function createApplicationCategory(category, applications) {

    return `

<section class="qa-category">

    <div class="qa-category-header">

        <i class="fa-solid ${category.icon}"></i>

        <h2>${category.title}</h2>

    </div>

    <div class="qa-category-grid">

        ${applications
            .map(createApplicationCard)
            .join("")}

    </div>

</section>

`;

}