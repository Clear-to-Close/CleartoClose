import createView from "../createView.js";
import {getHeaders} from "../auth.js";
import {attomApiKey} from "../keys.js";

const LISTINGS_URL = "http://localhost:8080/api/listings";


export default function ListingIndex(props) {
    console.log(props);
    requestListingDetailView(props.listings.listingAddress);
    // language=HTML
    return `
		<div id="listingPageDiv" class="flex flex-col h-[calc(100vh-75px)]">
			<img class="w-full h-1/2"
			     src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
			     alt="main listing photo">
			<div class="flex justify-start bg-blue-600 w-full border-4 rounded h-1/2">
				<div id="listingsDiv"
				     class="flex flex-row font-sans ui-sans-serif flex-wrap justify-content-around align-content-start">
					${populateListingFromDB(props.listings)}
					<div id="ApiDetails"></div>

				</div>
			</div>`
}

const populateListingFromDB = (listings) => {
    return listings.map(listing => `<h3 class=" w-24 h-6 m-1 border-2 rounded">$ ${listing.askingPrice}</h3>
    <div class="w-24 h-6 m-1 pb-1 border-2 rounded text-center" id = "listing#-${listing.id}">MLS# ${listing.id}</div>
    <div class="w-24 h-6 m-1 pb-1 border-2 rounded text-center">${listing.status}</div>
    <div class="w-36 h-6 m-1 pb-1 border-2 rounded text-center">${listing.listingAddress.address}</div>
    <div class="w-24 h-6 m-1 pb-1 border-2 rounded text-center">${listing.listingAddress.city}</div>
    <div class="w-24 h-6 m-1 pb-1 border-2 rounded text-center">${listing.listingAddress.state}</div>
    <div class="w-24 h-6 m-1 pb-1 border-2 rounded text-center">${listing.listingAddress.zipCode}</div>
    <div class="w-36 h-6 m-1 pb-1 border-2 rounded text-center">${listing.sellerAgent.firstName} ${listing.sellerAgent.lastName}</div>
    <div class="w-48 h-6 m-1 pb-1 border-2 rounded text-center">${listing.sellerAgent.email}</div> 
    <p class="w-full h-48 border-2 rounded text-justify">${listing.description}</p> 
    <div class="absolute-bottom-2 flex flex-row flex-wrap justify-between"><button id="viewOffersBtn" class="border-2 rounded h-6 w-36 my-2">View Offers</button></div>

    </div>`
    ).join('')
};

const populateDetailsFromApi = (apiObject) => {
    console.log(apiObject);
    const html = `
    <div class="w-60 h-6 m-1 pb-1 border-2 rounded text-center place-items-center" id = "apiSqFt">SqFt: ${apiObject.property[0].building.size.bldgsize}</div>
    <div class="w-60 h-6 m-1 pb-1 border-2 rounded text-center place-items-center" id = "apiBaths">Baths: ${apiObject.property[0].building.rooms.bathsfull}</div>
    <div class="w-60 h-6 m-1 pb-1 border-2 rounded text-center place-items-center" id = "apiBeds">Beds: ${apiObject.property[0].building.rooms.beds ?? 2}</div>
    <div class="w-60 h-6 m-1 pb-1 border-2 rounded text-center place-items-center" id = "apiParkingType">Parking: ${apiObject.property[0].building.parking.garagetype}</div>
    <div class="w-60 h-6 m-1 pb-1 border-2 rounded text-center place-items-center" id = "apiParkingSpace">Spaces: ${apiObject.property[0].building.parking.prkgSpaces}</div>
    <div class="w-60 h-6 m-1 pb-1 border-2 rounded text-center place-items-center" id = "apiAC">A/C: ${apiObject.property[0].utilities.coolingtype}</div>
    <div class="w-60 h-6 m-1 pb-1 border-2 rounded text-center place-items-center" id = "apiHeat">Heat: ${apiObject.property[0].utilities.heatingtype}</div>
    <div class="w-60 h-6 m-1 pb-1 border-2 rounded text-center place-items-center" id = "apiRoof">Roof: ${apiObject.property[0].building.construction.roofcover}</div>
    <div class="w-60 h-6 m-1 pb-1 border-2 rounded text-center place-items-center" id = "apiLot">Lot SqFt: ${apiObject.property[0].lot.lotsize2}</div>
    
    </div>`
    $("#ApiDetails").append(html);
}


export function ListingEvent() {
    $("#viewOffersBtn").click(function (event) {
        event.preventDefault();
            createView('/offers');
    });


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


////CODE BELOW RETURNS WITH RESULT BASED ON CONST ABOVE, DETAILED VIEW ////
function requestListingDetailView(listingAddress) {
    //// grab strings for const below from search box, split on ""
    const streetNumber = "1559";
    const streetName = "kimberly dawn";
    const city = "new braunfels";
    const state = "TX";

    let url = `https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?address=${streetNumber}%20${streetName}%20${city}%20${state}`;
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

