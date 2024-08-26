document.addEventListener('DOMContentLoaded', function() {
    // Initialize the map centered on Alabama
    const map = L.map('map').setView([32.806671, -86.791130], 7); // Coordinates for Alabama

    // Add a Tile Layer (the base map)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Example: Add markers to the map using your data
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            populateDropdown(data);
            addMarkersToMap(data);
        });

    function populateDropdown(data) {
        const dropdown = document.getElementById('location-dropdown');
        data.forEach((item, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = item.location;
            dropdown.appendChild(option);
        });

        dropdown.addEventListener('change', function() {
            updateLocationInfo(data[this.value]);
        });

        updateLocationInfo(data[0]);
    }

    function addMarkersToMap(data) {
        data.forEach(item => {
            L.marker([item.latitude, item.longitude]).addTo(map)
                .bindPopup(`<b>${item.location}</b><br>Speed: ${item.speed} mph`);
        });
    }

    function updateLocationInfo(locationData) {
        const infoDiv = document.getElementById('location-info');
        infoDiv.innerHTML = `<p>Location: ${locationData.location}</p>
                             <p>Speed: ${locationData.speed} mph</p>`;
    }
});
