import { createDocumentDashboard } from "../../document/documentDashboard.js";
import { getITPStatistics } from "../../services/statistics.js";
import { getCurrentProject } from "../../projectManager.js";

export function renderITP(){

    return createDocumentDashboard({

        project:getCurrentProject(),

        title:"Inspection Test Plan",

        subtitle:"Inspection Test Plan",

        statistics:getITPStatistics()

    });

}