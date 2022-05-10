import createView from "../createView.js";
import {getHeaders} from "../auth.js";

const LISTINGS_URL = "http://localhost:8080/api/listings";

export default function ListingIndex(props) {
    console.log("listingindex()")
}


$.ajax("/listingdata/homes.json")
    .done(onSuccess)
    .fail(onFail);

function onFail(jqXhr, status, error) {
    console.log(jqXhr);
    console.log(error);
}

function onSuccess(data, status) {
    console.log(status);
    console.log(data);

    data.forEach(function (home) {
        var listings = `

                    <div><a href="" class=""></a></div>
					<div class="grid grid-cols-4 gap-4 bg-slate-400">
										      
                            <div class="w-2 pt-2 flex">
                                <div class="homeAddress bg-slate-600">${home.address}</div>
                            </div>
                            
                            <div class="w-2 flex-initial">
                                <div class="city">${home.city}</div>
                            </div>
                            
                            <div class="w-2">
                                <div class="state">${home.state}</div>
                            </div>	
                            
                            <div class="">
                                <div class="zipcode">${home.zipcode}</div>
                            </div>
                            
                                <div class="zipcode-2">${home.zipcode2}</div>
                                <div class="bedrooms w-2">${home.bedrooms}</div>
                                <div class="halfBaths">${home.halfBaths}</div>
                                <div class="sqfeet">${home.sqFeet}</div>
                                <div class="lotSize">${home.lotSize}</div>
                                <div class="yearBuilt">${home.yearBuilt}</div>
                                <div class="footer d-flex justify-content-evenly"></div>
                                                          
                    </div>
                            
                       
                  
`;
        $('#listings').append(listings);
    })


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
