export function renderToolbar() {

    return `

<section class="toolbar">

    <div class="toolbar-left">

        <div
            id="categoryBadge"
            class="toolbar-category">

        </div>

        <div class="toolbar-group">

            <label>

                Project

            </label>

            <select id="projectSelect">

            </select>

        </div>

    </div>

    <div class="toolbar-right">

        <span
            id="lastUpdate">

            -

        </span>

        <button
            id="backPortalBtn"
            class="portal-btn">

            <i class="fa-solid fa-house"></i>

            Portal

        </button>

    </div>

</section>

`;

}