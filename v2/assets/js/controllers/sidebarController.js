import { loadModule } from "../router.js";

export function initSidebar() {

    const app = document.querySelector(".app");

    const toggle = document.getElementById("toggleSidebar");

    toggle.addEventListener("click", () => {

        app.classList.toggle("collapse");

    });

    document.addEventListener("click", (e) => {

        const menu = e.target.closest("[data-module]");

        if (!menu) return;

        document.querySelectorAll(".menu li").forEach(item => {

            item.classList.remove("active");

        });

        menu.classList.add("active");

        loadModule(menu.dataset.module);

    });

}