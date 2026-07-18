import { createHeroHeader } from "../../components/heroHeader.js";
import { createKPICard } from "../../components/kpiCard.js";

export function renderSummary() {

    return `

    ${createHeroHeader({

        project: "Landing Dock Project #1",

        progress: 72,

        lastUpdate: "17 Jul 2026",

        kpis: [

            {
                label: "📋 ITP",
                value: "245"
            },

            {
                label: "📄 QP",
                value: "35"
            },

            {
                label: "🔍 Inspection",
                value: "1,254"
            },

            {
                label: "📦 Material",
                value: "92%"
            }

        ]

    })}

    <div class="kpi-grid">

        ${createKPICard({
        title: "Inspection Test Plan",
        value: "245",
        icon: "fa-clipboard-check",
        color: "var(--primary)",
        subtitle: "Approved Document",
        trend: "+12"
    })}

        ${createKPICard({
        title: "Quality Plan",
        value: "35",
        icon: "fa-file-lines",
        color: "var(--success)",
        subtitle: "Ready",
        trend: "+4"
    })}

        ${createKPICard({
        title: "Summary Inspection",
        value: "1,254",
        icon: "fa-magnifying-glass",
        color: "var(--secondary)",
        subtitle: "Inspection",
        trend: "+30"
    })}

        ${createKPICard({
        title: "Material Ready",
        value: "92%",
        icon: "fa-boxes-stacked",
        color: "var(--warning)",
        subtitle: "Warehouse",
        trend: "+5%"
    })}

    </div>

    `;

}