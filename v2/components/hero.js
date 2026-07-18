export function createHero(config){

    switch(config.type){

        case "summary":

            return createSummaryHero(config);

        case "itp":

            return createITPHero(config);

        case "material":

            return createMaterialHero(config);

        default:

            return "";

    }

}