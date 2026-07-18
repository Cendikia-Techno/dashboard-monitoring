import {
    getProjects,
    setCurrentProject
} from "../projectManager.js";

export function initToolbar() {

    const select = document.getElementById("projectSelect");

    select.innerHTML = "";

    getProjects().forEach(project => {

        select.innerHTML += `

<option value="${project.id}">

${project.name}

</option>

`;

    });

    select.addEventListener("change", (e) => {

        setCurrentProject(e.target.value);

        console.log("Current Project :", e.target.value);

    });

}