import createView from "../createView.js";
import {attomApiKey} from "../keys.js";
import {isLoggedIn} from "../auth.js";

const BASE_URL = "http://localhost:8080";

export default function ListingIndex(props) {
    console.log(props)
    requestListingDetailView(props.listing.listingAddress);
    // language=HTML
    return `
        <div id="listingPageDiv" data-id="${props.listing.id}"
             class="flex flex-col min-h-[calc(100vh-75px)] relative bg-primary">
            <img class="w-full"
                 src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                 alt="main listing photo">
            <div class="flex justify-start w-full ">
                ${populateListingFromDB(props.listing)}
                <div id="ApiDetails" class="w-full"></div>
            </div>
            <div class="flex mx-auto">
                <button id="viewOffersBtn" class="hidden p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction">View Offers</button>
                <button id="editListing" class="p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction">Edit Offers</button>
            </div>
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
            <div class="m-1 pb-1 text-center">${listing.listingAddress.city}, ${listing.listingAddress.state}
                ${listing.listingAddress.zipCode}
            </div>
            <div class="m-1 pb-1 text-center">${listing.sellerAgent.firstName} ${listing.sellerAgent.lastName}</div>
            <div class="m-1 pb-1 text-center">${listing.sellerAgent.email}</div>
            <p class="w-full text-justify">${listing.description}</p>
        </div>`
};

