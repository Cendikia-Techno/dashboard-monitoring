import { MODULES } from "./config/modules.js";

import { renderSummary } from "../../modules/summary/summary.js";
import { renderITP } from "../../modules/itp/itp.js";
import { renderQualityPlan } from "../../modules/qualityplan/qualityplan.js";
import { renderInspeksi } from "../../modules/inspeksi/inspeksi.js";
import { renderLaunching } from "../../modules/launching/launching.js";
import { renderMaterial } from "../../modules/material/material.js";
import { renderTPTR } from "../../modules/tptr/tptr.js";
import { renderHatsat } from "../../modules/hatsat/hatsat.js";

const routes = {

    [MODULES.SUMMARY]: renderSummary,

    [MODULES.ITP]: renderITP,

    [MODULES.QUALITYPLAN]: renderQualityPlan,

    [MODULES.INSPEKSI]: renderInspeksi,

    [MODULES.LAUNCHING]: renderLaunching,

    [MODULES.MATERIAL]: renderMaterial,

    [MODULES.TPTR]: renderTPTR,

    [MODULES.HATSAT]: renderHatsat

};

export function loadModule(moduleName) {

    const container = document.getElementById("main-content");

    const render = routes[moduleName];

    if (!render) {

        container.innerHTML = `
            <div class="error-page">
                <h2>Module Not Found</h2>
                <p>Module "${moduleName}" belum tersedia.</p>
            </div>
        `;

        return;

    }

    container.innerHTML = render();

}