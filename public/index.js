
let map;
const image = "http://maps.google.com/mapfiles/kml/pushpin/blue-pushpin.png"

function initMap () {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 21.1232, lng: 79.0515},
    zoom: 17,
  });

  const newMark = new google.maps.Marker({
    map:map,
    position : {lat: 21.1232, lng: 79.0515}
  });
  const infowindow = new google.maps.InfoWindow({
    content:  "Visvesvaraya National Institute of Technology, Nagpur" + "</br><br>Visvesvaraya Statue"
  });
  newMark.addListener("click", () => {
    infowindow.open({
      anchor: newMark,
      map,
      shouldFocus: false,
    });
  });
  
  google.maps.event.addListener(map,'click',function(event) { 
     var description = addDetails()
     if(description===null) alert("Please Enter Valid Description");
     else newMarker(event.latLng,description);
  })
}

function addDetails() {
    const description = prompt("Please Enter Description of Marker")
    return description
}

marker = [];
axios
  .get("http://localhost:3000/locs")
  .then(res => {
    marker=res.data
    marker.forEach(element => {
    addMarker(element.lat,element.lng,element.description)
    })
  })
  .catch(err => console.error(err));

function newMarker(location,description) {
  sendLoc(location.lat(),location.lng(),description)
  addMarker(location.lat(),location.lng(),description)
};

function addMarker(lat,lng,description) {
  var newMark = new google.maps.Marker({
    map:map,
    position : {lat:lat,lng:lng},
    icon : image
  });
  const infowindow = new google.maps.InfoWindow({
    content:  "Marker Description  : <br><br>"+description
  });
  newMark.addListener("click", () => {
    infowindow.open({
      anchor: newMark,
      map,
      shouldFocus: false,
    })
  })
}

function sendLoc(lat,lng,description) {  
  const data = {
    lat : lat,
    lng : lng,
    description : description
  };

    axios
      .post("http://localhost:3000/locs",data,{
        headers: {
          'Content-Type': 'application/json'
        }})
      .then(res =>{} )
      .catch(err => console.error(err));
}