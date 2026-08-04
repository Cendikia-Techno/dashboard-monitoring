import { getDashboardData } from "./dataStore.js";

/* ======================================================
   Helper
====================================================== */

function averageByField(items, field) {

    if (!items?.length) return 0;

    const total = items.reduce(
        (sum, item) => sum + Number(item[field] || 0),
        0
    );

    return Math.round(total / items.length);

}

function sumByField(items, field) {

    if (!items?.length) return 0;

    return items.reduce(
        (sum, item) => sum + Number(item[field] || 0),
        0
    );

}



function percentage(finish, total) {

    if (!total) return 0;

    return Math.round((finish / total) * 100);

}

/* helper category */
function groupAverageByCategory(items) {

    const groups = {};

    items.forEach(item => {

        const key = item.kategori;

        if (!groups[key]) {

            groups[key] = [];

        }

        groups[key].push(item);

    });

    return Object.entries(groups).map(([title, rows]) => ({

        title,

        value: averageByField(rows, "progress")

    }));

}


function countByStatus(items, field, status) {

    if (!items?.length) return 0;

    return items.filter(

        item => item[field] === status

    ).length;

}

function safePercent(part, total) {

    if (total === 0) return 0;

    return Math.round((part / total) * 100);

}

function getLowestProgress(
    items,
    {
        title,
        subtitle,
        value,
        level,
        filter = () => true,
        limit = 5
    }
) {

    return items

        .filter(filter)

        .sort((a, b) => {

            if (!value) return 0;

            return value(a) - value(b);

        })

        .slice(0, limit)

        .map(item => ({

            title: title(item),

            subtitle: subtitle ? subtitle(item) : undefined,

            value: value ? Math.round(value(item)) : undefined,

            level: level ? level(item) : undefined

        }));

}

function toNumber(value) {

    const num = Number(value);

    return Number.isFinite(num) ? num : 0;

}

function toPercent(value) {

    return Math.round(toNumber(value));

}

function safeDivide(a, b) {

    return b > 0 ? a / b : 0;

}

function calculateTPTRProgress(item) {

    const penyusunan = toNumber(item.penyusunanPal);
    const reviewPal = toNumber(item.reviewPal);
    const reviewClass = toNumber(item.reviewClass);
    const reviewSatgas = toNumber(item.reviewSatgas);
    const approved = toNumber(item.approvedDansatgas);

    return Math.round(

        (

            penyusunan +
            reviewPal +
            reviewClass +
            reviewSatgas +
            approved

        ) / 5 * 100

    );

}

function createProgressStatistics({

    items,

    total,

    finish,

    remaining,

    progress,

    category,

    progressSelector,

    statusSelector,

    critical

}) {

    return {

        total,

        finish,

        remaining,

        progress,

        categories: calculateCategoryProgress(

            items,

            category,

            progressSelector

        ),

        statusDistribution: calculateStatusDistribution(

            items,

            statusSelector

        ),

        critical,

        rows: items

    };

}

/* ========================================
   Module Statistics
======================================== */
function calculateITP(items) {

    const total = items.length;

    const approved = countByStatus(

        items,

        "status",

        "Approved"

    );

    return {

        total,

        approved,

        review: total - approved,

        progress: averageField(

            items,

            "progressDokumen"

        )

    };

}

function calculateQualityPlan(items) {

    const total = items.length;

    const approved = countByStatus(

        items,

        "status",

        "Approved"

    );

    return {

        total,

        approved,

        review: total - approved,

        progress: averageField(

            items,

            "progressDokumen"

        )

    };
}

function calculateInspection(items) {

    const totalTask = sumField(

        items,

        "totalTask"

    );

    const finish = sumField(

        items,

        "finish"

    );

    const remaining = sumField(

        items,

        "remaining"

    );

    return {

        totalTask,

        finish,

        remaining,

        progress: safePercent(

            finish,

            totalTask

        )

    };

}
/* ======================================================
   summary Dashboard
====================================================== */

