export function createAttentionList(items = []) {

    if (!items.length) {

        return `

        <div class="empty-state">

            <i class="fa-solid fa-circle-check"></i>

            <p>No critical action.</p>

        </div>

        `;

    }

    return `

    <div class="attention-list">

        ${items.map(item => `

        <div class="attention-card ${item.priority}">

            ${item.module === "Launching" ? `

                <div class="attention-module">

                    <i class="fa-solid fa-circle-exclamation"></i>

                    ${item.module}

                </div>

                <div class="attention-title">

                    Launching Requirement Items

                </div>

                ` : `

                <div class="attention-module">

                    <i class="fa-solid fa-circle-exclamation"></i>

                    ${item.module}

                </div>

                <div class="attention-subtitle">

                    ${item.subtitle}

                </div>

                <div class="attention-title">

                    ${item.title}

                </div>

                `}

            <div class="attention-value">

                ${item.outstanding}

            </div>

            <div class="attention-label">

                Outstanding

            </div>

        </div>

        `).join("")}

    </div>

    `;

}