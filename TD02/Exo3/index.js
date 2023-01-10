const map = L.map("map")
const layer = new L.StamenTileLayer("terrain")
map.addLayer(layer)

fetch(
  "https://opendata.nicecotedazur.org/data/storage/f/2023-01-10T06:02:16.877Z/entries-shopping.json",
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

const pathMapBox = L.map("pathMapBox")
const pathMapBoxLayer = new L.StamenTileLayer("terrain")
pathMapBox.addLayer(pathMapBoxLayer)

document.getElementById("coordinatesMapBox").addEventListener("submit", (e) => {
  e.preventDefault()
  const startPoint = document.getElementById("startPoint").value
  const [startLon, startLat] = startPoint.split(",")
  const endPoint = document.getElementById("endPoint").value
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

      pathMapBox.setView([startLat, startLon], 13)

      L.marker([startLat, startLon])
        .addTo(pathMapBox)
        .bindPopup(`Départ - ${waypoints[0].name}`)
      L.marker([endLat, endLon])
        .addTo(pathMapBox)
        .bindPopup(`End - ${waypoints[1].name}`)

      L.polyline(latlngs, { color: "red" }).addTo(pathMapBox)
    })
    .catch((e) => console.error(e))
})

//
// Bonus - Trajet avec MapQuest
//

const pathMapQuest = L.map("pathMapQuest")
const pathMapQuestLayer = new L.StamenTileLayer("terrain")
pathMapQuest.addLayer(pathMapQuestLayer)

document
  .getElementById("coordinatesMapQuest")
  .addEventListener("submit", (e) => {
    e.preventDefault()
    const startAddress = document.getElementById("startAddress").value
    const endAddress = document.getElementById("endAddress").value

    fetch(
      `https://www.mapquestapi.com/directions/v2/route?key=tR2C6osuQcc3RoWnxDMXF6FACtNAzMl8&from=${startAddress}&to=${endAddress}`
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        const { locations } = data.route
        const { maneuvers } = data.route.legs[0]
        const latlngs = []

        Object.values(maneuvers).forEach((maneuver) => {
          latlngs.push([maneuver.startPoint.lat, maneuver.startPoint.lng])
        })

        pathMapQuest.setView(
          [locations[0].latLng.lat, locations[0].latLng.lng],
          13
        )

        L.marker([locations[0].latLng.lat, locations[0].latLng.lng])
          .addTo(pathMapQuest)
          .bindPopup(`Départ - ${locations[0].street}`)
        L.marker([locations[1].latLng.lat, locations[1].latLng.lng])
          .addTo(pathMapQuest)
          .bindPopup(`End - ${locations[1].street}`)

        L.polyline(latlngs, { color: "red" }).addTo(pathMapQuest)
      })
      .catch((e) => {
        console.error(e)
      })
  })
