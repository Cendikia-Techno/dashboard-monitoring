export function createKPICard({

    title,

    value,

    icon,

    color = "var(--primary)",

    subtitle = "",

    trend = ""

}) {

    return `

<div class="kpi-card">

    <div class="kpi-top">

        <div class="kpi-icon"

             style="background:${color}">

            <i class="fas ${icon}"></i>

        </div>

        <span class="kpi-trend">

            ${trend}

        </span>

    </div>

    <div class="kpi-body">

        <h4>${title}</h4>

        <h2>${value}</h2>

        <p>${subtitle}</p>

    </div>

</div>

`;

}