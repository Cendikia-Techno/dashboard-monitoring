let dashboardData = null;

export function setDashboardData(data) {
    dashboardData = data;
}

export function getDashboardData() {
    return dashboardData;
}

export function clearDashboardData() {
    dashboardData = null;
}

export function hasDashboardData() {
    return dashboardData !== null;
}