import L from "leaflet";
import "leaflet.markercluster";

// Data will be replaced with dynamic API data in a future phase
import data from "./data/map-data-unprocessed.json";

// Filter data to include only items with lat and lon
const dataWithLatLon = data.data.filter((item) => {
    const details = item["@template"].details;
    return details.lat && details.lon;
});

// Convert data to GeoJSON format
const dataToGeoJson = {
    type: "FeatureCollection",
    features: dataWithLatLon.map((item) => {
        const { lat, lon, title, description, itemURL, collection, ciimId } =
            item["@template"].details;

        return {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [lon, lat],
            },
            properties: {
                title,
                description,
                itemURL,
                collection,
                ciimId,
            },
        };
    }),
};

export default function () {
    // Get lat, lng, and zoom query string parameters to set initial map state
    let queryStringParams = new URLSearchParams(document.location.search);

    const hasLatAndLng = queryStringParams.get("lat") && queryStringParams.get("lng");

    const initialLat = hasLatAndLng ? queryStringParams.get("lat") : 54.4700;
    const initialLng = hasLatAndLng ? queryStringParams.get("lng") : -5.6689;
    const initialZoom = queryStringParams.get("zoom") ?? 3;

    // Initialize map
    const map = L.map("ohos-search-results-map", {
        center: [initialLat, initialLng],
        minZoom: 3,
        zoom: initialZoom,
        zoomControl: false, // Disable default zoom control so it can be positioned in the top right corner
    });

    // Define and add zoom control position
    L.control.zoom({
        position: "topright",
    }).addTo(map);

    // Define and add tile layer (map canvas)
    L.tileLayer("http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
        {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        },
    ).addTo(map);

    // Define and add icon for marker cluster group
    const markers = L.markerClusterGroup({
        iconCreateFunction: function (cluster) {
            const clusteredMarkersCount = cluster.getChildCount();

            return L.divIcon({
                html: `
                    <div>
                        <span>${clusteredMarkersCount}</span>
                    </div>
                `,
                className: "leaflet-marker-icon marker-cluster",
                iconSize: L.point(54, 54),
            });
        },
    }).addTo(map);

    // Define icon for marker
    const markerIcon = L.icon({
        iconUrl: "../../static/images/icons/icon-map-pin.svg",
        iconSize: [31, 39],
        iconAnchor: [15, 39],
    });

    // Popup options
    const popupOptions = {
        maxWidth: 400,
        offset: [0, -35],
        className: "ohos-popup",
    };

    // Create GeoJSON layer with popups
    L.geoJSON(dataToGeoJson, {
        onEachFeature(feature, layer) {
            // Popup content
            const templateTitle = feature.properties.title
                ? `<h3 class="tna-heading-m"><a href="/catalogue/id/${feature.properties.ciimId}">${feature.properties.title}</a></h3>`
                : "";
            const templateDescription = feature.properties.description
                ? `<p>${feature.properties.description}</p>`
                : "";
            const templateCollection = feature.properties.collection
                ? `Collection: <a href="/search/catalogue/?collection=${feature.properties.collection}">${feature.properties.collection}</a>`
                : "";

            const popupTemplate = `
                <div>
                    <i class="ohos-popup__icon fa-solid fa-file"></i>
                </div>
                <div class="ohos-popup__content">
                    ${templateTitle}
                    ${templateDescription}
                    ${templateCollection}
                </div>
            `;

            // Bind popup to layer
            layer.bindPopup(popupTemplate, popupOptions);
        },
        // Create markers and add to marker cluster group
        pointToLayer(feature, latlng) {
            const marker = L.marker(latlng, { icon: markerIcon });
            markers.addLayer(marker);
            return marker;
        },
    });

    // Add moveend event listener to map and update queryParams for link sharing
    map.on("moveend", function () {
        const { lat, lng } = map.getCenter();
        const zoom = map.getZoom();

        const state = { lat, lng, zoom };
        const url = new URL(location);
        url.searchParams.set("lat", lat);
        url.searchParams.set("lng", lng);
        url.searchParams.set("zoom", zoom);

        history.pushState(state, "", url);
    });
}
