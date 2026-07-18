import { fetchData } from "./api.js";

export async function getSummaryData() {

    return await fetchData("?module=summary");

}