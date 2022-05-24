import createView from "../createView.js";
import {isLoggedIn} from "../auth.js";

const BASE_URL = `http://${BACKEND_HOST}:${PORT}`;

export default function ListingIndex(props) {
    console.log(props)
    requestListingDetailView(props.listing.listingAddress);
    // language=HTML
    return `
        <div id="listingPageDiv" data-id="${props.listing.id}"
             class="flex flex-col min-h-[calc(100vh-90px)] relative bg-primary">
            <img class="w-full"
                 src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                 alt="main listing photo">
            <div class="flex justify-start w-full ">
                ${populateListingFromDB(props.listing)}
                <div id="ApiDetails" class="w-full"></div>
            </div>
            <div class="flex mx-auto">
                <button id="viewOffersBtn" class="hidden p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction">View Offers</button>
                <button id="editListing" class="p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction">Edit Listing</button>
            </div>
        </div>`
}

const populateListingFromDB = (listing) => {
    //language=HTML
    return `
        <div class="h-full w-full">
            <div class="m-1 pb-1 text-center">${listing.askingPrice}</div>
            <div class="m-1 pb-1 text-center" id="listing#-${listing.id}">MLS# ${listing.id}</div>
            <div class="m-1 pb-1 text-center">${listing.listingStatus}</div>
            <div class="m-1 pb-1 text-center">${listing.listingAddress.address}</div>
            <div class="m-1 pb-1 text-center">${listing.listingAddress.city}, ${listing.listingAddress.state}
                ${listing.listingAddress.zipCode}
            </div>
            <div class="m-1 pb-1 text-center">${listing.sellerAgent.firstName} ${listing.sellerAgent.lastName}</div>
            <div class="m-1 pb-1 text-center">${listing.sellerAgent.email}</div>
            <p class="w-full text-justify">${listing.description}</p>
        </div>`
};

const populateDetailsFromApi = (propertyInfo) => {
    console.log(propertyInfo);
    const html = `
    <div class="m-1 pb-1 text-center place-items-center" id = "apiSqFt">SqFt: ${propertyInfo.building.size.bldgsize}</div>
    <div class="flex m-1 pb-1 text-center justify-around items-center" id = "apiBaths">Baths: ${propertyInfo.building.rooms.bathsfull}</div>
    <div class="flex m-1 pb-1 text-center justify-around items-center" id = "apiBeds">Beds: ${propertyInfo.building.rooms.beds ?? 2}</div>
    <div class="m-1 pb-1 text-center place-items-center" id = "apiParkingType">Parking: ${propertyInfo.building.parking.garagetype}</div>
    <div class="m-1 pb-1 text-center place-items-center" id = "apiParkingSpace">Spaces: ${propertyInfo.building.parking.prkgSpaces}</div>
    <div class="flex m-1 pb-1 text-center justify-around items-center" id = "apiAC">A/C: ${propertyInfo.utilities.coolingtype}</div>
    <div class="flex m-1 pb-1 text-center justify-around place-items-center" id = "apiHeat">Heat: ${propertyInfo.utilities.heatingtype}</div>
    <div class="flex m-1 pb-1 text-center justify-around items-center" id = "apiRoof">Roof: ${propertyInfo.building.construction.roofcover}</div>
    <div class="m-1 pb-1 text-center place-items-center" id = "apiLot">Lot SqFt: ${propertyInfo.lot.lotsize2}</div>
    </div>`
    $("#ApiDetails").append(html);
}

function revealOffersButton() {
    if (isLoggedIn()) {
        $('#viewOffersBtn').removeClass('hidden');
    }
}

const viewOffers = _ => {
    $("#viewOffersBtn").click(function (event) {
        event.preventDefault();
        let listingId = $('#listingPageDiv').attr('data-id');
        createView(`/offers/findOffers/${listingId}`);
    });
}

const editListing = _ => {
    $('#editListing').click(_ => {
        let listingId = $('#listingPageDiv').attr('data-id');
        createView(`/realtorListing/listings/${listingId}`)
    });
}

////CODE BELOW RETURNS WITH RESULT BASED ON CONST ABOVE, DETAILED VIEW ////
    function requestListingDetailView(listingAddress) {
        //// grab strings for const below from search box, split on ""
        const address = encodeURIComponent(`${listingAddress.address}, ${listingAddress.city}, ${listingAddress.state}`);

        // let url = `https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?address=${address}`;
        fetch(`${BASE_URL}/api/houseInfo?address=${address}`, {
            method: "GET",
        }).then(response => response.json())
            .then(properties => populateDetailsFromApi(properties.property[0]))
    }

/// Need to grab property ID from the JSON returned from property detail function
// const propertyID = "33497215"

// function requestSchoolDetailView() {
//     var url = `https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detailwithschools?attomid=${propertyID}`;
//
//     var xhr = new XMLHttpRequest();
//     xhr.open("GET", url);
//
//     xhr.setRequestHeader("Accept", "application/json");
//     xhr.setRequestHeader("apikey", `${attomApiKey()}`);
//     xhr.responseType = 'json';
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4) {
//             console.log(xhr.status);
//             console.log(xhr.response);
//         }
//     };
//
//     xhr.send();
// }
//
// requestSchoolDetailView();

export function ListingEvent() {
    revealOffersButton();
    viewOffers();
    editListing();
}///CLOSE LISTINGEVENT FUNCTION
