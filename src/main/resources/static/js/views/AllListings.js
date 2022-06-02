import createView from "../createView.js";
import {initMap} from "../googleMaps.js";

let listingsAddresses = [];


export default function AllListings(props) {
    console.log(props)
    getAddresses(props.allListings)
    //language=HTML
    return `
        <div class="content-height bg-slate-200 opacity-95">
            <div class="m-4">
                <div id="map" class="hidden w-full md:block" style="height:50vh"></div>
            </div>
            <div class="m-4 flex flex-col items-center">
                ${populateListings(props.allListings)}
            </div>
        </div>
    `
}

const populateListings = listings => {
    let listingHtml = "";
    //language=HTML
    listings.forEach(listing => {
        listingHtml += `
            <div class="listing bg-white w-1/4 border-2 border-callToAction rounded-md shadow-xl m-2 md:w-1/4" data-id="${listing.id}">
                <div>
                    <img class="w-full h-full" src="${listing.house_images[0] ?? "Picture Not Available"}" alt="Picture of ${listing.listingAddress.address}">
                </div>
                <div class="m-1 pb-1 text-center">${listing.askingPrice}</div>
                <div class="m-1 pb-1 text-center" id="listing#-${listing.id}">MLS# ${listing.id}</div>
                <div class="m-1 pb-1 text-center">${listing.listingStatus}</div>
                <div class="m-1 pb-1 text-center"></div>
                <div class="m-1 pb-1 text-center">${listing.listingAddress.address} </br>${listing.listingAddress.city}, ${listing.listingAddress.state}, ${listing.listingAddress.zipCode}
                </div>
                <div class="m-1 pb-1 text-center">${listing.sellerAgent.firstName} ${listing.sellerAgent.lastName}</div>
                <div class="m-1 pb-1 text-center">${listing.sellerAgent.email}</div>
                <div class="w-full text-justify">${listing.description}</div>
            </div>`
    })
    return listingHtml;
}

const createListingView = _ => {
    $(".listing").click(e => {
        let id = null;
        if (e.target.classList.contains("listing")) {
            id = e.target.getAttribute("data-id")
        } else {
            id = e.target.parentElement.getAttribute("data-id")
        }
        createView(`/listing/api/listings/${id}`)
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
