export function createPortalLayout(content = "") {

    return `

<div class="portal">

    <header class="portal-header">

        <div class="portal-header-left">

            <div class="logo">

                <img
                    src="assets/images/logo_qa.png"
                    alt="QA Portal">

            </div>

            <div>

                <h2>QA Portal</h2>

                <p>Quality Assurance Digital Platform</p>

            </div>

        </div>

        <div class="portal-header-right">

            <span class="version">

                v2.1.0

            </span>

        </div>

    </header>

    <main class="portal-main">

        ${content}

    </main>

    <footer class="portal-footer">

        © 2026 PT PAL Indonesia | QA Digital Platform | Created by Quality Engineer (Allif C.)

    </footer>

</div>

`;

}