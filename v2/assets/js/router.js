import { renderSummary } from "../../modules/summary/summary.js";
import { renderITP } from "../../modules/itp/itp.js";
import { renderQualityPlan } from "../../modules/qualityplan/qualityplan.js";
import { renderInspeksi } from "../../modules/inspeksi/inspeksi.js";
import { renderLaunching } from "../../modules/launching/launching.js";
import { renderMaterial } from "../../modules/material/material.js";
import { renderTPTR } from "../../modules/tptr/tptr.js";
import { renderHatsat } from "../../modules/hatsat/hatsat.js";
// nanti import modul lain

const routes = {
    summary: renderSummary,
    inspeksi: renderInspeksi,
    hatsat: renderHatsat,
    launching: renderLaunching,
    material: renderMaterial,
    tptr: renderTPTR,
    qualityplan: renderQualityPlan,
    itp: renderITP
};

export function loadModule(moduleName) {

    const container = document.getElementById("main-content");

    if (routes[moduleName]) {

        container.innerHTML = routes[moduleName]();

    }

}