import { loadDashboardData } from "../services/api.js";
import { loadModule } from "../router.js";
import { getNetworkStatus } from "../services/networkManager.js";

let refreshTimer = null;
let countdownTimer = null;

const REFRESH_INTERVAL = 180000; // 3 menit

let remainingSeconds = REFRESH_INTERVAL / 1000;

let activeModuleGetter = null;

// ===============================
// Refresh Dashboard
// ===============================

export async function refreshDashboard() {

    console.log("🔄 Refresh Dashboard...");

    try {

        await loadDashboardData();

        updateLastUpdateUI();

        if (activeModuleGetter) {

            loadModule(activeModuleGetter());

        }

        resetCountdown();

    } catch (err) {

        console.error(err);

    }

}

export function initRefreshButton() {

    document.addEventListener("click", async (e) => {

        if (e.target.closest("#refreshNowBtn")) {

            await refreshDashboard();

        }

    });

}

// ===============================
// Start Refresh
// ===============================

export function startAutoRefresh(getModule) {

    stopAutoRefresh();

    activeModuleGetter = getModule;

    refreshTimer = setInterval(() => {

        if (!getNetworkStatus()) {

            return;

        }

        refreshDashboard();

    }, REFRESH_INTERVAL);

    startCountdown();

}

// ===============================
// Stop Refresh
// ===============================

export function stopAutoRefresh() {

    clearInterval(refreshTimer);

    clearInterval(countdownTimer);

}

// ===============================
// Countdown
// ===============================

function startCountdown() {

    remainingSeconds = REFRESH_INTERVAL / 1000;

    updateCountdownUI();

    countdownTimer = setInterval(() => {

        // Tidak menghitung jika offline
        if (!getNetworkStatus()) {

            const el = document.getElementById("refreshCountdown");

            if (el) {

                el.textContent = "Paused";

            }

            return;

        }

        if (remainingSeconds > 0) {

            remainingSeconds--;

        }

        updateCountdownUI();

    }, 1000);

}

function resetCountdown() {

    clearInterval(countdownTimer);

    startCountdown();

}

// ===============================
// UI Countdown
// ===============================

function updateCountdownUI() {

    const el =
        document.getElementById("refreshCountdown");

    if (!el) return;

    const min =
        Math.floor(remainingSeconds / 60);

    const sec =
        remainingSeconds % 60;

    el.textContent =
        `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;

}

function updateLastUpdateUI() {

    const el = document.getElementById("lastUpdateText");

    if (!el) return;

    el.textContent =

        new Date().toLocaleString("id-ID");

}