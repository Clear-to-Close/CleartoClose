import createView from "../createView.js";
import { initMap } from "../googleMaps.js";

let listingsAddresses = [];


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
    //language=HTML
    return listings.map(listing =>
         `
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
                <button data-id="${listing.id}" type="button" id="viewListingButton">View Listing</button>
            </div>
        `
    ).join("")
}

const createListingView = _ => {
    $("#viewListingButton").click(e => {
        e.preventDefault();
        createView(`/listing/listings/${$("#viewListingButton").attr("data-id")}`)
    })
}

const getAddresses = allListings => {
    allListings.forEach(listing => {
        listingsAddresses.push(`${listing.listingAddress.address}, ${listing.listingAddress.city}, ${listing.listingAddress.state}`)
    })
}

export function AllListingsEvent() {
    createListingView();
    initMap();
}
