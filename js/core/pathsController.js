window.PathsController = (function () {

    function togglePath(characterName) {
        const paths = AppState.LIST_PATHS;

        // ADD (animate)
        if (!paths[characterName]) {
            const layer = L.layerGroup(
                getPolylinesFromName(characterName),
                { snakingPause: AppState.PATH_SPEED_ANIMATION }
            ).addTo(MapController.map);

            layer.snakeIn(); // Animate only on first add
            paths[characterName] = layer;

        // REMOVE
        } else {
            paths[characterName].removeFrom(MapController.map);
            delete paths[characterName];
        }

        MarkersController.clearMarkers();
        MarkersController.addMarkers();
    }

    // INSTANT refresh — NO animation
    function refreshTimelinePaths() {
        const season = SeasonController.getCurrentSeason();

        Object.keys(AppState.LIST_PATHS).forEach(characterName => {
            AppState.LIST_PATHS[characterName].removeFrom(MapController.map);
            AppState.LIST_PATHS[characterName] =
                L.layerGroup(getPolylinesFromName(characterName, season))
                    .addTo(MapController.map);
        });

        MarkersController.clearMarkers();
        MarkersController.addMarkers();
    }

    function getPolylinesFromName(characterName, season = SeasonController.getCurrentSeason()) {
        const filteredPaths = DATA_PATHS.paths.filter(p =>
            p.character === characterName &&
            (
                (p.season === season.id &&
                 p.episode >= AppState.CURRENT_RANGE[0] &&
                 p.episode <= AppState.CURRENT_RANGE[1])
                ||
                // Movies (season.id >= 100)
                (season.id >= 100 && p.season === season.id)
            )
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