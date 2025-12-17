// Shared global state
window.AppState = {
    LIST_PATHS: {},
    LIST_MARKERS: [],
    CURRENT_RANGE: [0, 8],
    PATH_SPEED_ANIMATION: 400,
    PATH_WEIGHT: 4
};


// Now all modules access via 
/*
const { LIST_PATHS, LIST_MARKERS } = AppState;
*/