import { renderWelcome } from "../modules/welcome/welcome.js";
import { renderSummary } from "../modules/summary/summary.js";
import { renderInspection } from "../modules/inspeksi/inspeksi.js";
import { renderQualityPlan } from "../modules/qualityplan/qualityplan.js";
import { renderITP } from "../modules/itp/itp.js";
import { renderMaterial } from "../modules/material/material.js";
import { renderLaunching } from "../modules/launching/launching.js";
import { renderTPTR } from "../modules/tptr/tptr.js";
import { renderHATSAT } from "../modules/hatsat/hatsat.js";

export const DASHBOARD_MODULES = [

    {
        id: "welcome",
        title: "Welcome",
        icon: "fa-house",
        menu: false,
        render: renderWelcome
    },

    {
        id: "summary",
        title: "Executive Summary",
        subtitle: "Overall Quality Performance Dashboard",
        icon: "fa-chart-line",
        menu: true,
        render: renderSummary
    },

    {
        id: "itp",
        title: "Inspection Test Plan",
        subtitle: "Inspection Test Plan Monitoring",
        icon: "fa-list-check",
        menu: true,
        render: renderITP
    },

       {
        id: "qualityplan",
        title: "Quality Plan",
        subtitle: "Quality Plan Monitoring",
        icon: "fa-file-lines",
        menu: true,
        render: renderQualityPlan
    },

    {
        id: "inspection",
        title: "Inspection",
        subtitle: "Inspection Progress Dashboard",
        icon: "fa-magnifying-glass",
        menu: true,
        render: renderInspection
    },

    {
        id: "material",
        title: "Material",
        subtitle: "Material Progress Dashboard",
        icon: "fa-box",
        menu: true,
        render: renderMaterial
    },

    {
        id: "launching",
        title: "Launching",
        subtitle: "Launching Progress Dashboard",
        icon: "fa-ship",
        menu: true,
        render: renderLaunching
    },

    {
        id: "tptr",
        title: "TPTR",
        subtitle: "TPTR Progress Dashboard",
        icon: "fa-file-signature",
        menu: true,
        render: renderTPTR
    },

    {
        id: "hatsat",
        title: "HAT / SAT",
        subtitle: "HAT / SAT Progress Dashboard",
        icon: "fa-gears",
        menu: true,
        render: renderHATSAT
    }

];