const populateDetailsFromApi = (apiObject) => {
    console.log(apiObject);
    const html = `
    <div class="m-1 pb-1 text-center place-items-center" id = "apiSqFt">SqFt: ${apiObject.property[0].building.size.bldgsize}</div>
    <div class="flex m-1 pb-1 text-center justify-around items-center" id = "apiBaths"><svg class="flex mx-1 w-[15px] h-[15px] items-center" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M32 384c0 28.32 12.49 53.52 32 71.09V496C64 504.8 71.16 512 80 512h32C120.8 512 128 504.8 128 496v-15.1h256V496c0 8.836 7.164 16 16 16h32c8.836 0 16-7.164 16-16v-40.9c19.51-17.57 32-42.77 32-71.09V352H32V384zM496 256H96V77.25C95.97 66.45 111 60.23 118.6 67.88L132.4 81.66C123.6 108.6 129.4 134.5 144.2 153.2C137.9 159.5 137.8 169.8 144 176l11.31 11.31c6.248 6.248 16.38 6.248 22.63 0l105.4-105.4c6.248-6.248 6.248-16.38 0-22.63l-11.31-11.31c-6.248-6.248-16.38-6.248-22.63 0C230.7 33.26 204.7 27.55 177.7 36.41L163.9 22.64C149.5 8.25 129.6 0 109.3 0C66.66 0 32 34.66 32 77.25v178.8L16 256C7.164 256 0 263.2 0 272v32C0 312.8 7.164 320 16 320h480c8.836 0 16-7.164 16-16v-32C512 263.2 504.8 256 496 256z"/></svg>Baths: ${apiObject.property[0].building.rooms.bathsfull}</div>
    <div class="flex m-1 pb-1 text-center justify-around items-center" id = "apiBeds"><svg class="flex mx-1 w-[15px] h-[15px] items-center" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M176 288C220.1 288 256 252.1 256 208S220.1 128 176 128S96 163.9 96 208S131.9 288 176 288zM544 128H304C295.2 128 288 135.2 288 144V320H64V48C64 39.16 56.84 32 48 32h-32C7.163 32 0 39.16 0 48v416C0 472.8 7.163 480 16 480h32C56.84 480 64 472.8 64 464V416h512v48c0 8.837 7.163 16 16 16h32c8.837 0 16-7.163 16-16V224C640 170.1 597 128 544 128z"/></svg>Beds: ${apiObject.property[0].building.rooms.beds ?? 2}</div>
    <div class="m-1 pb-1 text-center place-items-center" id = "apiParkingType">Parking: ${apiObject.property[0].building.parking.garagetype}</div>
    <div class="m-1 pb-1 text-center place-items-center" id = "apiParkingSpace">Spaces: ${apiObject.property[0].building.parking.prkgSpaces}</div>
    <div class="flex m-1 pb-1 text-center justify-around items-center" id = "apiAC"><svg class="flex mx-1 w-[15px] h-[15px] items-center" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M159.1 322.9l-.0002-18.92C159.1 295.1 152.9 287.1 144 287.1c-8.875 0-15.1 7.115-15.1 15.99L128 322.9c-22 7.875-35.25 30.38-31.25 53.38C100.6 399.4 120.6 416.1 144 416.1c23.37 0 43.37-16.71 47.25-39.83C195.2 353.3 181.1 330.8 159.1 322.9zM255.1 112C255.1 50.13 205.9 0 144 0C82.13 0 32 50.13 32 112v166.5C12.25 303.3 0 334 0 368C0 447.5 64.5 512 144 512c79.5 0 143.1-64.5 143.1-144c0-34-12.25-64.88-32-89.5V112zM219.9 393.4C208.1 426.1 178.4 447.1 144 447.1c-34.38 0-65-21.84-75.88-54.59C57.25 360.8 68.5 324.9 96 304.3V112C96 85.5 117.5 64 144 64c26.5 0 47.1 21.5 47.1 48v192.3C219.5 324.9 230.7 360.8 219.9 393.4zM499.1 343c-13.77-11.03-33.92-8.75-44.97 5L448 356.8V64c0-17.69-14.33-32-32-32s-32 14.31-32 32v292.8L376.1 348c-11.03-13.81-31.19-16.03-44.97-5c-13.81 11.06-16.05 31.19-5 45l64 80C397.1 475.6 406.3 480 416 480s18.92-4.406 24.98-12l64-80C516 374.2 513.8 354.1 499.1 343z"/></svg>A/C: ${apiObject.property[0].utilities.coolingtype}</div>
    <div class="flex m-1 pb-1 text-center justify-around place-items-center" id = "apiHeat"><svg class="flex mx-1 w-[15px] h-[15px] items-center" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M159.1 322.9V112C159.1 103.1 152.9 96 144 96C135.1 96 128 103.1 128 112v210.9c-22 7.875-35.25 30.38-31.25 53.38C100.6 399.4 120.6 416.1 144 416.1c23.37 0 43.37-16.71 47.25-39.83C195.2 353.3 181.1 330.8 159.1 322.9zM255.1 112C255.1 50.13 205.9 0 144 0C82.13 0 32 50.13 32 112v166.5C12.25 303.3 0 334 0 368C0 447.5 64.5 512 144 512c79.5 0 143.1-64.5 143.1-144c0-34-12.25-64.88-32-89.5V112zM219.9 393.4C208.1 426.1 178.4 447.1 144 447.1c-34.38 0-65-21.84-75.88-54.59C57.25 360.8 68.5 324.9 96 304.3V112c0-26.5 21.5-48.01 48-48.01c26.5 0 47.1 21.51 47.1 48.01v192.3C219.5 324.9 230.7 360.8 219.9 393.4zM504.1 124l-64-80c-12.12-15.19-37.84-15.19-49.97 0l-64 80c-11.05 13.81-8.812 33.94 5 45c13.75 11.03 33.94 8.781 44.97-5L384 155.2V448c0 17.69 14.33 32 32 32s32-14.31 32-32V155.2L455 164c6.312 7.906 15.61 12 25 12c7.016 0 14.08-2.281 19.97-7C513.8 157.9 516 137.8 504.1 124z"/></svg>Heat: ${apiObject.property[0].utilities.heatingtype}</div>
    <div class="flex m-1 pb-1 text-center justify-around items-center" id = "apiRoof"><svg class="flex mx-1 w-[15px] h-[15px] items-center" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M623.5 164C638.1 172.6 644.6 192.1 635.1 207.5C627.4 222.1 607.9 228.6 592.5 219.1L319.1 68.61L47.54 219.1C32.09 228.6 12.61 222.1 4.025 207.5C-4.558 192.1 1.008 172.6 16.46 164L304.5 4.027C314.1-1.342 325.9-1.342 335.5 4.027L623.5 164zM279.1 200C279.1 177.9 297.9 160 319.1 160C342.1 160 359.1 177.9 359.1 200C359.1 222.1 342.1 240 319.1 240C297.9 240 279.1 222.1 279.1 200zM103.1 296C103.1 273.9 121.9 256 143.1 256C166.1 256 183.1 273.9 183.1 296C183.1 318.1 166.1 336 143.1 336C121.9 336 103.1 318.1 103.1 296V296zM535.1 296C535.1 318.1 518.1 336 495.1 336C473.9 336 455.1 318.1 455.1 296C455.1 273.9 473.9 256 495.1 256C518.1 256 535.1 273.9 535.1 296zM226.9 491.4L199.1 441.5V480C199.1 497.7 185.7 512 167.1 512H119.1C102.3 512 87.1 497.7 87.1 480V441.5L61.13 491.4C54.84 503 40.29 507.4 28.62 501.1C16.95 494.8 12.58 480.3 18.87 468.6L56.74 398.3C72.09 369.8 101.9 352 134.2 352H153.8C170.1 352 185.7 356.5 199.2 364.6L232.7 302.3C248.1 273.8 277.9 255.1 310.2 255.1H329.8C362.1 255.1 391.9 273.8 407.3 302.3L440.8 364.6C454.3 356.5 469.9 352 486.2 352H505.8C538.1 352 567.9 369.8 583.3 398.3L621.1 468.6C627.4 480.3 623 494.8 611.4 501.1C599.7 507.4 585.2 503 578.9 491.4L551.1 441.5V480C551.1 497.7 537.7 512 519.1 512H471.1C454.3 512 439.1 497.7 439.1 480V441.5L413.1 491.4C406.8 503 392.3 507.4 380.6 501.1C368.1 494.8 364.6 480.3 370.9 468.6L407.2 401.1C405.5 399.5 404 397.6 402.9 395.4L375.1 345.5V400C375.1 417.7 361.7 432 343.1 432H295.1C278.3 432 263.1 417.7 263.1 400V345.5L237.1 395.4C235.1 397.6 234.5 399.5 232.8 401.1L269.1 468.6C275.4 480.3 271 494.8 259.4 501.1C247.7 507.4 233.2 503 226.9 491.4H226.9z"/></svg>Roof: ${apiObject.property[0].building.construction.roofcover}</div>
    <div class="m-1 pb-1 text-center place-items-center" id = "apiLot">Lot SqFt: ${apiObject.property[0].lot.lotsize2}</div>
    
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
        console.log(address)

        // let url = `https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?address=${address}`;
        fetch(`${BASE_URL}/api/houseInfo?address=${address}`, {
            method: "GET",
        }).then(response => response.json())
            .then(apiobject => console.log(apiobject))

        // const xhr = new XMLHttpRequest();
        // xhr.open("GET", url);
        //
        // xhr.setRequestHeader("accept", "application/json");
        // xhr.setRequestHeader("apikey", `${attomApiKey()}`);
        // xhr.responseType = 'json';
        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState === 4) {
        //         console.log(xhr.status);
        //         // console.log(xhr.response);
        //         populateDetailsFromApi(xhr.response);
        //     }
        // };
        //
        // xhr.send();
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
