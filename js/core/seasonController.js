window.SeasonController = (function () {

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

    let currentSeason = DATA_SEASONS[0];

    function init() {
        const select = document.getElementById("selectSeason");
        DATA_SEASONS.forEach(season => {
            const option = document.createElement("option");
            option.value = season.id;
            option.textContent = season.name;
            select.appendChild(option);
        });
        select.value = currentSeason.id;
        applySeason();
    }

    function selectSeason(seasonId) {
        currentSeason = DATA_SEASONS.find(s => s.id === seasonId);
        applySeason();
    }

    function applySeason() {
        // 1. Show/hide character cards
        document.querySelectorAll(".pathsgrid__card").forEach(card => {
            const input = card.querySelector("input[type=checkbox]");
            if (currentSeason.characters.includes(input.name)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
                if (input.checked) {
                    input.checked = false;
                    PathsController.togglePath(input.name);
                }
            }
        });

        // 2. Update slider
        SliderController.updateSlider(currentSeason.episodes);

        // 3. Refresh markers
        MarkersController.clearMarkers();
        DATA_MARKERS.markers.forEach(marker => {
            if (currentSeason.markersRelevant(marker)) {
                MarkersController.addMarker(marker);
            }
        });

        // 4. Remove paths not in current season
        Object.keys(AppState.LIST_PATHS).forEach(characterName => {
            if (!currentSeason.characters.includes(characterName)) {
                AppState.LIST_PATHS[characterName].removeFrom(MapController.map);
                delete AppState.LIST_PATHS[characterName];
            }
        });
    }

    function getCurrentSeason() {
        return currentSeason;
    }

    return { init, selectSeason, getCurrentSeason };

})();
