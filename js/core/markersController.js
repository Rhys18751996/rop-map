window.MarkersController = (function () {

    function clearMarkers() {
        AppState.LIST_MARKERS.forEach(marker => {
            marker.removeFrom(MapController.map);
        });
        AppState.LIST_MARKERS.length = 0;
    }

    function addMarkers() {

        DATA_MARKERS.markers.forEach(marker => {

            // season / episode relevance
            let isMarkerRelevant =
                marker.episodes.find(e =>
                    e.episode >= AppState.CURRENT_RANGE[0] &&
                    e.episode <= AppState.CURRENT_RANGE[1] &&
                    e.season === 1
                ) !== undefined;

            // movie paths
            if (marker.episodes.find(e => e.season === 100) && AppState.LIST_PATHS["Frodo and Sam"])
                isMarkerRelevant = true;

            if (marker.episodes.find(e => e.season === 101) && AppState.LIST_PATHS["Bilbo and Thorin"])
                isMarkerRelevant = true;

            if (!isMarkerRelevant) return;

            const type = DATA_MARKERS.types.find(t => t.name === marker.type);

            const confirmed = marker.isConfirmed
                ? ""
                : `<div class='tooltip-tag tooltip-tag--unconfirmed'>coordinates not confirmed</div>`;

            const readMore = marker.readMoreUrl
                ? `<div class='tooltip-moreinfo'>
                        <a href='${marker.readMoreUrl}' target='_blank'>
                            Read more about ${marker.title}
                        </a>
                   </div>`
                : "";

            const listEpisodes = marker.episodes.map(e => {
                switch (e.season) {
                    case 100: return "Lord Of The Rings (Movie)";
                    case 101: return "The Hobbit (Movie)";
                    default: return `S0${e.season}E0${e.episode}`;
                }
            }).join(", ");

            const leafletMarker = L.marker(marker.coordinates, {
                icon: L.icon({
                    iconUrl: `img/markers/${type.icon}`,
                    iconSize: type.iconSize,
                    iconAnchor: type.iconAnchor,
                    popupAnchor: type.popupAnchor
                }),
                title: marker.title
            })
            .bindPopup(`
                <div class='tooltip-image-wrapper'
                     style='background:url("img/places/min/${marker.image}")'>
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
                        ${confirmed}
                    </header>
                    <div>
                        ${marker.decription}
                        <div class='tooltip-seenin'>
                            <strong>Seen in:</strong> ${listEpisodes}
                        </div>
                        ${readMore}
                    </div>
                </div>
            `)
            .addTo(MapController.map);

            AppState.LIST_MARKERS.push(leafletMarker);
        });
    }

    return {
        clearMarkers,
        addMarkers
    };

})();