export function getSummaryStatistics() {

    const data = getDashboardData();

    if (!data) return null;

    const itp = calculateITP(data.itpData);

    const qualityPlan = calculateQualityPlan(data.qplanData);

    const inspection = calculateInspection(data.inspeksiData);

    return {

        itp,

        qualityPlan,

        inspection,

        overallProgress: Math.round(

            (

                itp.progress +

                qualityPlan.progress +

                inspection.progress

            ) / 3

        )

    };

}
/* ======================================================
   ITP Dashboard
====================================================== */

export function getITPStatistics() {

    const data = getDashboardData();
    console.log("DashboardData:", data);

    const items = data?.itpData || [];
    console.log("ITP Items :", items);

    const total = items.length;

    const approved = items.filter(
        item => item.status === "Approved"
    ).length;

    const review = items.filter(
        item => item.status === "Review"
    ).length;

    const draft = items.filter(
        item => item.status === "Draft"
    ).length;

    const progress = total
        ? Math.round(
            items.reduce(
                (sum, item) => sum + Number(item.progressDokumen || 0),
                0
            ) / total
        )
        : 0;

    const contentProgress = calculateContentProgress(items);

    return {

        total,

        approved,

        review,

        draft,

        progress,

        contentProgress,

        sections: items

    };

}
/* ======================================================
   Quality Plan Dashboard
====================================================== */

function calculateContentProgress(items) {

    const groups = {};

    items.forEach(item => {

        const key = item.contents;

        if (!groups[key]) {

            groups[key] = {

                total: 0,

                count: 0

            };

        }

        groups[key].total += Number(item.progressDokumen || 0);
        groups[key].count++;

    });

    return Object.entries(groups).map(([title, data]) => ({

        title,

        progress: Math.round(data.total / data.count)

    }));

}

export function getQualityPlanStatistics() {

    const data = getDashboardData();

    const items = data?.qplanData || [];

    const total = items.length;

    const approved = items.filter(
        item => item.status === "Approved"
    ).length;

    const review = items.filter(
        item => item.status === "Review"
    ).length;

    const draft = items.filter(
        item => item.status === "Draft"
    ).length;

    const progress = total
        ? Math.round(
            items.reduce(
                (sum, item) => sum + Number(item.progressDokumen || 0),
                0
            ) / total
        )
        : 0;

    const contentProgress = calculateContentProgress(items);

    return {

        total,
        approved,
        review,
        draft,
        progress,
        contentProgress,
        sections: items

    };

}
/* ======================================================
   Inspection Dashboard
====================================================== */

function calculateCategoryProgress(

    items,

    categorySelector,

    progressSelector = item => item.progress || 0

) {

    const groups = {};

    items.forEach(item => {

        const category = categorySelector(item);

        if (!groups[category]) {

            groups[category] = {

                total: 0,

                count: 0

            };

        }

        const progress = Number(progressSelector(item) || 0);

        groups[category].total += progress;

        groups[category].count++;

    });

    return Object.entries(groups).map(([title, data]) => ({

        title,

        value: Math.round(data.total / data.count)

    }));

}

// pie chart helper //
function calculateStatusDistribution(items, statusSelector) {

    const result = {};

    items.forEach(item => {

        let status = statusSelector(item);

        if (status === undefined || status === null) {

            status = "Unknown";

        }

        status = String(status).trim();

        if (!result[status]) {

            result[status] = 0;

        }

        result[status]++;

    });

    return Object.entries(result).map(([status, value]) => ({

        status,

        value

    }));

}

export function getInspectionStatistics() {

    const data = getDashboardData();

    const items = data?.summaryData || [];

    const total = items.reduce(
        (sum, item) => sum + Number(item.totalTask || 0),
        0
    );

    const finish = items.reduce(
        (sum, item) => sum + Number(item.finish || 0),
        0
    );

    const remaining = items.reduce(
        (sum, item) => sum + Number(item.remaining || 0),
        0
    );

    const progress = total
        ? Math.round((finish / total) * 100)
        : 0;

    const critical = getLowestProgress(items, {

        filter: item => item.remaining > 0,

        title: item => `${item.kategori} • ${item.item}`,

        value: item => item.progress

    });

    return createProgressStatistics({

        items,

        total,

        finish,

        remaining,

        progress,

        category: item => item.kategori,

        progressSelector: item => item.progress,

        statusSelector: item => item.status,

        critical

    });

}
/* ======================================================
   Material Dashboard
====================================================== */

