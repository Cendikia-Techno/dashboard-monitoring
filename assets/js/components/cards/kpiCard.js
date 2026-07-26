export function createKPICard({

    title,

    value,

    icon,

    color = "var(--primary)",

    subtitle = "",

    trend = ""

}) {

    return `

<div class="qdp-kpi-card">

    <div
        class="qdp-kpi-icon"
        style="background:${color}"
    >
        <i class="fas ${icon}"></i>
    </div>

    <div class="qdp-kpi-content">

        <h4>${title}</h4>

        <h2>${value}</h2>

        <p>${subtitle}</p>

    </div>

</div>

`;

}