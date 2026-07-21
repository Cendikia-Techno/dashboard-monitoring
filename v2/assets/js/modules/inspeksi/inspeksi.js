import { createProgressDashboard } from "../../progress/progressDashboard.js";
import { getInspectionStatistics } from "../../services/statistics.js";
import { getCurrentProject } from "../../projectManager.js";

export function renderInspection(){

    return createProgressDashboard({

        project:getCurrentProject(),

        title:"Inspection",

        subtitle:"Inspection Progress",

        stats:getInspectionStatistics()

    });

}