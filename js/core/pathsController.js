window.PathsController = (function () {

    function togglePath(characterName) {
        const paths = AppState.LIST_PATHS;

        // ADD (animate)
        if (!paths[characterName]) {
            const layer = L.layerGroup(
                getPolylinesFromName(characterName),
                { snakingPause: AppState.PATH_SPEED_ANIMATION }
            ).addTo(MapController.map);

            // Animate only on first add
            layer.snakeIn();

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
        Object.keys(AppState.LIST_PATHS).forEach(characterName => {

            AppState.LIST_PATHS[characterName].removeFrom(MapController.map);

            AppState.LIST_PATHS[characterName] =
                L.layerGroup(
                    getPolylinesFromName(characterName)
                ).addTo(MapController.map);
        });

        MarkersController.clearMarkers();
        MarkersController.addMarkers();
    }

    function getPolylinesFromName(characterName) {

        const filteredPaths = DATA_PATHS.paths.filter(p =>
            p.character === characterName &&
            (
                // Episodes
                (p.season === 1 &&
                 p.episode >= AppState.CURRENT_RANGE[0] &&
                 p.episode <= AppState.CURRENT_RANGE[1])
                ||
                // Movies
                p.season >= 100
            )
        );

        const color =
            DATA_PATHS.characters.find(c => c.name === characterName).color;

        return filteredPaths.map(p =>
            L.polyline(p.coordinates, {
                color,
                weight: AppState.PATH_WEIGHT,
                dashArray: p.isConfirmed ? '0' : '2 6',
                opacity: p.isConfirmed ? 1 : 0.7
            })
        );
    }

    return {
        togglePath,
        refreshTimelinePaths
    };

})();
