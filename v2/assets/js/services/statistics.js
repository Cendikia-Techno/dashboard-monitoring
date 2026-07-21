import { getDashboardData } from "./dataStore.js";

/* ========================================
   Helper
======================================== */
function averageField(items, field) {

    if (!items?.length) return 0;

    const total = items.reduce(

        (sum, item) => sum + Number(item[field] || 0),

        0

    );

    return Math.round(total / items.length);

}

function sumField(items, field) {

    if (!items?.length) return 0;

    return items.reduce(

        (sum, item) => sum + Number(item[field] || 0),

        0

    );

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

function calculateCategoryProgress(items) {

    const groups = {};

    items.forEach(item => {

        const category = item.kategori;

        if (!groups[category]) {

            groups[category] = {

                totalProgress: 0,

                count: 0

            };

        }

        groups[category].totalProgress += Number(item.progress || 0);

        groups[category].count++;

    });

    return Object.entries(groups).map(([category, data]) => ({

        category,

        progress: Math.round(data.totalProgress / data.count)

    }));

}

export function getInspectionStatistics() {

    const data = getDashboardData();

    const items = data?.summaryData || [];

    const totalItem = items.length;

    const totalTask = items.reduce(
        (sum, item) => sum + Number(item.totalTask || 0),
        0
    );

    const finishTask = items.reduce(
        (sum, item) => sum + Number(item.finish || 0),
        0
    );

    const remainingTask = items.reduce(
        (sum, item) => sum + Number(item.remaining || 0),
        0
    );

    const averageProgress = totalItem
        ? Math.round(
            items.reduce(
                (sum, item) => sum + Number(item.progress || 0),
                0
            ) / totalItem
        )
        : 0;

    const categoryProgress = calculateCategoryProgress(items);

    return {

        totalItem,

        totalTask,

        finishTask,

        remainingTask,

        averageProgress,

        categoryProgress,

        rows: items

    };

}