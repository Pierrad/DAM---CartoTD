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

if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', (event) => {
    const { alpha, beta, gamma } = event;
    const alphaEl = document.getElementById('alpha');
    const betaEl = document.getElementById('beta');
    const gammaEl = document.getElementById('gamma');

    alphaEl.innerHTML = `Alpha: ${alpha} °`;
    betaEl.innerHTML = `Beta: ${beta} °`;
    gammaEl.innerHTML = `Gamma: ${gamma} °`;
  });
}

if (window.DeviceMotionEvent) {
  window.addEventListener('devicemotion', (event) => {
    const { acceleration, accelerationIncludingGravity, rotationRate, interval } = event;
    const accelerationEl = document.getElementById('acceleration');
    const accelerationIncludingGravityEl = document.getElementById('accelerationIncludingGravity');
    const rotationRateEl = document.getElementById('rotationRate');

    accelerationEl.innerHTML = `Acceleration: ${acceleration.x} m/s², ${acceleration.y} m/s², ${acceleration.z} m/s²`;
    accelerationIncludingGravityEl.innerHTML = `Acceleration including gravity: ${accelerationIncludingGravity.x} m/s², ${accelerationIncludingGravity.y} m/s², ${accelerationIncludingGravity.z} m/s²`;
    rotationRateEl.innerHTML = `Rotation rate: ${rotationRate.alpha} °/s, ${rotationRate.beta} °/s, ${rotationRate.gamma} °/s`;
  });
}