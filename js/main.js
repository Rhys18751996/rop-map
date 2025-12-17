// attach handlers globally so HTML inline handlers still work
window.setPath = (element) => PathsController.togglePath(element.name);
window.hideshow = UIController.hideshow;
window.interactionLabel = UIController.interactionLabel;

window.timelineChange = (range) => {
    AppState.CURRENT_RANGE = range;
    PathsController.refreshTimelinePaths();
};
