import { menuItems } from "../config/navigation.js";

export function renderSidebar(){

return`

<ul>

${menuItems.map(item=>`

<li data-module="${item.id}">

<i class="fas ${item.icon}"></i>

<span>${item.label}</span>

</li>

`).join("")}

</ul>

`;

}