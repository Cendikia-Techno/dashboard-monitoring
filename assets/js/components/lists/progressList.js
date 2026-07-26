export function createProgressList(items = []) {

    return `

    <div class="progress-list">

        ${items.map(item => {

        const hasProgress = typeof item.value === "number";

        const levelClass = {
            high: "danger",
            medium: "warning",
            low: "success"
        }[item.level] || "secondary";

        return `

            <div class="progress-item">

                <div class="progress-header">

                    <div>

                        <div class="progress-title">

                            ${item.title}

                        </div>

                        ${item.subtitle ? `

                        <div class="progress-subtitle">

                            ${item.subtitle}

                        </div>

                        ` : ""}

                    </div>

                    <div>

                        ${hasProgress
                ? `<strong>${item.value}%</strong>`
                : item.level
                    ? `<span class="progress-level ${levelClass}">
                                        ${item.level.toUpperCase()}
                                   </span>`
                    : ""
            }

                    </div>

                </div>

                ${hasProgress ? `

                <div class="module-progress-bar">

                    <div class="module-progress-fill"

                        style="width:${item.value}%">

                    </div>

                </div>

                ` : ""}

            </div>

            `;

    }).join("")}

    </div>

    `;

}