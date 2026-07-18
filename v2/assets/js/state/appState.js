const state = {

    currentProject: null,

    currentModule: "summary",

    connected: false,

    loading: false,

    lastUpdate: null

};

export function getState() {
    return state;
}

export function setState(key, value) {
    state[key] = value;
}

export function getValue(key) {
    return state[key];
}