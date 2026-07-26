import { getDashboardModules } from "../assets/js/router.js";

export function renderSidebar() {

    const menuItems = getDashboardModules()

        .filter(item => item.menu);

    return `

<h3>Navigation</h3>

<ul class="menu">

    <li class="menu-title">

        <span>QA MENU</span>

    </li>

    ${menuItems.map(item => `

        <li data-module="${item.id}">

            <i class="fas ${item.icon}"></i>

            <span>${item.title}</span>

        </li>

    `).join("")}

</ul>

`;

}