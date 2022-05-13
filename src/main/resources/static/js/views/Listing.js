import createView from "../createView.js";
import {attomApiKey} from "../keys.js";

const LISTINGS_URL = "http://localhost:8080/api/listings";

export default function ListingIndex(props) {
    console.log(props);
    requestListingDetailView(props.listings.listingAddress);
    // language=HTML
    return `
        <div id="listingPageDiv" data-id="${props.listing.id}" class="flex flex-col h-full relative">
            <img class="w-full"
                 src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                 alt="main listing photo">
            <div class="flex justify-start w-full ">
                ${populateListingFromDB(props.listing)}
                <div id="ApiDetails" class="w-full"></div>
            </div>
            <button id="viewOffersBtn" class="border-2 border-black h-6 w-36 my-1 mx-auto">View Offers</button>
        </div>`
}

const populateListingFromDB = (listing) => {
    //language=HTML
    return `
        <div class="h-full w-full">
            <div class="m-1 pb-1 text-center">${listing.askingPrice}</div>
            <div class="m-1 pb-1 text-center" id="listing#-${listing.id}">MLS# ${listing.id}</div>
            <div class="m-1 pb-1 text-center">${listing.status}</div>
            <div class="m-1 pb-1 text-center">${listing.listingAddress.address}</div>
            <div class="m-1 pb-1 text-center">${listing.listingAddress.city}, ${listing.listingAddress.state} ${listing.listingAddress.zipCode}</div>
            <div class="m-1 pb-1 text-center">${listing.sellerAgent.firstName} ${listing.sellerAgent.lastName}</div>
            <div class="m-1 pb-1 text-center">${listing.sellerAgent.email}</div>
            <p class="w-full text-justify">${listing.description}</p>
        </div>`
};

const populateDetailsFromApi = (apiObject) => {
    console.log(apiObject);
    const html = `
    <div class="m-1 pb-1 text-center place-items-center" id = "apiSqFt">SqFt: ${apiObject.property[0].building.size.bldgsize}</div>
    <div class="m-1 pb-1 text-center place-items-center" id = "apiBaths">Baths: ${apiObject.property[0].building.rooms.bathsfull}</div>
    <div class="m-1 pb-1 text-center place-items-center" id = "apiBeds">Beds: ${apiObject.property[0].building.rooms.beds ?? 2}</div>
    <div class="m-1 pb-1 text-center place-items-center" id = "apiParkingType">Parking: ${apiObject.property[0].building.parking.garagetype}</div>
    <div class="m-1 pb-1 text-center place-items-center" id = "apiParkingSpace">Spaces: ${apiObject.property[0].building.parking.prkgSpaces}</div>
    <div class="m-1 pb-1 text-center place-items-center" id = "apiAC">A/C: ${apiObject.property[0].utilities.coolingtype}</div>
    <div class="m-1 pb-1 text-center place-items-center" id = "apiHeat">Heat: ${apiObject.property[0].utilities.heatingtype}</div>
    <div class="m-1 pb-1 text-center place-items-center whitespace-pre-wrap" id = "apiRoof">Roof: ${apiObject.property[0].building.construction.roofcover}</div>
    <div class="m-1 pb-1 text-center place-items-center" id = "apiLot">Lot SqFt: ${apiObject.property[0].lot.lotsize2}</div>
    
    </div>`
    $("#ApiDetails").append(html);
}


export function ListingEvent() {
    $("#viewOffersBtn").click(function (event) {
        event.preventDefault();
       const id = $('#listingPageDiv').attr('data-id');
        createView(`/offers?listingId=${id}`);
    });

}///CLOSE LISTINGEVENT FUNCTION

////CODE BELOW RETURNS WITH RESULT BASED ON CONST ABOVE, DETAILED VIEW ////
function requestListingDetailView(listingAddress) {
    //// grab strings for const below from search box, split on ""
    const address = encodeURIComponent(`${listingAddress.address}, ${listingAddress.city}, ${listingAddress.state}`);

    let url = `https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?address=${address}`;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.setRequestHeader("accept", "application/json");
    xhr.setRequestHeader("apikey", `${attomApiKey()}`);
    xhr.responseType = 'json';
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            // console.log(xhr.response);
            populateDetailsFromApi(xhr.response);
        }
    };

    xhr.send();
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

