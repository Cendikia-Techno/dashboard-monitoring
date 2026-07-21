export function createEnterpriseTable({

    id,

    headers,

    columns,

    rows,

    pageSize = 10

}) {

    return `

<div class="qdp-enterprise-table" id="${id}"

     data-columns='${JSON.stringify(columns)}'

     data-rows='${encodeURIComponent(JSON.stringify(rows))}'

     data-pagesize="${pageSize}">

    <div class="qdp-table-toolbar">

        <div>

            Show

            <select class="qdp-page-size">

                <option value="10">10</option>

                <option value="25">25</option>

                <option value="50">50</option>

            </select>

            entries

        </div>

        <div>

            <input

                class="qdp-table-search"

                type="text"

                placeholder="Search...">

        </div>

    </div>

    <div class="qdp-table-wrapper">

        <table>

            <thead>

                <tr>

                    ${headers.map(h => `<th>${h}</th>`).join("")}

                </tr>

            </thead>

            <tbody></tbody>

        </table>

    </div>

    <div class="qdp-table-footer">

        <div class="qdp-table-info"></div>

        <div class="qdp-pagination"></div>

    </div>

</div>

`;

}

export function initEnterpriseTable(id) {

    const container = document.getElementById(id);

    if (!container) return;

    const columns = JSON.parse(

        container.dataset.columns

    );

    let rows = JSON.parse(

        decodeURIComponent(

            container.dataset.rows

        )

    );

    let filtered = [...rows];

    let currentPage = 1;

    let pageSize = Number(

        container.dataset.pagesize

    );

    const tbody =

        container.querySelector("tbody");

    const info =

        container.querySelector(".qdp-table-info");

    const pagination =

        container.querySelector(".qdp-pagination");

    const search =

        container.querySelector(".qdp-table-search");

    const pageSelect =

        container.querySelector(".qdp-page-size");

    function render() {

        const start =

            (currentPage - 1) * pageSize;

        const end =

            start + pageSize;

        const pageRows =

            filtered.slice(start, end);

        tbody.innerHTML =

            pageRows.map(row => `

<tr>

${columns.map(col => `

<td>${row[col]}</td>

`).join("")}

</tr>

`).join("");

        info.innerHTML =

            `Showing ${filtered.length === 0 ? 0 : start + 1}

to ${Math.min(end, filtered.length)}

of ${filtered.length} entries`;

        renderPagination();

    }

    search.addEventListener("input", e => {

        const keyword =

            e.target.value.toLowerCase();

        filtered =

            rows.filter(row =>

                Object.values(row)

                    .join(" ")

                    .toLowerCase()

                    .includes(keyword)

            );

        currentPage = 1;

        render();

    });

    pageSelect.addEventListener("change", e => {

        pageSize =

            Number(e.target.value);

        currentPage = 1;

        render();

    });

    function renderPagination() {

        const totalPages =

            Math.ceil(filtered.length / pageSize);

        pagination.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {

            pagination.innerHTML += `

<button

class="${i === currentPage ? 'active' : ''}"

data-page="${i}">

${i}

</button>

`;

        }

        pagination

            .querySelectorAll("button")

            .forEach(btn => {

                btn.onclick = () => {

                    currentPage =

                        Number(btn.dataset.page);

                    render();

                }

            });

    }

    render();

}