export function getMaterialStatistics() {

    const data = getDashboardData();

    const items = data?.materialData || [];

    const total = items.length;

    const finish = items.filter(
        item => item.status === "Arrived"
    ).length;

    const remaining = total - finish;

    const progress = total
        ? Math.round((finish / total) * 100)
        : 0;

    const critical = getLowestProgress(items, {

        filter: item => {

            const arrival = new Date(item.arrivalDate);

            const used = new Date(item.usedDate);

            return arrival > used;

        },

        title: item => item.material,

        subtitle: item => item.kategori,

        level: () => "high"

    });

    return createProgressStatistics({
        items,

        total,

        finish,

        remaining,

        progress,

        category: item => item.kategori,

        progressSelector: item =>

            item.status === "Arrived"

                ? 100

                : 0,

        statusSelector: item => item.status,

        critical

    });

}

/* ======================================================
   TPTR  Dashboard
====================================================== */
export function getTPTRStatistics() {

    const data = getDashboardData();

    const items = data?.tptrData || [];

    const total = items.length;

    const finish = items.filter(

        item => Number(item.approvedDansatgas) === 1

    ).length;

    const remaining = total - finish;

    const progress = total

        ? Math.round(

            items.reduce(

                (sum, item) => sum + calculateTPTRProgress(item),

                0

            ) / total

        )

        : 0;

    const critical = getLowestProgress(items, {

        filter: item => item.remark?.trim() !== "",

        title: item => item.namaDokumen,

        subtitle: item => item.remark,

        level: () => "high",

        value: item => calculateTPTRProgress(item)

    });

    const rows = items.map(item => ({

        ...item,

        progress: calculateTPTRProgress(item)

    }));

    return createProgressStatistics({

        items: rows,

        total,

        finish,

        remaining,

        progress,

        category: item => item.kategori.trim(),

        progressSelector: item => item.progress,

        statusSelector: item => item.remark,

        critical

    });

}
/* ======================================================
   Launching  Dashboard
====================================================== */
export function getLaunchingStatistics() {

    const data = getDashboardData();

    const items = data?.launchingData || [];

    const total = items.length;

    const finish = items.filter(
        item => item.statusInspeksi === "Done"
    ).length;

    const remaining = total - finish;

    const progress = total
        ? Math.round((finish / total) * 100)
        : 0;

    const critical = getLowestProgress(items, {

        filter: item =>
            item.urgensi === "Prioritas" &&
            item.statusInspeksi !== "Done",

        title: item => item.sistem,

        subtitle: item => item.pic,

        level: () => "high"

    });

    return createProgressStatistics({

        items,

        total,

        finish,

        remaining,

        progress,

        category: item => item.kategori,

        progressSelector: item => {

            switch (item.statusInspeksi) {

                case "Done":
                    return 100;

                case "While in process":
                    return 50;

                default:
                    return 0;

            }

        },

        statusSelector: item => item.statusInspeksi,

        critical

    });

}

/* ======================================================
   HATSAT Dashboard
====================================================== */
export function getHATSATStatistics() {

    const data = getDashboardData();

    const items = data?.hatsatData || [];

    const total = items.length;

    const finish = items.filter(
        item => item.statusFungsi === "Close"
    ).length;

    const remaining = total - finish;

    const progress = total
        ? Math.round((finish / total) * 100)
        : 0;

    const rows = items.map(item => ({

        ...item,

        progress:
            item.statusFungsi === "Close"
                ? 100
                : 0

    }));

    const critical = getLowestProgress(rows, {

        filter: item => item.statusFungsi !== "Close",

        title: item => item.sistem,

        subtitle: item => item.inspeksi,

        value: item => item.progress,

        level: () => "high"

    });

    return createProgressStatistics({

        items: rows,

        total,

        finish,

        remaining,

        progress,

        category: item => item.kategori,

        progressSelector: item => item.progress,

        statusSelector: item => item.statusFungsi,

        critical

    });

}
/* ======================================================
   Executive Dashboard
====================================================== */

