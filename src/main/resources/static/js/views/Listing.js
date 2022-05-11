import createView from "../createView.js";
import {getHeaders} from "../auth.js";
import {attomApiKey} from "../keys.js";
const LISTINGS_URL = "http://localhost:8080/api/listings";


export default function ListingIndex(props) {
    console.log(props);
    // HTML
    return `
        <header>
            <h1>Listings Page</h1>
        </header>
        <main>
        <img src="/photostocks/ctcplaceholder.png" alt="listingImage">
        <div class="flex justify-center bg-blue-600 w-full border-4 rounded">
                <div id = "listingsDiv" class="flex font-sans ui-sans-serif flex-wrap justify-content-around align-content-center">
                    ${props.listings.map(listing => `<h3 class=" w-24 h-6 m-1 border-2 rounded">$ ${listing.askingPrice}</h3>
                        <div class="w-24 h-6 m-1 pb-1 border-2 rounded text-center place-items-center" id = "listing#-${listing.id}">MLS# ${listing.id}</div>
                        <div class="w-24 h-6 m-1 pb-1 border-2 rounded text-center place-items-centerr">${listing.status}</div>
                        <div class="w-36 h-6 m-1 pb-1 border-2 rounded text-center place-items-center">${listing.listingAddress.address}</div>
                        <div class="w-24 h-6 m-1 pb-1 border-2 rounded text-center">${listing.listingAddress.city}</div>
                        <div class="w-24 h-6 m-1 pb-1 border-2 rounded text-center">${listing.listingAddress.state}</div>
                        <div class="w-24 h-6 m-1 pb-1 border-2 rounded text-center">${listing.listingAddress.zipCode}</div>
                        <div class="w-36 h-6 m-1 pb-1 border-2 rounded text-center">${listing.sellerAgent.firstName} ${listing.sellerAgent.lastName}</div>
                        <div class="w-48 h-6 m-1 pb-1 border-2 rounded text-center">${listing.sellerAgent.email}</div>
                        <p class="w-5/6 h-24 border-2 rounded text-justify">${listing.description}</p>
                        <div class="absolute-bottom-2 flex flex-row flex-wrap justify-between"><button id="submitOfferBtn" class="border-2 rounded h-6 w-36 my-2">Submit An Offer</button><button id="acceptOfferBtn" class="border-2 rounded h-6 w-36 my-2">Accept Offer</button></div>
                        
                </div>`
        ).join('')} 
                    
            </div>`
}



export function ListingEvent() {
    submitNewListing();
    // grabListingToEdit();
    requestListingDetailView();
    requestSchoolDetailView();

}///CLOSE LISTINGEVENT FUNCTION

function submitNewListing() {
    $('#newListingSubmit').click(function () {
        const NEW_LISTING_INFO = {

            address: $('#newListingAddress').val(),
            city: $('#newListingCity').val(),
            state: $('#newListingState').val(),
            zipcode: $('#newListingZipcode').val(),
            zipcode2: $('#newListingZipcode2').val(),
            bedrooms: $('#newListingBedrooms').val(),
            bathrooms: $('#newListingBathrooms').val(),
            halfBaths: $('#newListingHalfBaths').val(),
            sqFeet: $('#newListingSqFeet').val(),
            lotSize: $('#newListingLotSize').val(),
            yearBuilt: $('#newListingYearBuilt').val(),
            listAgent: $('#newListingListAgent').val()

        }
        const OPTIONS = {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(NEW_LISTING_INFO),
        }
        fetch(LISTINGS_URL, OPTIONS)
            .then(function (res) {
                console.log(res);
                createView("/listings")
            }).catch(function (reason) {
            console.log(reason);
            createView("/listings")
        });

    })
}///CLOSE OF SUBMITNEWPOST


//// grab strings for const below from search box, split on ""
const streetNumber = "1559";
const streetName = "kimberly dawn";
const city= "new bruanfels";
const state= "TX";

////CODE BELOW RETURNS WITH RESULT BASED ON CONST ABOVE, DETAILED VIEW ////
var url = `https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?address=${streetNumber}%20${streetName}%20${city}%20${state}`;

function requestListingDetailView() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.setRequestHeader("accept", "application/json");
    xhr.setRequestHeader("apikey",`${attomApiKey()}`);
    xhr.responseType = 'json';
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            console.log(xhr.response);
        }};

    xhr.send();
}
requestListingDetailView();

/// Need to grab property ID from the JSON returned from property detail function
const propertyID = "33497215"

function requestSchoolDetailView(){
    var url = `https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detailwithschools?attomid=${propertyID}`;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("apikey", `${attomApiKey()}`);
    xhr.responseType = 'json';
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            console.log(xhr.response);
        }};

    xhr.send();
}
requestSchoolDetailView();

