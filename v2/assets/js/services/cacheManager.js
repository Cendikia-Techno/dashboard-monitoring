// ======================================================
// Dashboard QA CACHE MANAGER
// ======================================================

// ======================================================
// CACHE KEY
// ======================================================

function getCacheKey(projectName) {

    return `QA_DASHBOARD_CACHE_${projectName}`;

}

// ======================================================
// SAVE
// ======================================================

export function saveDashboardCache(projectName, data) {

    try {

        localStorage.setItem(

            getCacheKey(projectName),

            JSON.stringify({

                data,

                timestamp: Date.now()

            })

        );

        console.log(`💾 Cache Saved (${projectName})`);

    }

    catch (err) {

        console.error("Cache Save Error", err);

    }

}

// ======================================================
// LOAD
// ======================================================

export function loadDashboardCache(projectName) {

    try {

        const cache = localStorage.getItem(

            getCacheKey(projectName)

        );

        if (!cache) return null;

        return JSON.parse(cache);

    }

    catch (err) {

        console.error("Cache Read Error", err);

        return null;

    }

}

// ======================================================
// CLEAR
// ======================================================

export function clearDashboardCache(projectName) {

    localStorage.removeItem(

        getCacheKey(projectName)

    );

}