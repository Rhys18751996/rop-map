// rop-map/js/core/seasonController.js
window.SeasonController = (function () {
    const seasonSelect = document.getElementById('seasonSelect');

    // Default season (first in DATA_SEASONS)
    let currentSeason = DATA_SEASONS[0];

    // Populate dropdown and handle changes
    function initDropdown() {
        DATA_SEASONS.forEach((season, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = season.name; // e.g., "Season 1" or "The Hobbit"
            seasonSelect.appendChild(option);
        });

        seasonSelect.value = 0; // select first season by default

        seasonSelect.addEventListener('change', () => {
            const selectedIndex = Number(seasonSelect.value);
            currentSeason = DATA_SEASONS[selectedIndex];

            PathsController.clearPaths();
            MarkersController.clearMarkers();
            
            // Clear state
            AppState.LIST_PATHS = {};

            // Update timeline / season-dependent systems
            SliderController.updateSlider(currentSeason.episodes);

            PathsController.addPaths();
            MarkersController.addMarkers();

            // need to set all the character checkbox icons to unchecked
            CharacterCheckBoxController.resetCharacterSelection();
        });
    }

    function getCurrentSeason() {
        return currentSeason;
    }

    return { initDropdown, getCurrentSeason };
})();
