import { createDocumentDashboard } from "../../document/documentDashboard.js";
import { getQualityPlanStatistics } from "../../services/statistics.js";
import { getCurrentProject } from "../../projectManager.js";

export function renderQualityPlan(){

    return createDocumentDashboard({

        project:getCurrentProject(),

        title:"Quality Plan",

        subtitle:"Quality Plan",

        statistics:getQualityPlanStatistics()

    });

}