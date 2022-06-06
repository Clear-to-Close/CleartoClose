import createView from "../createView.js";
import {initMap, addMarkerForListing} from "../googleMaps.js";

let listingsAddresses = [];

export default function AllListings(props) {
    console.log(props)
    if (props.listings.length === 0) {
        alert("No Listings Found")
        createView("/")
    }
    getAddresses(props.listings)
    sessionStorage.setItem("listings", JSON.stringify(props.listings))
    //language=HTML
    return `
        <div class="h-max bg-slate-200 opacity-95 overflow-hidden">
            <div class="m-4 h-1/2">
                <div id="map" class="hidden w-full md:block" style="height:65vh"></div>
            </div>
            <div class="h-full grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 m-4">
                ${populateListings(props.listings)}
            </div>
        </div>
    `
}

const populateListings = listings => {
    let listingHtml = "";
    //language=HTML
    listings.forEach(listing => {
        listingHtml += `
            <div class="listing bg-white w-full h-[770px] border-2 border-callToAction rounded-md shadow-xl" data-id="${listing.id}">
                <div class="h-1/3">
                    <img class="w-full h-full" src="${listing.house_images[0] ?? "Picture Not Available"}"
                         alt="Picture of ${listing.listingAddress.address}">
                </div>
                <div class="px-5">
                    <div class="m-1 pb-1 flex justify-between">
                        <span>Asking Price</span>
                        <span>${listing.askingPrice}</span>
                    </div>
                    <div class="m-1 pb-1 flex justify-between" id="listing#-${listing.id}">
                        <span>MLS#</span>
                        <span>${listing.id}</span>
                    </div>
                    <div class="m-1 pb-1 flex justify-between">
                        <span>Listing Status:</span>
                        <span>${listing.listingStatus}</span>
                    </div>
                    <div class="m-1 pb-1 flex justify-between">
                        <span>Address</span>
                        <span>
                        ${listing.listingAddress.address} </br>${listing.listingAddress.city}, ${listing.listingAddress.state}
                            , ${listing.listingAddress.zipCode}
                        </span>
                    </div>
                    <div class="m-1 pb-1 flex justify-between">
                        <span>Listing Agent:</span>
                        <span>${listing.sellerAgent.firstName} ${listing.sellerAgent.lastName}</span>
                    </div>
                    <div class="m-1 pb-1 flex justify-between">
                        <span>Agent's Email:</span>
                        <span>${listing.sellerAgent.email}</span>
                    </div>
                </div>
                <div class="w-full px-5">
                    <span>Property Description:</span><br>
                    <span>${listing.description}</span>
                </div>
            </div>`
    })
    return listingHtml;
}

const createListingView = _ => {
    $(".listing").click(e => {
        let id = null;
        if (e.target.closest(".listing")) {
            id = e.target.closest(".listing").getAttribute("data-id")
        }
        createView({listing: {listing: `/api/listings/${id}`}})
    })
}

const getAddresses = allListings => {
    allListings.forEach(listing => {
        listingsAddresses.push(`${listing.listingAddress.address}, ${listing.listingAddress.city}, ${listing.listingAddress.state}`)
    })
}

const loadMapMarkers = _ => {
    $(document).ready(function () {
        let listings = JSON.parse(sessionStorage.getItem("listings"))
        let address;
        for (let i = 0; i < listings.length; i++) {
            address = `${listings[i].listingAddress.address}, ${listings[i].listingAddress.city}, ${listings[i].listingAddress.state}`
            addMarkerForListing(address);
        }
    })
}

export function AllListingsEvent() {
    createListingView();
    initMap();
    loadMapMarkers();
}

