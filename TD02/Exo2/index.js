const map = L.map("map")
const layer = new L.StamenTileLayer("terrain")
map.addLayer(layer)

navigator.geolocation.getCurrentPosition(function (position) {
  const { latitude, longitude, accuracy } = position.coords

  map.setView([latitude, longitude], 13)

  // Triangle des Bermudes - Coordonnées des 3 points du triangle
  const bermudaTriangle = {
    point1: {
      latitude: 25.789106,
      longitude: -80.226529,
    },
    point2: {
      latitude: 18.4663188,
      longitude: -66.1057427,
    },
    point3: {
      latitude: 32.294887,
      longitude: -64.78138,
    },
  }

  L.polygon(
    [
      [bermudaTriangle.point1.latitude, bermudaTriangle.point1.longitude],
      [bermudaTriangle.point2.latitude, bermudaTriangle.point2.longitude],
      [bermudaTriangle.point3.latitude, bermudaTriangle.point3.longitude],
    ],
    { color: "red" }
  ).addTo(map)

  // Cercle autour de la position actuelle dont le rayon est la précision estimée
  L.circle([latitude, longitude], {
    color: "blue",

    radius: accuracy,
  }).addTo(map)
  // Position de la ville de Marseille
  const marseilleCity = {
    latitude: 43.296482,
    longitude: 5.36978,
  }

  // Segment entre la position actuelle et Marseille
  L.polyline(
    [
      [latitude, longitude],
      [marseilleCity.latitude, marseilleCity.longitude],
    ],
    { color: "red" }
  ).addTo(map)

  const distanceEl = document.getElementById("distance")

  // Calcul de la distance entre la position actuelle et la ville de Marseille
  const distance = greatCircleDistance({ latitude, longitude }, marseilleCity)

  distanceEl.innerHTML = distance + " km"
})

function greatCircleDistance(pointA, pointB) {
  const { latitude: latA, longitude: lonA } = pointA
  const { latitude: latB, longitude: lonB } = pointB

  // Conversion en radians
  const φ1 = (latA * Math.PI) / 180 // latitudeA
  const φ2 = (latB * Math.PI) / 180 // latitudeB
  const Δ1 = ((latB - latA) * Math.PI) / 180 // longitudeA
  const Δ2 = ((lonB - lonA) * Math.PI) / 180 // longitudeB

  const R = 6371e3 // Rayon de la terre en mètres

  const distance =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin((φ2 - φ1) / 2), 2) +
          Math.cos(φ1) * Math.cos(φ2) * Math.pow(Math.sin((Δ2 - Δ1) / 2), 2)
      )
    )

  return metersToKilometers(distance).toFixed(2)
}

function metersToKilometers(meters) {
  return meters / 1000
}
