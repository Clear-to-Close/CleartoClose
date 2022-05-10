import createView from "../createView.js";
import {getHeaders} from "../auth.js";

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
        <div class="flex text-center justify-center bg-blue-600 w-full border-4 rounded">
                <div id = "listingsDiv" class="flex font-sans ui-sans-serif flex-wrap">
                    ${props.listings.map(listing => `<h3 class=" w-24 h-6 m-1 border-2 rounded">$ ${listing.askingPrice}</h3>
                        <div class="w-6 h-6" id = "listing#-${listing.id}">MLS# ${listing.id}</div>
                        <div class="w-6 h-6">${listing.status}</div>
                        <div>${listing.listingAddress.address}</div>
                        <div>${listing.listingAddress.city}</div>
                        <div>${listing.listingAddress.state}</div>
                        <div>${listing.listingAddress.zipCode}</div>
                        <p>${listing.description}</p>
                        <div>${listing.sellerAgent.firstName} ${listing.sellerAgent.lastName}</div>
                        <div>${listing.sellerAgent.email}</div>
                </div>`
        ).join('')} 
            </div>`
}



export function ListingEvent() {
    submitNewListing();
    // grabListingToEdit();

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


// export function NotSureWhat (){
//     $.ajax("/listingdata/homes.json")
//         .done(onSuccess)
//         .fail(onFail);
//
//     function onFail(jqXhr, status, error) {
//         console.log(jqXhr);
//         console.log(error);
//     }
//
//     function onSuccess(data, status) {
//         console.log(status);
//         console.log(data);
//
//         data.forEach(function (home) {
//             var listings = `
// 					<div class="card-body">
// 						<div class="homeAddress col-8">${home.address}</div>
// 						<div class="city col-4">${home.city}</div>
// 						<div class="state col-4">${home.state}</div>
// 						<div class="zipcode col-4">${home.zipcode}</div>
// 						<div class="zipcode-2 col-4">${home.zipcode-2}</div>
// 						<div class="bedrooms col-3">${home.bedrooms}</div>
// 						<div class="halfBaths col-3">${home.halfBaths}</div>
// 						<div class="sqfeet col-3">${home.sqFeet}</div>
// 						<div class="lotSize col-3">${home.lotSize}</div>
// 						<div class="yearBuilt col-3">${home.yearBuilt}</div>
// 						<div class="footer d-flex justify-content-evenly">
//
// 						</div>
// 					</div>
// </div>
// `;
//             $('#listings').append(listings);
//         })
//
//
//     }
//
// }


////CODE BELOW RETURNS 200 FOR API CALL ON ATTOM API
// var url = "https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?attomid=164898522";
//
// function requestListing() {
//     const xhr = new XMLHttpRequest();
//     xhr.open("GET", url);
//
//     xhr.setRequestHeader("accept", "application/json");
//     xhr.setRequestHeader("apikey", "2b1e86b638620bf2404521e6e9e1b19e");
//     xhr.responseType = 'json';
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4) {
//             console.log(xhr.status);
//             console.log(xhr.response);
//         }};
//
//     xhr.send();
// }
// requestListing();
