// ======================================================
// Enterprise Table Store
// ======================================================

const tableStore = new Map();

function registerTable(id, config) {
    tableStore.set(id, config);
}

function getTable(id) {
    return tableStore.get(id);
}

// ======================================================
// Create Enterprise Table
// ======================================================

export function createEnterpriseTable({

    id,
    headers,
    columns,
    rows,
    pageSize = 10

}) {

    registerTable(id, {

        headers,
        columns,
        rows,
        pageSize

    });

    return `

<div class="qdp-enterprise-table" id="${id}">

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

                    ${headers.map((h, index) => `

                    <th data-column="${columns[index]}">

                    ${h}

                    </th>

                    `).join("")}

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

function renderTable(tbody, columns, rows) {

    tbody.innerHTML = rows.map(row => `

<tr>

${columns.map(col => `

<td>${row[col] ?? ""}</td>

`).join("")}

</tr>

`).join("");

}

function renderInfo(info, start, end, total) {

    info.innerHTML = `

Showing

${total === 0 ? 0 : start + 1}

to

${Math.min(end, total)}

of

${total}

entries

`;

}

function renderPagination(

    pagination,
    totalRows,
    pageSize,
    currentPage,
    onPageChange

) {

    const totalPages = Math.ceil(totalRows / pageSize);

    pagination.innerHTML = "";

    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {

        pagination.innerHTML += `

<button

class="${i === currentPage ? "active" : ""}"

data-page="${i}">

${i}

</button>

`;

    }

    pagination.querySelectorAll("button").forEach(btn => {

        btn.onclick = () => {

            onPageChange(

                Number(btn.dataset.page)

            );

        };

    });

}

function sortRows(rows, column, direction) {

    return [...rows].sort((a, b) => {

        const valueA = a[column] ?? "";
        const valueB = b[column] ?? "";

        // Number
        if (
            !isNaN(valueA) &&
            !isNaN(valueB)
        ) {

            return direction === "asc"

                ? Number(valueA) - Number(valueB)

                : Number(valueB) - Number(valueA);

        }

        // String
        return direction === "asc"

            ? String(valueA).localeCompare(String(valueB))

            : String(valueB).localeCompare(String(valueA));

    });

}

function updateHeaderSort(headers, activeColumn, direction) {

    headers.forEach(th => {

        const column = th.dataset.column;

        const title = th.dataset.title || th.textContent;

        th.dataset.title = title;

        if (column === activeColumn) {

            th.innerHTML = `

            ${title}

            <i class="fa-solid ${direction === "asc"
                    ? "fa-sort-up"
                    : "fa-sort-down"} sort-arrow"></i>

        `;

            th.classList.add("sort-active");

        } else {

            th.innerHTML = title;

            th.classList.remove("sort-active");

        }

    });

}

// ======================================================
// Initialize Enterprise Table
// ======================================================

export function initEnterpriseTable(id) {

    const container = document.getElementById(id);

    if (!container) return;

    const config = getTable(id);

    if (!config) {

        console.error("EnterpriseTable config not found:", id);

        return;

    }

    const {

        columns,
        rows,
        pageSize: defaultPageSize

    } = config;

    let filtered = [...rows];

    let currentPage = 1;

    let pageSize = defaultPageSize;

    let sortColumn = null;

    let sortDirection = "asc";

    const tbody = container.querySelector("tbody");

    const info = container.querySelector(".qdp-table-info");

    const pagination = container.querySelector(".qdp-pagination");

    const search = container.querySelector(".qdp-table-search");

    const pageSelect = container.querySelector(".qdp-page-size");

    const tableHeaders = container.querySelectorAll("thead th");

    pageSelect.value = pageSize;

    // ==================================================
    // Render Table
    // ==================================================

    function render() {

        const start = (currentPage - 1) * pageSize;

        const end = start + pageSize;

        const pageRows = filtered.slice(start, end);

        renderTable(

            tbody,

            columns,

            pageRows

        );

        renderInfo(

            info,

            start,

            end,

            filtered.length

        );

        renderPagination(

            pagination,

            filtered.length,

            pageSize,

            currentPage,

            (page) => {

                currentPage = page;

                render();

            }

        );

    }

    // ==================================================
    // Search
    // ==================================================

    search.addEventListener("input", e => {

        const keyword = e.target.value.toLowerCase();

        filtered = rows.filter(row =>

            Object.values(row)

                .join(" ")

                .toLowerCase()

                .includes(keyword)

        );

        currentPage = 1;

        render();

    });

    // ==================================================
    // Page Size
    // ==================================================

    pageSelect.addEventListener("change", e => {

        pageSize = Number(e.target.value);

        currentPage = 1;

        render();

    });

    tableHeaders.forEach(th => {

        th.style.cursor = "pointer";

        th.onclick = () => {

            const column = th.dataset.column;

            if (sortColumn === column) {

                sortDirection =

                    sortDirection === "asc"

                        ? "desc"

                        : "asc";

            } else {

                sortColumn = column;

                sortDirection = "asc";

            }

            filtered = sortRows(

                filtered,

                sortColumn,

                sortDirection

            );

            updateHeaderSort(

                tableHeaders,

                sortColumn,

                sortDirection

            );

            currentPage = 1;

            render();

        };

    });

    render();

}