export function createProgressList(items) {

    return `

    <div class="progress-list">

        ${items.map(item => `

            <div class="progress-item">

                <div class="progress-header">

                    <span>${item.title}</span>

                    <strong>${item.value}%</strong>

                </div>

                <div class="module-progress-bar">
                    <div class="module-progress-fill" style="width:${item.value}%"></div>
                </div>

            </div>

        `).join("")}

    </div>

    `;

}