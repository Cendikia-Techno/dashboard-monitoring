export function createAttentionList(items){

    return `

    <div class="qdp-attention-list">

        ${items.map(item => `

            <div class="qdp-attention-item">

                <div class="qdp-attention-icon ${item.level}"></div>

                <div class="qdp-attention-content">

                    <strong>${item.title}</strong>

                    <small>${item.message}</small>

                </div>

            </div>

        `).join("")}

    </div>

    `;

}