navigator.geolocation.watchPosition(function (position) {
  const { latitude, longitude } = position.coords

  const map = L.map("map").setView([latitude, longitude], 13)

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map)

  L.marker([latitude, longitude]).addTo(map).bindPopup('Position actuelle')

  // Nice - Latitude : 43.6961 Longitude : 7.27178
  const niceCity = {
    latitude: 43.6961,
    longitude: 7.27178,
  }

  L.marker([niceCity.latitude, niceCity.longitude]).addTo(map).bindPopup('Nice')
})

