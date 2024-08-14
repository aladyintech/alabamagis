// Initialize the map centered on Alabama
var map = L.map('map').setView([32.806671, -86.791130], 7);

// Add a tile layer (map background) similar to Google Maps
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add highways layer
var highwaysLayer = L.geoJson(null, {
    style: function (feature) {
        return {
            color: 'blue',
            weight: 3,
            opacity: 0.7
        };
    }
});

// Load the GeoJSON data for Alabama highways (replace with your own GeoJSON file)
fetch('alabama_highways.geojson')
    .then(response => response.json())
    .then(data => {
        highwaysLayer.addData(data);
        map.addLayer(highwaysLayer);
    });

// Handle the dropdown menu for future layers
var layerSelect = document.getElementById('layerSelect');
layerSelect.addEventListener('change', function() {
    if (this.value === 'highways') {
        map.addLayer(highwaysLayer);
    } else {
        map.removeLayer(highwaysLayer);
    }
});
