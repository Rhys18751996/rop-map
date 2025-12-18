const DATA_SEASONS = [
    {
        id: 1,
        name: "Rings of Power - Season 1",
        episodes: 8,
        characters: ["Arondir","Elendil","Elrond","Galadriel","Halbrand","Nori"],
        markersRelevant: marker => marker.episodes.some(e => e.season === 1)
    },
    {
        id: 2,
        name: "Rings of Power - Season 2",
        episodes: 8,
        characters: ["Galadriel","Arondir"], // add more for S2
        markersRelevant: marker => marker.episodes.some(e => e.season === 2)
    },
    {
        id: 100,
        name: "The Lord of the Rings (Movies)",
        episodes: 1,
        characters: ["Frodo and Sam","Bilbo and Thorin"],
        markersRelevant: marker => marker.episodes.some(e => e.season === 100 || e.season === 101)
    }
];

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
