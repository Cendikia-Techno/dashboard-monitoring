export function createSimpleTable(headers, rows){

    return `

    <div class="qdp-table-wrapper">

        <table class="qdp-table">

            <thead>

                <tr>

                    ${headers.map(h=>`<th>${h}</th>`).join("")}

                </tr>

            </thead>

            <tbody>

                ${rows.join("")}

            </tbody>

        </table>

    </div>

    `;

}

export function createStatusBadge(status){

    const color={

        Approved:"success",

        Review:"warning",

        Draft:"danger"

    };

    return `

    <span class="qdp-badge ${color[status]||"secondary"}">

        ${status}

    </span>

    `;

}