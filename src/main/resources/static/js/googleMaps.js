
let map;
let geocoder;

export function initMap() {
    // The location of Uluru
    geocoder = new google.maps.Geocoder();
    const center = geocodeAddress(JSON.parse(sessionStorage.getItem("URI")).split("=")[1])
    center.then(locationArray => {
        map = new google.maps.Map(document.getElementById("map"), {
            zoom: 8,
            center: {
                lat: locationArray.results[0].geometry.location.lat(),
                lng: locationArray.results[0].geometry.location.lng()
            },
        });
    })
}

export function geocodeAddress(address) {
    return geocoder.geocode({address: address}, function (results, status) {
        if (status === 'OK') {
            return results
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    })
}

function addMarker(locationMarker){
    const marker = new google.maps.Marker({

    });
}
