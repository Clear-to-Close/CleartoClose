import createView from "../createView.js";

export default function AllListings(props){
    console.log(props)
    //language=HTML
    return props.allListings.map(listing => `
        <div id="map" class="h-[200px] w-full"></div>
        <div class="w-11/12 flex flex-wrap justify-evenly border-2 border-callToAction bg-secondary m-2" data-id="${listing.id}" id="listings">
            <div class="m-1 pb-1 text-center">${listing.askingPrice}</div>
            <div class="m-1 pb-1 text-center" id="listing#-${listing.id}">MLS# ${listing.id}</div>
            <div class="m-1 pb-1 text-center">${listing.listingStatus}</div>
            <div class="m-1 pb-1 text-center">${listing.listingAddress.address}</div>
            <div class="m-1 pb-1 text-center">${listing.listingAddress.city}, ${listing.listingAddress.state}, ${listing.listingAddress.zipCode}</div>
            <div class="m-1 pb-1 text-center">${listing.sellerAgent.firstName} ${listing.sellerAgent.lastName}</div>
            <div class="m-1 pb-1 text-center">${listing.sellerAgent.email}</div>
            <p class="w-full text-justify">${listing.description}</p>
        </div>
    `).join("")
}

export function AllListingsEvent() {
    $("#listings").click(e => {
        console.log(e.target)
        let id = e.target.getAttribute("data-id");
        console.log(id);
        createView(`/listing/listings/${id}`)
    })
    initMap();
    codeAddress(document.getElementById('address').value);
}
    function initMap() {
        const options = {
            //map options
            zoom: 8,
            center: {lat: 32.7767, lng: -96.7970}
        }
        //New map
        const map = new
        google.maps.Map(document.getElementById('map'), options);

        addMarker({coords: {lat: 32.7767 , lng: -96.7970}});
        function addMarker(props) {
            const marker = new google.maps.Marker({
                position: props.coords,
                map: map
            });
        }
}

function codeAddress(address) {
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            const marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}