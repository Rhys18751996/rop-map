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

            // Update slider
            SliderController.updateSlider(currentSeason.episodes);

            // Refresh map for new season
            PathsController.refreshTimelinePaths();
            MarkersController.clearMarkers();
            MarkersController.addMarkers();
        });
    }

    function getCurrentSeason() {
        return currentSeason;
    }

    return { initDropdown, getCurrentSeason };
})();
