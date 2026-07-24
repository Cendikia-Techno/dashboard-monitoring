import { menuItems } from "../assets/js/config/navigation.js";
import { QA_APPLICATIONS } from "../assets/js/config/qaApplications.js";

export function renderSidebar() {

    return `

<h3>Navigation</h3>

<ul class="menu">

    <li class="menu-title">

        <span>QA MENU</span>

    </li>

    ${menuItems.map(item => `

        <li data-module="${item.id}">

            <i class="fas ${item.icon}"></i>

            <span>${item.label}</span>

        </li>

    `).join("")}

</ul>

`;

}