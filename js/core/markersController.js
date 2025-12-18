window.MarkersController = (function () {

    function clearMarkers() {
        AppState.LIST_MARKERS.forEach(marker => marker.removeFrom(MapController.map));
        AppState.LIST_MARKERS.length = 0;
    }

    function addMarkers() {
        const season = SeasonController.getCurrentSeason();

        DATA_MARKERS.markers.forEach(marker => {
            // Check if marker is relevant for the current season
            const isMarkerRelevant = marker.episodes.some(e =>
                e.season === season.id &&
                e.episode >= AppState.CURRENT_RANGE[0] &&
                e.episode <= AppState.CURRENT_RANGE[1]
            );

            if (!isMarkerRelevant) return;

            const type = DATA_MARKERS.types.find(t => t.name === marker.type);
            const leafletMarker = L.marker(marker.coordinates, {
                icon: L.icon({
                    iconUrl: `img/markers/${type.icon}`,
                    iconSize: type.iconSize,
                    iconAnchor: type.iconAnchor,
                    popupAnchor: type.popupAnchor
                }),
                title: marker.title
            }).bindPopup(
                `<div class='tooltip-image-wrapper' style='background:url("img/places/min/${marker.image}")'>
                    <div class='tooltip-resize'>
                        <a href='img/places/${marker.image}' target='_blank'>
                            <img width='30' src='img/markers/expand-arrows-solid.svg' />
                        </a>
                    </div>
                </div>
                <div class='tooltip-content'>
                    <header class='tooltip-header'>
                        <h2>${marker.title}</h2>
                        <div class='tooltip-tag'>${marker.type}</div>
                        ${marker.isConfirmed ? '' : "<div class='tooltip-tag tooltip-tag--unconfirmed'>coordinates not confirmed</div>"}
                    </header>
                    <div>
                        ${marker.decription}
                        <div class='tooltip-seenin'>
                            <strong>Seen in:</strong> ${marker.episodes
                                .filter(e => e.season === season.id)
                                .map(e => (e.season >= 100
                                    ? e.season === 100 ? "Lord Of The Rings (Movie)" : "The Hobbit (Movie)"
                                    : `S0${e.season}E0${e.episode}`))
                                .join(", ")}
                        </div>
                        ${marker.readMoreUrl ? `<div class='tooltip-moreinfo'><a href='${marker.readMoreUrl}' target='_blank'>Read more about ${marker.title}</a></div>` : ''}
                    </div>
                </div>`
            ).addTo(MapController.map);

            AppState.LIST_MARKERS.push(leafletMarker);
        });
    }

    return { clearMarkers, addMarkers };

})();