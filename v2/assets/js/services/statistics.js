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