export function getOverallStatistics() {

    // Module yang sudah live
    const itp = getITPStatistics();

    const qualityPlan = getQualityPlanStatistics();

    const inspection = getInspectionStatistics();

    const launching = getLaunchingStatistics();

    const material = getMaterialStatistics();

    const tptr = getTPTRStatistics();

    const hatsat = getHATSATStatistics();

    // Progress tiap module (untuk Progress List)
    const progress = [

        {
            title: "ITP",
            value: itp.progress
        },

        {
            title: "Quality Plan",
            value: qualityPlan.progress
        },

        {
            title: "Inspection",
            value: inspection.progress
        },

        {
            title: "Material",
            value: material.progress
        },

        {
            title: "Launching",
            value: launching.progress
        },

        {
            title: "TPTR",
            value: tptr.progress
        },

        {
            title: "HAT/SAT",
            value: hatsat.progress
        }

    ];

    // Progress tiap module (untuk KPI Card)
    const progressValue = {

        itp: itp.progress,

        qualityPlan: qualityPlan.progress,

        inspection: inspection.progress,

        material: material.progress,

        launching: launching.progress,

        tptr: tptr.progress,

        hatsat: hatsat.progress

    };

    // KPI jumlah data
    const kpis = {

        itp: itp.total,

        qualityPlan: qualityPlan.total,

        inspection: inspection.total,

        material: material.total,

        launching: launching.total,

        tptr: tptr.total,

        hatsat: hatsat.total

    };

    // Overall Progress
    const activeModules = progress.filter(item => item.value > 0);

    const overallProgress = activeModules.length
        ? Math.round(
            activeModules.reduce((sum, item) => sum + item.value, 0)
            / activeModules.length
        )
        : 0;
    // ============================================
    // Overall Status Distribution
    // ============================================

    const statusMap = {};

    [
        ...inspection.statusDistribution,
        ...material.statusDistribution,
        ...launching.statusDistribution,
        ...tptr.statusDistribution,
        ...hatsat.statusDistribution
    ].forEach(item => {

        if (!statusMap[item.status]) {

            statusMap[item.status] = 0;

        }

        statusMap[item.status] += item.value;

    });

    const statusDistribution = Object.entries(statusMap).map(

        ([status, value]) => ({

            status,

            value

        })

    );

    return {

        overallProgress,

        kpis,

        progressValue,

        progress,

        statusDistribution

    };

}

/* ======================================================
   Inspection Attention
====================================================== */

export function getInspectionAttention() {

    const data = getDashboardData();

    const items = data?.summaryData || [];

    if (!items.length) return null;

    const outstanding = items
        .filter(item => Number(item.remaining) > 0)
        .sort((a, b) => Number(b.remaining) - Number(a.remaining));

    if (!outstanding.length) return null;

    const top = outstanding[0];

    // Severity berdasarkan persentase outstanding
    const outstandingPercent =
        (Number(top.remaining) / Number(top.totalTask)) * 100;

    let priority = "low";

    if (outstandingPercent >= 60) {

        priority = "high";

    } else if (outstandingPercent >= 30) {

        priority = "medium";

    }

    return {

        module: "Inspection",

        title: top.item,

        subtitle: top.kategori,

        outstanding: top.remaining,

        total: top.totalTask,

        progress: Math.round(top.progress),

        priority

    };

}

/* ======================================================
   TPTR Attention
====================================================== */

export function getTPTRAttention() {

    const data = getDashboardData();

    const items = data?.tptrData || [];

    if (!items.length) return null;

    const counter = {};

    items.forEach(item => {

        const remark = (item.remark || "NO STATUS").trim();

        counter[remark] = (counter[remark] || 0) + 1;

    });

    const sorted = Object.entries(counter)

        .sort((a, b) => b[1] - a[1]);

    const [remark, total] = sorted[0];

    let priority = "low";

    if (

        remark.includes("CLASS") ||

        remark.includes("SATGAS")

    ) {

        priority = "high";

    }

    return {

        module: "TPTR",

        subtitle: "Documentation",

        title: remark,

        outstanding: total,

        total: items.length,

        priority

    };

}

