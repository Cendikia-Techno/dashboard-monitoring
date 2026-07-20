export function createSection({

title,

content

}){

return `

<div class="section-card">

    <div class="section-header">

        <h3>${title}</h3>

    </div>

    <div class="section-body">

        ${content}

    </div>

</div>

`;

}