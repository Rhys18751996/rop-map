// ==============================
// Global Handlers for Inline HTML
// ==============================

// These handlers are attached to the global `window` object so that
// any inline HTML event attributes (e.g., onclick="setPath(this)")
// can still call these functions directly from the DOM.

// Toggles a character's path on the map when the corresponding button or element is clicked
window.setPath = (element) => PathsController.togglePath(element.name);

// Show or hide UI panels or elements
window.hideshow = UIController.hideshow;

// Display contextual labels or tooltips for interactions
window.interactionLabel = UIController.interactionLabel;

// Handles season changes from the dropdown select element
// Converts the selected value to a number and passes it to the SeasonController
window.seasonChange = (seasonId) => {
    SeasonController.selectSeason(Number(seasonId));
};