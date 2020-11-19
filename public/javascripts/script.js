document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

let map;
function initMap(){
  const lisbon = { lat: 38.7117206, lng: -9.1264315 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17,
    center: lisbon
  });
}
