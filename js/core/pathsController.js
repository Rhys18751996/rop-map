// rop-map/js/core/pathsController.js
window.PathsController = (function () {

    function togglePath(characterName) {
        const paths = AppState.LIST_PATHS;
        const currentSeason = SeasonController.getCurrentSeason();

        if (!paths[characterName]) {
            const layer = L.layerGroup(
                getPolylinesFromName(characterName, currentSeason.id),
                { snakingPause: AppState.PATH_SPEED_ANIMATION }
            ).addTo(MapController.map);

            layer.snakeIn(); // animate first add
            paths[characterName] = layer;
        } else {
            paths[characterName].removeFrom(MapController.map);
            delete paths[characterName];
        }

        MarkersController.clearMarkers();
        MarkersController.addMarkers();
    }

    function refreshTimelinePaths() {
        const currentSeason = SeasonController.getCurrentSeason();

        Object.keys(AppState.LIST_PATHS).forEach(characterName => {
            AppState.LIST_PATHS[characterName].removeFrom(MapController.map);
            AppState.LIST_PATHS[characterName] = L.layerGroup(
                getPolylinesFromName(characterName, currentSeason.id)
            ).addTo(MapController.map);
        });

        MarkersController.clearMarkers();
        MarkersController.addMarkers();
    }

    function getPolylinesFromName(characterName, seasonId) {
        const filteredPaths = DATA_PATHS.paths.filter(p =>
            p.character === characterName &&
            (p.season === seasonId || p.season >= 100) // movies remain included
        );

        const color = DATA_PATHS.characters.find(c => c.name === characterName).color;

        return filteredPaths.map(p =>
            L.polyline(p.coordinates, {
                color,
                weight: AppState.PATH_WEIGHT,
                dashArray: p.isConfirmed ? '0' : '2 6',
                opacity: p.isConfirmed ? 1 : 0.7
            })
        );
    }

    return { togglePath, refreshTimelinePaths };

})();

// Handles timeline range changes (e.g., from a slider control)
// Updates the current visible episode range in the AppState
// and refreshes the map paths to only show the paths in that range
window.timelineChange = (range) => {
    AppState.CURRENT_RANGE = range;
    PathsController.refreshTimelinePaths();
};
