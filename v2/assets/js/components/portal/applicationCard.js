export function createApplicationCard(app) {

    return `

<div
    class="qa-app-card"
    data-id="${app.id}">

    <div class="qa-app-icon">

        <i class="fa-solid ${app.icon}"></i>

    </div>

    <div class="qa-app-body">

        <h3>${app.title}</h3>

        <p>${app.description}</p>

    </div>

    <div class="qa-app-footer">

        <button class="qa-open-btn">

            ${app.type === "dashboard"
                ? "Open Dashboard"
                : "Open Application"}

        </button>

    </div>

</div>

`;

}