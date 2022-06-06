let map;
let geocoder;

export function initMap() {
    // The location of Uluru
    geocoder = new google.maps.Geocoder();
    const centerLocation = Object.values(JSON.parse(sessionStorage.getItem("URI")))
    const center = geocodeAddress(centerLocation[0].split("=")[1])
    center.then(locationArray => {
        if (document.getElementById("map") === null) {
            return;
        }
        map = new google.maps.Map(document.getElementById("map"), {
            zoom: 6,
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

export function addMarkerForListing(address){
    geocodeAddress(address)
        .then(locationArray => {
            let position = {
                lat: locationArray.results[0].geometry.location.lat(),
                lng: locationArray.results[0].geometry.location.lng()
            }
            const infoWindow = new google.maps.InfoWindow({
                content: `${address}`
            })
           let marker = new google.maps.Marker({
                position: position,
                map,
                title: address
            });
            google.maps.event.addListener(marker, 'hover', function() {
                infoWindow.open({
                    anchor: marker,
                    map,
                    shouldFocus: false,
                });
            });
        })
}
