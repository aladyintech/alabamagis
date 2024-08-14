// Load the GeoJSON data (you need to replace 'alabama_counties.geojson' with the correct path)
fetch('alabama_counties.geojson')
    .then(response => response.json())
    .then(data => {
        // Initialize the map
        var map = L.map('map').setView([32.806671, -86.791130], 7);

        // Add a tile layer (map background)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Function to style the counties
        function style(feature) {
            return {
                fillColor: 'blue',
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            };
        }

        // Add GeoJSON layer to the map
        var geojsonLayer = L.geoJson(data, {
            style: style
        }).addTo(map);

        // Populate the dropdown menu
        var select = document.getElementById('countySelect');
        data.features.forEach(function(feature) {
            var option = document.createElement('option');
            option.value = feature.properties.NAME;
            option.text = feature.properties.NAME;
            select.add(option);
        });

        // Zoom to selected county when dropdown changes
        select.addEventListener('change', function() {
            var selectedCounty = this.value;
            var selectedFeature = data.features.find(function(feature) {
                return feature.properties.NAME === selectedCounty;
            });
            var bounds = geojsonLayer.getBounds();
            map.fitBounds(geojsonLayer.getBounds());

            geojsonLayer.eachLayer(function(layer) {
                if (layer.feature.properties.NAME === selectedCounty) {
                    layer.setStyle({ fillColor: 'red' });
                    map.fitBounds(layer.getBounds());
                } else {
                    layer.setStyle({ fillColor: 'blue' });
                }
            });
        });
    });
