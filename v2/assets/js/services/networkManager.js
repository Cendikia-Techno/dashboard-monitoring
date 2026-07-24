// ======================================================
// NETWORK STATUS
// ======================================================

let isOnline = navigator.onLine;

export function getNetworkStatus() {
    return isOnline;
}

function updateStatus(status) {

    isOnline = status;

    console.log(
        status
            ? "🟢 Internet Connected"
            : "🔴 Internet Disconnected"
    );

    updateNetworkUI();

}

function updateNetworkUI() {

    const el = document.getElementById("networkStatus");

    if (!el) return;

    if (isOnline) {

        el.textContent = "🟢 Connected";

        el.className = "status-api online";

    } else {

        el.textContent = "🔴 Offline";

        el.className = "status-api offline";

    }

}

export function initNetworkManager() {

    window.addEventListener("online", () => {

        updateStatus(true);

    });

    window.addEventListener("offline", () => {

        updateStatus(false);

    });

    updateNetworkUI();

}