export function getMaterialAttention() {

    const data = getDashboardData();

    const items = data?.materialData || [];

    if (!items.length) return null;

    const critical = items
        .map(item => {

            const used = new Date(item.usedDate);

            const arrival = new Date(item.arrivalDate);

            const delay =
                Math.ceil(
                    (arrival - used) /
                    (1000 * 60 * 60 * 24)
                );

            return {

                ...item,

                delay

            };

        })

        .filter(item => item.delay > 0)

        .sort((a, b) => b.delay - a.delay);

    if (!critical.length) return null;

    const top = critical[0];

    return {

        module: "Material",

        subtitle: top.kategori,

        title: top.material,

        outstanding: top.delay,

        total: "Days",

        priority: "high"

    };

}

/* ======================================================
   Launching Attention
====================================================== */

export function getLaunchingAttention() {

    const data = getDashboardData();

    const items = data?.launchingData || [];

    if (!items.length) return null;

    // Requirement yang belum selesai
    const outstanding = items.filter(item =>
        item.statusInspeksi !== "Done"
    );

    if (!outstanding.length) return null;

    // Prioritaskan item dengan urgensi Prioritas
    const priorityItems = outstanding.filter(item =>
        item.urgensi === "Prioritas"
    );

    const top = priorityItems.length
        ? priorityItems[0]
        : outstanding[0];

    return {

        module: "Launching",

        subtitle: top.sistem,

        title: top.inspeksi,

        outstanding: outstanding.length,

        total: items.length,

        priority: "high"

    };

}

/* ======================================================
   HAT / SAT Attention
====================================================== */

export function getHATSATAttention() {

    const data = getDashboardData();

    const items = data?.hatsatData || [];

    if (!items.length) return null;

    // Semua function test yang belum Close
    const outstanding = items.filter(item =>
        item.statusFungsi !== "Close"
    );

    if (!outstanding.length) return null;

    // Ambil contoh system pertama
    const top = outstanding[0];

    return {

        module: "HAT / SAT",

        subtitle: top.kategori,

        title: top.sistem,

        outstanding: outstanding.length,

        total: items.length,

        priority: "high"

    };

}
/* ======================================================
   Executive recent update
====================================================== */

export function getRecentUpdates() {

    const status = getDashboardData()?.systemStatus;

    if (!status) return [];

    const now = Date.now();

    const modules = {

        summary: {
            title: "Summary",
            color: "green",
            icon: "fa-chart-line"
        },

        itp: {
            title: "ITP",
            color: "blue",
            icon: "fa-clipboard-check"
        },

        qualityPlan: {
            title: "Quality Plan",
            color: "purple",
            icon: "fa-file-lines"
        },

        material: {
            title: "Material",
            color: "orange",
            icon: "fa-box"
        },

        launching: {
            title: "Launching",
            color: "cyan",
            icon: "fa-ship"
        },

        tptr: {
            title: "TPTR",
            color: "red",
            icon: "fa-file-signature"
        },

        hatsat: {
            title: "HAT / SAT",
            color: "teal",
            icon: "fa-gears"
        }

    };

    return Object.entries(status)

        .map(([key, value]) => {

            const config = modules[key] || {

                title: key,

                color: "gray",

                icon: "fa-circle"

            };

            const date = new Date(value.lastUpdate);

            return {

                module: config.title,

                color: config.color,

                icon: config.icon,

                revision: value.revision,

                lastUpdate: date,

                dateString: date.toLocaleString("id-ID"),

                timeAgo: formatTimeAgo(date),

                isNew:

                    (now - date.getTime()) <

                    24 * 60 * 60 * 1000

            };

        })

        .sort((a, b) =>

            b.lastUpdate - a.lastUpdate

        )

        .slice(0, 5);

}

function formatTimeAgo(date) {

    const diff =

        Math.floor(

            (Date.now() - date.getTime()) / 1000

        );

    if (diff < 60)

        return "Just now";

    if (diff < 3600)

        return Math.floor(diff / 60) + " min ago";

    if (diff < 86400)

        return Math.floor(diff / 3600) + " hrs ago";

    return Math.floor(diff / 86400) + " days ago";

}

/* ======================================================
   Executive Need Attention
====================================================== */

export function getNeedAttention() {

    return [

        getInspectionAttention(),
        getTPTRAttention(),
        getMaterialAttention(),
        getLaunchingAttention(),
        getHATSATAttention()

    ].filter(Boolean);

}

