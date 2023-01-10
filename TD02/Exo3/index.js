const map = L.map("map")
const layer = new L.StamenTileLayer("terrain")
map.addLayer(layer)

fetch(
  "http://opendata.nicecotedazur.org/data/storage/f/2023-01-10T06:02:16.877Z/entries-shopping.json",
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
)
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    const { objetsTouristiques } = data
    const geoJson = {
      type: "FeatureCollection",
      features: [],
    }

    Object.values(objetsTouristiques).forEach((objet) => {
      const { nom, localisation, presentation, type, id } = objet

      geoJson.features.push({
        id: id,
        type: "Feature",
        geometry: localisation.geolocalisation.geoJson,
        properties: {
          name: nom.libelleFr,
          amenity: type,
          popupContent: presentation.descriptifCourt.libelleFr,
        },
      })
    })

    const niceCity = {
      latitude: 43.6961,
      longitude: 7.27178,
    }
    map.setView([niceCity.latitude, niceCity.longitude], 13)

    L.geoJSON(geoJson, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup(
          `<h1>${feature.properties.name}</h1><p>${feature.properties.popupContent}</p>`
        )
      },
    }).addTo(map)
  })
  .catch((e) => console.error(e))

//
// Bonus - Trajet avec MapBox
//

const pathMap = L.map("pathMap")
const pathLayer = new L.StamenTileLayer("terrain")
pathMap.addLayer(pathLayer)

document.getElementById("coordinates").addEventListener("submit", (e) => {
  e.preventDefault()
  const startingPoint = document.getElementById("start").value
  const [startLon, startLat] = startingPoint.split(",")
  const endPoint = document.getElementById("end").value
  const [endLon, endLat] = endPoint.split(",")

  fetch(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${startLon}%2C${startLat}%3B${endLon}%2C${endLat}?alternatives=false&geometries=geojson&language=fr&overview=full&steps=true&access_token=pk.eyJ1IjoiY3YwNiIsImEiOiJjajg2MmpzYjcwbWdnMzNsc2NzM2l4eW0yIn0.TfDJipR5II7orUZaC848YA`
  )
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      const { routes, waypoints } = data
      const latlngs = []

      routes[0].geometry.coordinates.forEach((coord) => {
        latlngs.push([coord[1], coord[0]])
      })

      pathMap.setView([startLat, startLon], 13)

      L.marker([startLat, startLon]).addTo(pathMap).bindPopup(`Départ - ${waypoints[0].name}`)
      L.marker([endLat, endLon]).addTo(pathMap).bindPopup(`End - ${waypoints[1].name}`)

      L.polyline(latlngs, { color: "red" }).addTo(pathMap)
    })
    .catch((e) => console.error(e))
})
