export function createStatusList(items){

    return `

    <div class="qdp-status-list">

        ${items.map(item=>`

            <div class="qdp-status-item">

                <div class="qdp-status-header">

                    <span>

                        <i class="fas ${item.icon}"
                           style="color:${item.color}"></i>

                        ${item.title}

                    </span>

                    <strong>${item.value}</strong>

                </div>

            </div>

        `).join("")}

    </div>

    `;

}