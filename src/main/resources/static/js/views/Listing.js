import createView from "../createView.js";
import {isLoggedIn} from "../auth.js";
import {clearStoredURI} from "../init.js";

const BASE_URL = `http://${BACKEND_HOST}:${PORT}`;

export default function ListingIndex(props) {
    console.log(props)
    requestListingDetailView(props.listing.listingAddress, props.listing.image_list);
    // language=HTML
    return `
        <div id="listingPageDiv" data-id="${props.listing.id}"
             class="flex flex-col content-height relative bg-primary md:flex-row">
            <div class="md:flex md:flex-col">
                <div class="w-full">
                    <img class="w-full"
                         src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                         alt="main listing photo">
                </div>
                <div class="p-2 text-center my-2">
                    ${props.listing.description}
                </div>
            </div>
            <div>
                <div class="flex justify-start w-full">
                    ${populateListingFromDB(props.listing)}
                    <div class="w-full">
                        <div id="ApiDetails" class="w-full"></div>
                        <div class="hidden md:flex">School info</div>
                    </div>
                </div>
                <div class="flex mx-auto justify-center">
                    <button id="viewOffersBtn" class="hidden p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction">View Offers</button>
                    <button id="editListing" class="p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction">Edit Listing</button>
                </div>
            </div>
        </div>`
}

const populateListingFromDB = (listing) => {
    //language=HTML
    return `
        <div class="h-full w-full">
            <div class="m-1 pb-1 flex">
                Asking Price: ${listing.askingPrice}
            </div>
            <div class="m-1 pb-1" id="listing#-${listing.id}">
                MLS#: ${listing.id}
            </div>
            <div class="m-1 pb-1">
                Status: ${listing.listingStatus}
            </div>
            <div class="m-1 pb-1 flex flex-col">
                <span>Physical Address:</span>
                <span>${listing.listingAddress.address}</span>
                <span>${listing.listingAddress.city}, ${listing.listingAddress.state}
                ${listing.listingAddress.zipCode}</span>
            </div>
            <div class="m-1 pb-1 flex flex-col">
                <span>Selling Realtor:</span>
                <span>${listing.sellerAgent.firstName} ${listing.sellerAgent.lastName}</span>
            </div>
            <div class="m-1 pb-1 flex flex-col">
                <span>Realtor Email:</span>
                <span>${listing.sellerAgent.email}</span>
            </div>
        </div>`
};
// flex mx-1 w-[15px] h-[15px] items-center
const populateDetailsFromApi = (propertyInfo, imageUrls) => {
    console.log(propertyInfo);
    //language=HTML
    const html = `
        <div class="flex m-1 pb-1 text-center justify-end items-center" id="apiSqFt">
            <img src="${imageUrls[0]}" alt="Square Foot Icon" class="w-[15px] h-[15px] mx-3">
            <span class="w-[135px]">SqFt: ${propertyInfo.building.size.bldgsize}</span>
        </div>
        <div class="flex m-1 pb-1 text-center justify-end items-center" id="apiBaths">
            <img src="${imageUrls[0]}" alt="Bath Icon" class="w-[15px] h-[15px] mx-3">
            <span class="w-[135px]">Baths: ${propertyInfo.building.rooms.bathsfull}</span>
        </div>
        <div class="flex m-1 pb-1 text-center justify-end items-center" id="apiBeds">
            <img src="${imageUrls[1]}" alt="Bed Icon" class="w-[15px] h-[15px] mx-3">
            <span class="w-[135px]">Beds: ${propertyInfo.building.rooms.beds ?? 2}</span>
        </div>
        <div class="flex m-1 pb-1 text-center justify-end items-center" id="apiParkingType">
            <img src="${imageUrls[3]}" alt="Parking Icon" class="w-[15px] h-[15px] mx-3">
            <span class="w-[135px]">Parking: ${propertyInfo.building.parking.garagetype ?? "Not Listed"}</span>
        </div>
        <div class="flex m-1 pb-1 text-center justify-end items-center" id="apiAC">
            <img src="${imageUrls[4]}" alt="AC Icon" class="w-[15px] h-[15px] mx-3">
            <span class="w-[135px]">A/C: ${propertyInfo.utilities.coolingtype}</span>
        </div>
        <div class="flex m-1 pb-1 text-center justify-end items-center" id="apiHeat">
            <img src="${imageUrls[5]}" alt="Heat Icon" class="w-[15px] h-[15px] mx-3">
            <span class="w-[135px]">Heat: ${propertyInfo.utilities.heatingtype}</span>
        </div>
        <div class="flex m-1 pb-1 text-center justify-end items-center" id="apiRoof">
            <img src="${imageUrls[2]}" alt="Roof Icon" class="w-[15px] h-[15px] mx-3">
            <span class="w-[135px]">Roof: ${propertyInfo.building.construction.roofcover ?? "Not Listed"}</span>
        </div>
        <div class="flex m-1 pb-1 text-center justify-end items-center " id="apiLot">
            <img src="${imageUrls[0]}" alt="Lot Icon" class="w-[15px] h-[15px] mx-3">
            <span class="w-[135px]">Lot SqFt: ${propertyInfo.lot.lotsize2}</span>
        </div>
    `

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
        clearStoredURI();
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

function requestListingDetailView(listingAddress, imageUrls) {
    //// grab strings for const below from search box, split on ""
    const address = encodeURIComponent(`${listingAddress.address}, ${listingAddress.city}, ${listingAddress.state}`);

    // let url = `https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?address=${address}`;
    fetch(`${BASE_URL}/api/houseInfo?address=${address}`, {
        method: "GET",
    }).then(response => response.json())
        .then(properties => populateDetailsFromApi(properties.property[0], imageUrls))
}

/// Need to grab property ID from the JSON returned from property detail function
// const propertyID = "33497215"

function requestSchoolDetailView() {



    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("apikey", `${attomApiKey()}`);
    xhr.responseType = 'json';
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            console.log(xhr.response);
        }
    };

    xhr.send();
}



export function ListingEvent() {
    revealOffersButton();
    viewOffers();
    editListing();
}///CLOSE LISTINGEVENT FUNCTION
