let dashboardData = {};

export function setDashboardData(data) {
    dashboardData = data;
}

export function getDashboardData() {
    return dashboardData;
}

export function getModuleData(moduleName) {
    return dashboardData[moduleName] || [];
}

export function clearDashboardData() {
    dashboardData = {};
}
