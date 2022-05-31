import createView from "../createView.js";

let map;
let geocoder;
let listingsAddresses = [];
let latitude = 0;
let longitude = 0;

export default function AllListings(props) {
    console.log(props)
    getAddresses(props.allListings)
    //language=HTML
    return `
        <div class="content-height bg-primary">
            <div class="m-4">
                <div id="map" class="w-full" style="height:50vh"></div>
            </div>
            <div class="flex flex-col items-center">
                ${populateListings(props.allListings)}
            </div>
        </div>
    `
}

const populateListings = listings => {
    let listingDivs = "";
    //language=HTML
    listings.forEach(listing => {
        console.log(listing.id)
        listingDivs += `
            <div class="w-11/12 flex flex-wrap justify-evenly border-2 border-callToAction bg-secondary m-2" data-id="${listing.id}" id="listing">
                <div class="m-1 pb-1 text-center">${listing.askingPrice}</div>
                <div class="m-1 pb-1 text-center" id="listing#-${listing.id}">MLS# ${listing.id}</div>
                <div class="m-1 pb-1 text-center">${listing.listingStatus}</div>
                <div class="m-1 pb-1 text-center">${listing.listingAddress.address}</div>
                <div class="m-1 pb-1 text-center">${listing.listingAddress.city}, ${listing.listingAddress.state}, ${listing.listingAddress.zipCode}
                </div>
                <div class="m-1 pb-1 text-center">${listing.sellerAgent.firstName} ${listing.sellerAgent.lastName}</div>
                <div class="m-1 pb-1 text-center">${listing.sellerAgent.email}</div>
                <p class="w-full text-justify">${listing.description}</p>
                <button type="button" id="viewListingButton">View Listing</button>
            </div>
            </div>
        `
    })
    return listingDivs;
}

const createListingView = _ => {
    $("#viewListingButton").click(e => {
        e.preventDefault();
        createView(`/listing/listings/${$("#listing").attr("data-id")}`)
    })
}

function initMap() {
    // The location of Uluru
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: {lat: 0, lng: 0},
    });
    geocoder = new google.maps.Geocoder();
    const center = geocodeAddress(JSON.parse(sessionStorage.getItem("URI")).split("=")[1])
    console.log(center)

}

const getAddresses = allListings => {
    allListings.forEach(listing => {
        listingsAddresses.push(`${listing.listingAddress.address}, ${listing.listingAddress.city}, ${listing.listingAddress.state}`)
    })
}

const geocodeAddress = address => {
    return geocoder.geocode({address: address}, function (results, status) {
        if (status === 'OK') {
            return results.json();
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    })
}

export function AllListingsEvent() {
    createListingView();
    initMap();
}


