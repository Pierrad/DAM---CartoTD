// geolocation

document.addEventListener(
  "DOMContentLoaded",
  function () {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude
      const lng = position.coords.longitude
      const entity = document.getElementById("localizedEntity")

      entity.setAttribute("gps-new-entity-place", `latitude: ${lat}; longitude: ${lng}`)
    })
  },
  false
)
