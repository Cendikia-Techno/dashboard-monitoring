export function formatNumber(value){

    return new Intl.NumberFormat("id-ID").format(value);

}

export function formatPercent(value){

    return `${value.toFixed(2)} %`;

}

export function formatDate(date){

    return new Date(date).toLocaleDateString("id-ID");

}

export function formatDateTime(date){

    return new Date(date).toLocaleString("id-ID");

}