// attach handlers globally so HTML inline handlers still work
window.setPath = (element) => PathsController.togglePath(element.name);
window.hideshow = UIController.hideshow;
window.interactionLabel = UIController.interactionLabel;

window.seasonChange = (seasonId) => {
    SeasonController.selectSeason(Number(seasonId));
};

window.timelineChange = (range) => {
    AppState.CURRENT_RANGE = range;
    PathsController.refreshTimelinePaths();
};




// Initialize SeasonController after DOM ready
document.addEventListener('DOMContentLoaded', () => {
    SeasonController.initDropdown();
});