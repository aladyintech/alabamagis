<?php
header('Content-Type: application/json');

$dsn = 'mysql:host=localhost;dbname=gis_app';
$username = 'root';
$password = '';

try {
    $db = new PDO($dsn, $username, $password);
    $query = 'SELECT location, latitude, longitude, speed FROM traffic_data';
    $statement = $db->prepare($query);
    $statement->execute();

    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($results);

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
