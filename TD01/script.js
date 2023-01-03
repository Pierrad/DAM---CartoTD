if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude, altitude, speed, accuracy } = position.coords;
  
    const positionEl = document.getElementById('position1');
    const precisionEl = document.getElementById('precision1');
    const speedEl = document.getElementById('speed1');
    const dateEl = document.getElementById('date1');

    positionEl.innerHTML = `Latitude: ${latitude} °, Longitude: ${longitude} °, Altitude: ${altitude} m`;
    precisionEl.innerHTML = `Precision: ${accuracy} m`;
    speedEl.innerHTML = `Speed: ${speed} m/s`;
    dateEl.innerHTML = `Date: ${new Date(position.timestamp)}`;
  });

  navigator.geolocation.watchPosition((position) => {
    const { latitude, longitude, altitude, speed, accuracy } = position.coords;
  
    const positionEl = document.getElementById('position2');
    const precisionEl = document.getElementById('precision2');
    const speedEl = document.getElementById('speed2');
    const dateEl = document.getElementById('date2');

    positionEl.innerHTML = `Latitude: ${latitude} °, Longitude: ${longitude} °, Altitude: ${altitude} m`;
    precisionEl.innerHTML = `Precision: ${accuracy} m`;
    speedEl.innerHTML = `Speed: ${speed} m/s`;
    dateEl.innerHTML = `Date: ${new Date(position.timestamp)}`;
  });

} else {
  window.alert('Geolocation is not available');
}