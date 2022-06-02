import createView from "../createView.js";
import {isLoggedIn} from "../auth.js";
import {clearStoredURI} from "../init.js";
import {uploadDocuments, getLoggedInUser, getMessage, normalizeSentence, normalizeWords} from "../utility.js";
import fetchData from "../fetchData.js";
import {getHeaders} from "../auth.js";

let listingId = null;
let sellerAgent = "";

export default function ListingIndex(props) {
    console.log(props)
    requestListingDetailView(props.listing.listingAddress, props.listing.image_icons);
    sellerAgent = props.listing.sellerAgent.email;
    listingId = props.listing.id
    // language=HTML
    return `
        <div id="listingPageDiv" data-id="${props.listing.id}"
             class="bg-cover content-height flex flex-col relative md:flex-row font-medium">
            <div class="content-height w-full flex flex-col items-center justify-center">
                <div class="bg-slate-200 opacity-95 border-slate-300 border-2 shadow-xl rounded-md md:flex ">
                    <div class="md:flex md:flex-col md:w-1/2">
                        <div class="w-full">
                            <img class="w-full"
                                 src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                                 alt="main listing photo">
                        </div>
                        <div>
                            <form id="listingImgUpload" class="flex flex-col items-center">
                                <input type="file" id="uploadDocs" accept="image/*" class="hidden">
                                <button type="button" id="uploadBtn" class="text-primary p-2 mx-1 my-2 rounded-md shadow-xl bg-callToAction text-primary font-medium">Upload Documents</button>
                            </form>
                        </div>
                        <div class="p-2 text-center my-2">
                            ${props.listing.description}
                        </div>
                        <div class="hidden md:flex md:p-2">
                            ${populateListingFromDB(props.listing)}
                        </div>
                    </div>
                    
                    <div class="md:content-height md:w-1/2 md:flex md:items-center md:flex-col">
                        <div class="flex w-full md:grow">
                            <div class="md:hidden">${populateListingFromDB(props.listing)}</div>
                            <div class="w-full flex flex-col justify-around">
                                <div id="ApiDetails" class="w-full md:flex md:flex-col md:items-center"></div>
                                <div id="apiSchoolInfo" class="hidden md:flex md:flex-col md:p-2"></div>
                            </div>
                        </div>
                        <div class="flex mx-auto justify-center">
                            <button type="button" id="viewOffersBtn" class="hidden text-primary p-2 mx-1 my-2 rounded-md shadow-xl text-primary font-medium bg-callToAction">
                                View Offers
                            </button>
                            <button type="button" id="editListing" class="hidden text-primary p-2 mx-1 my-2 rounded-md shadow-xl text-primary font-medium bg-callToAction">
                                Edit Listing
                            </button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>`
}

const populateListingFromDB = listing => {
    //language=HTML
    return `
        <div class="h-full w-full">
            <div class="m-1 pb-1">
                Asking Price: ${listing.askingPrice}
            </div>
            <div class="m-1 pb-1" id="listing#-${listing.id}">
                MLS#: ${listing.id}
            </div>
            <div class="m-1 pb-1">
                Status: ${listing.listingStatus}
            </div>
            <div class="m-1 pb-1 flex flex-col md:flex-row">
                <span class="mx-1">Physical Address:</span>
                <div class="md:flex md:flex-col md:mx-1">
                    <span>${listing.listingAddress.address}</span>
                    <span>${listing.listingAddress.city}, ${listing.listingAddress.state}
                ${listing.listingAddress.zipCode}</span>
                </div>
            </div>
            <div class="m-1 pb-1 flex flex-col md:flex-row">
                <span class="mx-1">Selling Realtor:</span>
                <span class="mx-1">${listing.sellerAgent.firstName} ${listing.sellerAgent.lastName}</span>
            </div>
            <div class="m-1 pb-1 flex flex-col md:flex-row">
                <span class="mx-1">Realtor Email:</span>
                <span class="mx-1">${listing.sellerAgent.email}</span>
            </div>
        </div>`
};

