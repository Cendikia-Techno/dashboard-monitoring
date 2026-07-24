import { getCurrentProject } from "../projectManager.js";
import { setDashboardData } from "./dataStore.js";
import { saveDashboardCache, loadDashboardCache } from "./cacheManager.js";
import { getNetworkStatus } from "./networkManager.js";

export async function loadDashboardData() {

    const project = getCurrentProject();

    if (!project.api) {

        console.warn("API belum dikonfigurasi.");

        return null;

    }

    // ============================================
    // OFFLINE MODE
    // ============================================

    if (!getNetworkStatus()) {

        console.log("📦 Loading Dashboard Cache...");

        const cache = loadDashboardCache(

            project.name

        );

        if (cache) {

            console.log("✅ Cache Loaded");

            setDashboardData(cache.data);

            return cache.data;

        }

        console.warn("❌ Cache tidak ditemukan");

        return null;

    }

    // ============================================
    // ONLINE MODE
    // ============================================

    try {

        const response = await fetch(project.api);

        const data = await response.json();

        console.log("API Response:", data);

        setDashboardData(data);

        // simpan cache terbaru
        saveDashboardCache(

            project.name,

            data

        );

        console.log("💾 Cache Updated");

        console.log("Dashboard data loaded");

        return data;

    }

    catch (err) {

        console.error("Failed load data", err);

        // ========================================
        // FALLBACK KE CACHE
        // ========================================

        const cache = loadDashboardCache(

            project.name

        );

        if (cache) {

            console.log("📦 Using Cached Dashboard");

            setDashboardData(cache.data);

            return cache.data;

        }

        return null;

    }

}