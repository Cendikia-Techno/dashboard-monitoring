export function createDashboardShell() {

    return `

<div class="app">

    <!-- HEADER -->
    <header class="header">

        <div class="header-left">

            <button
                id="toggleSidebar"
                class="toggle-btn">

                <i class="fa-solid fa-bars"></i>

            </button>

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

        <div class="header-right">

            <div class="status-live">

                <span id="networkStatus">

                    🟢 Connected

                </span>

            </div>

            <div class="version">

                v2.1.0

            </div>

        </div>

    </header>

    <!-- SIDEBAR -->
    <aside
        class="sidebar">

        <div id="sidebarContainer"></div>

    </aside>

    <!-- MAIN -->
    <main class="main">

        <div id="toolbarContainer"></div>

        <div
            id="main-content"
            class="content">

        </div>

    </main>

    <!-- FOOTER -->
    <footer class="footer">

        © 2026 PT PAL Indonesia | QA Digital Platform

    </footer>

</div>

`;

}