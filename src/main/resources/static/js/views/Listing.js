import createView from "../createView.js";
import { isLoggedIn } from "../auth.js";
import { clearStoredURI } from "../init.js";
import { uploadDocuments, getLoggedInUser, normalizeSentence, getUserRole } from "../utility.js";
import fetchData from "../fetchData.js";
import {getHeaders} from "../auth.js";

let listingId = null;
let sellerAgent = "";

export default function ListingIndex(props) {
    console.log(props)
    console.log(getLoggedInUser());

    if (props.listing === 404) {
        alert("No Listing Found At Address")
        createView("/")
    }
    requestListingDetailView(props.listing.listingAddress, props.listing.image_icons);
    sellerAgent = props.listing.sellerAgent.email;
    listingId = props.listing.id

    // language=HTML
    return `
        <div id="listingPageDiv" data-id="${props.listing.id}"
             class="content-height w-full font-medium">
            <div class="content-height w-full flex flex-col items-center justify-center md:flex-row">

                <div class="md:w-1/2">
                    ${populateCarousel(props.listing.house_images)}
                    <div id="listingImgUpload" class="flex justify-center">
                        <input type="file" id="uploadDocs" accept="image/*" class="hidden">
                        <button type="button" id="uploadBtn"
                                class="text-primary p-2 mx-1 my-2 rounded-md shadow-xl bg-callToAction text-primary font-medium">Upload
                            Images
                        </button>
                    </div>
                    <div class="p-2 text-center my-2">
                        ${props.listing.description}
                    </div>
                    <div class="flex p-2 text-center md:text-left">
                        ${populateListingInfo(props.listing)}
                    </div>
                </div>

                <div class="md:w-1/2 md:h-full">
                    <div>
                        <div id="agentProfile" data-id="${props.listing.sellerAgent.id}" class="flex flex-col items-center">
                            ${populateSellerAgentInfo(props.listing.sellerAgent)}
                        </div>
                        <div class="w-full flex flex-col justify-around">
                            <div id="ApiDetails" class="w-full md:flex md:flex-col md:items-center md:m-2">
                            </div>
                            <div id="apiSchoolInfo" class="hidden md:flex md:flex-col md:m-2"></div>
                        </div>

                        <div class="flex mx-auto justify-center">
                            <button type="button" id="viewOffersBtn"
                                    class="hidden text-primary p-2 mx-1 my-2 rounded-md shadow-xl text-primary font-medium bg-callToAction">
                                View Offers
                            </button>
                            <button type="button" id="editListing"
                                    class="hidden text-primary p-2 mx-1 my-2 rounded-md shadow-xl text-primary font-medium bg-callToAction">
                                Edit Listing
                            </button>
                        </div>

                    </div>

                </div>

            </div>
        </div>`
}

const populateCarousel = images => {
    //language=HTML
    let html = `
        <div id="houseImageCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="false">
            <div class="carousel-inner">`
    images.forEach((img, i) => {
        if (i === 0) {
            //language=HTML
            html += `
                <div class="carousel-item active">
                    <img src="${img}" class="d-block w-100" alt="Picture of House">
                </div>`
        } else {
            //language=HTML
            html += `
                <div class="carousel-item">
                    <img src="${img}" class="d-block w-100" alt="Picture of House">
                </div>`
        }
    })
    //language=HTML
    html += `</div>
    <button class="carousel-control-prev" type="button" data-bs-target="#houseImageCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next " type="button" data-bs-target="#houseImageCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
    </div>`

    return html;
}

const populateSellerAgentInfo = agentInfo => {
    console.log(agentInfo)
    //language=HTML
    return `
        <div class="w-[150px] h-[150px] m-1">
            <img class="my-1 rounded-full" src="${agentInfo.profileImageName}"
                 alt="Image of ${normalizeSentence(agentInfo.firstName)}">
        </div>
        <div class="m-1">
            <span>${normalizeSentence(agentInfo.firstName)}</span>
            <span>${normalizeSentence(agentInfo.lastName)}</span>
        </div>
        <div class="m-1">
            <span>${agentInfo.email}</span>
        </div>
        <div class="m-1">
            <a id="profileLink" class="mx-1 hover:text-callToAction hover:bg-primary">Click for Listing Agents Profile</a>
        </div>
    `
}

const populateListingInfo = listing => {
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
                <span class="md:mx-1">Physical Address:</span>
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
            <span class="w-[135px]">${normalizeSentence(propertyInfo.utilities.coolingtype)}</span>
        </div>
        <div class="flex m-1 pb-1 text-center justify-end items-center" id="apiHeat">
            <img src="${imageUrls[5]}" alt="Heat Icon" class="w-[15px] h-[15px] mx-3">
            <span class="w-[135px]">${normalizeSentence(propertyInfo.utilities.heatingtype)}</span>
        </div>
        <div class="flex m-1 pb-1 text-center justify-end items-center" id="apiRoof">
            <img src="${imageUrls[2]}" alt="Roof Icon" class="w-[15px] h-[15px] mx-3">
            <span class="w-[135px]">${normalizeSentence(propertyInfo?.building?.construction?.roofcover?.split(" ")[1]) ?? "Not Listed"}</span>
        </div>
        <div class="flex m-1 pb-1 text-center justify-end items-center " id="apiLot">
            <img src="${imageUrls[0]}" alt="Lot Icon" class="w-[15px] h-[15px] mx-3">
            <span class="w-[135px]">Lot SqFt: ${propertyInfo.lot.lotsize2}</span>
        </div>
    `

    $("#ApiDetails").append(html);
}

const populateSchoolInfo = details => {
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
        createView({
            offers: {
                offers: `/api/offers/findOffers/${listingId}`,
                listing: `/api/listings/${listingId}`,
                user: `/api/users/searchByEmail?email=${getLoggedInUser()}`
            },
        });
    });
}

const editListing = _ => {
    $('#editListing').click(_ => {
        let listingId = $('#listingPageDiv').attr('data-id');
        createView({realtorListing: {realtorListing: `/api/listings/${listingId}`}})
    });
}

const loadAgentProfile = _ => {
    $("#agentProfile").click(function (e) {
        if (e.target.id === 'profileLink') {
            const userId = $(this).data("id")
            createView({profile: {profile: `/api/users/${userId}`}})
        }
    })
}


const requestListingDetailView = (listingAddress, imageUrls) => {
    const address = encodeURIComponent(`${listingAddress.address}, ${listingAddress.city}, ${listingAddress.state}`);

    fetchData({properties: `/api/houseInfo?address=${address}`}, getHeaders())
        .then(response => {
            console.log(response)
            populateDetailsFromApi(response.properties.property[0], imageUrls)
        })
}

const requestSchoolDetailView = propertyId => {
    fetchData({schoolInfo: `/api/houseInfo/schoolInfo?propertyId=${propertyId}`}, getHeaders())
        .then(response => {
            console.log(response)
            populateSchoolInfo(response.schoolInfo)
        })
}

const isListingActive = listing => {
    let listStat = listing.listing.listingStatus;
    return listStat === "ACTIVE" || listStat === "PENDING";
}

const toggleButtonDisplay = _ => {
    $('#viewOffersBtn').removeClass('hidden');
    $('#editListing').removeClass('hidden');
    $('#listingImgUpload').removeClass('hidden');
    if (sellerAgent === getLoggedInUser() || getUserRole() === "ADMIN") {
        $('#editListing').removeClass('hidden');
        $('#listingImgUpload').removeClass('hidden');
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
    loadAgentProfile();
}
