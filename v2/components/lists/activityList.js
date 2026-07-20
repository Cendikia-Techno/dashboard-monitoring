export function createActivityList(items){

    return `

    <div class="qdp-activity-list">

        ${items.map(item => `

            <div class="qdp-activity-item">

                <div class="qdp-activity-dot ${item.type}"></div>

                <div class="qdp-activity-content">

                    <strong>${item.title}</strong>

                    <small>${item.time}</small>

                </div>

            </div>

        `).join("")}

    </div>

    `;

}