export function createHero({

title,

subtitle,

lastUpdate,

status

}){

return `

<div class="hero">

    <div>

        <h1>${title}</h1>

        <p>${subtitle}</p>

    </div>

    <div class="hero-info">

        <div>

            <small>Last Update</small>

            <strong>${lastUpdate}</strong>

        </div>

        <div>

            <small>Status</small>

            <span class="badge online">${status}</span>

        </div>

    </div>

</div>

`;

}