import { getCurrentProject } from "../projectManager.js";
import { getCurrentModule, loadModule } from "../router.js";

import { setDashboardData } from "./dataStore.js";
import { saveDashboardCache, loadDashboardCache } from "./cacheManager.js";
import { getNetworkStatus } from "./networkManager.js";

export async function loadDashboardData(forceRefresh = false) {

    const project = getCurrentProject();

    if (!project.api) {

        console.warn("⚠ API belum dikonfigurasi.");

        return null;

    }

    // ============================================
    // STEP 1 : LOAD CACHE
    // ============================================

    if (!forceRefresh) {

        const cache = loadDashboardCache(project.id);

        if (cache) {

            console.log("📦 Cache Loaded");

            setDashboardData(cache.data);

            // Dashboard langsung memakai cache
            loadModule(getCurrentModule());

        }

    }

    // ============================================
    // STEP 2 : OFFLINE MODE
    // ============================================

    if (!getNetworkStatus()) {

        console.log("🔴 Offline Mode");

        return null;

    }

    // ============================================
    // STEP 3 : FETCH API
    // ============================================

    try {

        const response = await fetch(project.api);

        if (!response.ok) {

            throw new Error(`HTTP ${response.status}`);

        }

        const data = await response.json();

        console.log("🌐 API Response", data);

        // Update Store
        setDashboardData(data);

        // Update Cache
        saveDashboardCache(

            project.id,

            data

        );

        console.log("💾 Cache Updated");

        // Refresh Dashboard
        loadModule(getCurrentModule());

        console.log("✅ Dashboard Updated");

        return data;

    }

    catch (err) {

        console.error("❌ Failed Load API", err);

        // ============================================
        // FALLBACK CACHE
        // ============================================

        const cache = loadDashboardCache(project.id);

        if (cache) {

            console.log("📦 Using Cached Dashboard");

            setDashboardData(cache.data);

            loadModule(getCurrentModule());

            return cache.data;

        }

        return null;

    }

}