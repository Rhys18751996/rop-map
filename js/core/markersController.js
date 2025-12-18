window.MarkersController = (function () {

    function clearMarkers() {
        AppState.LIST_MARKERS.forEach(marker => marker.removeFrom(MapController.map));
        AppState.LIST_MARKERS.length = 0;
    }

    function addMarkers() {
        const currentSeason = SeasonController.getCurrentSeason();

        DATA_MARKERS.markers.forEach(marker => {
            // Only include markers relevant to current season
            if (!currentSeason.markersRelevant(marker)) return;

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
                            <strong>Seen in:</strong> ${marker.episodes.map(e => {
                                if (e.season === 100) return "The Lord of the Rings (Movies)";
                                if (e.season === 104) return "The Hobbit (Movies)";
                                return `S0${e.season}E0${e.episode}`;
                            }).join(", ")}
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