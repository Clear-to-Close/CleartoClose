export function createGoogleMap(center) {
    let setCenter = center ?? {lat: 32.7767, lng: -96.7970}
    // Create the script tag, set the appropriate attributes
    let script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAfAOxMIXckHb6A-lKm8_dy_SOXnXchapU&callback=initMap';
    script.async = true;

    let map;

// Attach your callback function to the `window` object
    window.initMap = function() {
        const options = {
            zoom: 8,
            center: setCenter
        }
        //New map
        map = new
        google.maps.Map(document.getElementById('map'), options);

        addMarker({coords: {lat: 32.7767 , lng: -96.7970}});
        function addMarker(props) {
            const marker = new google.maps.Marker({
                position: props.coords,
                map: map
            });
        }
    };

// Append the 'script' element to 'head'
    document.head.appendChild(script);
    return map;
}