const populateDetailsFromApi = (propertyInfo, imageUrls) => {
    console.log(propertyInfo)
    requestSchoolDetailView(propertyInfo.identifier.Id);
    //language=HTML
    const html = `
        <div class="flex m-1 pb-1 text-center justify-end items-center" id="apiSqFt">
            <img src="${imageUrls[0]}" alt="Square Foot Icon" class="w-[15px] h-[15px] mx-3">
            <span class="w-[135px]">SqFt: ${propertyInfo.building.size.bldgsize}</span>
        </div>
        <div class="flex m-1 pb-1 text-center justify-end items-center" id="apiBaths">
            <img src="${imageUrls[0]}" alt="Bath Icon" class="w-[15px] h-[15px] mx-3">
            <span class="w-[135px]">${propertyInfo.building.rooms.bathsfull}</span>
        </div>
        <div class="flex m-1 pb-1 text-center justify-end items-center" id="apiBeds">
            <img src="${imageUrls[1]}" alt="Bed Icon" class="w-[15px] h-[15px] mx-3">
            <span class="w-[135px]">${propertyInfo.building.rooms.beds ?? 2}</span>
        </div>
        <div class="flex m-1 pb-1 text-center justify-end items-center" id="apiParkingType">
            <img src="${imageUrls[3]}" alt="Parking Icon" class="w-[15px] h-[15px] mx-3">
            <span class="w-[135px]">${propertyInfo.building.parking.garagetype ?? "Not Listed"}</span>
        </div>
        <div class="flex m-1 pb-1 text-center justify-end items-center" id="apiAC">
            <img src="${imageUrls[4]}" alt="AC Icon" class="w-[15px] h-[15px] mx-3">
            <span class="w-[135px]">${normalizeWords(propertyInfo.utilities.coolingtype)}</span>
        </div>
        <div class="flex m-1 pb-1 text-center justify-end items-center" id="apiHeat">
            <img src="${imageUrls[5]}" alt="Heat Icon" class="w-[15px] h-[15px] mx-3">
            <span class="w-[135px]">${normalizeWords(propertyInfo.utilities.heatingtype)}</span>
        </div>
        <div class="flex m-1 pb-1 text-center justify-end items-center" id="apiRoof">
            <img src="${imageUrls[2]}" alt="Roof Icon" class="w-[15px] h-[15px] mx-3">
            <span class="w-[135px]">${normalizeWords(propertyInfo?.building?.construction?.roofcover?.split(" ")[1]) ?? "Not Listed"}</span>
        </div>
        <div class="flex m-1 pb-1 text-center justify-end items-center " id="apiLot">
            <img src="${imageUrls[0]}" alt="Lot Icon" class="w-[15px] h-[15px] mx-3">
            <span class="w-[135px]">Lot SqFt: ${propertyInfo.lot.lotsize2}</span>
        </div>
    `

    $("#ApiDetails").append(html);
}

const populateSchoolInfoDetails = details => {
    const [primarySchool, secondarySchool, highSchool] = findSchool(details.property[0].school)
    //language=HTML
    let html = `
        <div class="text-center m-1 p-1">
            ${normalizeSentence(details.property[0].schoolDistrict.districtname) ?? "Not Listed"}
        </div>
        <div class="flex m-1 pb-1">
            <div>Primary School:</div>
            <div class="grow">
                <div class="text-right">${normalizeSentence(primarySchool.InstitutionName) ?? "Not Listed"}</div>
                <div class="text-right">Distance: ${primarySchool.distance ?? "Not Listed"}</div>
            </div>
        </div>
        <div class="flex m-1 pb-1">
            <div>Secondary School:</div>
            <div class="grow">
                <div class="text-right">${normalizeSentence(secondarySchool.InstitutionName) ?? "Not Listed"}</div>
                <div class="text-right">Distance: ${secondarySchool.distance ?? "Not Listed"}</div>
            </div>
        </div>
        <div class="flex m-1 pb-1">
            <div>High School:</div>
            <div class="grow">
                <div class="text-right">${normalizeSentence(highSchool.InstitutionName) ?? "Not Listed"}</div>
                <div class="text-right">Distance: ${highSchool.distance ?? "Not Listed"}</div>
            </div>
        </div>
    `
    $("#apiSchoolInfo").append(html);
}

const findSchool = (schoolList) => {
    const schools = [];
    schoolList.forEach(school => {
        if (parseInt(school.gradelevel1hitext) === 5 && !schools[0]) {
            schools[0] = school;
        } else if (parseInt(school.gradelevel1hitext) === 8 && !schools[1]) {
            schools[1] = school;
        } else if (parseInt(school.gradelevel1hitext) === 12 && !schools[2]) {
            schools[2] = school;
        }
    })
    return schools;
}

const submitImages = _ => {
    $("#uploadBtn").click(_ => {
        $("#uploadDocs").click()
    })
    $("#uploadDocs").on("change", _ => {
        const file = document.getElementById("uploadDocs")
        uploadDocuments('uploadListingImg', listingId, file)
        $("#uploadDocs").val("")
    })
}

const viewOffers = _ => {
    $("#viewOffersBtn").click(_ => {
        clearStoredURI();
        let listingId = $('#listingPageDiv').attr('data-id');
        createView(`/offers/api/offers/findOffers/${listingId}`);
    });
}

const editListing = _ => {
    $('#editListing').click(_ => {
        let listingId = $('#listingPageDiv').attr('data-id');
        createView(`/realtorListing/api/listings/${listingId}`)
    });
}


const requestListingDetailView = (listingAddress, imageUrls) => {
    const address = encodeURIComponent(`${listingAddress.address}, ${listingAddress.city}, ${listingAddress.state}`);

    const request = {
        method: "GET",
        headers: getHeaders()
    }

    fetchData({
        properties: `/api/houseInfo?address=${address}`
    }, request)
        .then(response => {
            console.log(response)
            populateDetailsFromApi(response.properties.property[0], imageUrls)
        })
}

const requestSchoolDetailView = propertyId => {
    fetchData({schoolInfo: `/api/houseInfo/schoolInfo?propertyId=${propertyId}`}, getHeaders())
        .then(response => {
            console.log(response)
            populateSchoolInfoDetails(response.schoolInfo)
        })
}

const isListingActive = listing => {
    let listStat = listing.listing.listingStatus;
    return listStat === "ACTIVE" || listStat === "PENDING";
}

const toggleButtonDisplay = _ => {
    if (sellerAgent === getLoggedInUser()) {
        $('#editListing').removeClass('hidden');
        // $('#listingImgUpload').removeClass('hidden');
    }
    if (isLoggedIn()) {
        $('#viewOffersBtn').removeClass('hidden');
    }
}

export function ListingEvent() {
    toggleButtonDisplay();
    viewOffers();
    editListing();
    submitImages();
}
