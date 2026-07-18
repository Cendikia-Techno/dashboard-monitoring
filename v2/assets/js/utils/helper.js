export function sleep(ms){

    return new Promise(resolve=>setTimeout(resolve,ms));

}

export function generateID(){

    return crypto.randomUUID();

}