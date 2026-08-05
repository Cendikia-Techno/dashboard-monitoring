export function createRecentUpdateList(items = []) {

    if (!items.length) {

        return `
        <div class="empty-state">

            <i class="fa-solid fa-clock"></i>

            <p>No recent updates.</p>

        </div>
        `;

    }

    return `

    <div class="recent-update-list">

        ${items.map(item => `

        <div class="recent-update-item">

            <div class="recent-top">

                <div class="recent-module">

                    <i class="fa-solid ${item.icon} recent-icon ${item.color}"></i>

                    ${item.module}

                </div>

                <div class="recent-right">

                    <span class="recent-revision">

                        Update ke-${item.revision}

                    </span>

                    ${item.isNew ? `
                    <span class="recent-badge">

                        NEW

                    </span>
                    ` : ""}

                </div>

            </div>

            <div class="recent-ago">

                Last Update

                <strong>${item.timeAgo}</strong>

            </div>

            <div class="recent-date">

                ${item.dateString}

            </div>

        </div>

        `).join("")}

    </div>

    `;

}