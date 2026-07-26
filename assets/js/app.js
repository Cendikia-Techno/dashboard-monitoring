import { initNetworkManager } from "./services/networkManager.js";
import { showPortal } from "./controllers/appController.js";

function initApp() {

    initNetworkManager();

    showPortal();

}

initApp();