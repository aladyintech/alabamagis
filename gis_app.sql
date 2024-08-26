CREATE DATABASE gis_app;

USE gis_app;

CREATE TABLE traffic_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    location VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    speed INT NOT NULL
);

INSERT INTO traffic_data (location, latitude, longitude, speed) VALUES
('Interstate 85', 32.609856, -85.480782, 60),
('US Highway 280', 32.606894, -85.481018, 45),
('State Route 14', 32.380120, -86.319306, 55);
