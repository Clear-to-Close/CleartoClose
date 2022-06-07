import {updateUserProfile} from "./updateProfile.js";
import {uploadDocuments, normalizeSentence, formatPhoneNumber, getLoggedInUser} from "../utility.js";
import createView from "../createView.js";

export default function ProfilePage(props) {
    console.log(props);
    //language=html
    return `
        <div class="content-height bg-slate-200 opacity-95 flex justify-center">
            <div id="updateProfileForm" class="flex flex-col items-center w-3/4 lg:w-full lg:m-2">
                <div class="w-full flex flex-col md:flex-row xl:w-3/4">
                    <div class="hidden" id="profile-error">
                        ${checkForRealtor(props.profile.realtor)}
                    </div>
                    <div class="w-full flex flex-col items-center my-2 md:w-1/2">
                        <img class="my-1 rounded-full w-[150px] h-[200px]" src="${props.profile.profileImageName}"
                             alt="Image of ${normalizeSentence(props.profile.firstName)} ${normalizeSentence(props.profile.lastName)}">
                        <div class="w-full flex flex-col items-center">
                            <input type="file" id="uploadPreApprovalInput" class="hidden">
                            <button id="uploadPreApprovalBtn" data-id="${props.profile.id}" type="button" ${getLoggedInUser() === props.profile.email ? "" : "disabled"}
                                    class="my-1 p-1 w-1/2 rounded-md shadow-xl bg-callToAction font-medium">
                                Upload Pre-Approval
                            </button>
                            <input type="file" id="uploadProfileImageInput" accept="image/*" class="hidden">
                            <button id="uploadProfileImageBtn" data-id="${props.profile.id}" type="button" ${getLoggedInUser() === props.profile.email ? "" : "disabled"}
                                    class="my-1 p-1 w-1/2 rounded-md shadow-xl bg-callToAction font-medium">
                                Upload Profile Picture
                            </button>
                        </div>
                    </div>
                    <div class="w-full my-2 flex flex-col items-center justify-between md:w-1/2">
                        ${populateUserDetails(props.profile)}
                    </div>
                </div>
                <div id="profileOffers" class="${getLoggedInUser() === props.profile.email ? 'flex' : 'hidden'} flex-col my-2 w-full xl:w-3/4">
                    <div class="text-center text-4xl my-2">My Offers</div>
                    <div id="offers" class="w-full grid grid-col-1 gap-2 center md:grid-cols-2 lg:grid-cols-3">
                        ${populateProfileOffers(props.profile.userOffers)}
                    </div>
                </div>
            </div>
        </div>
    `
}

const populateUserDetails = user => {
    //language=HTML
    return `
        <div class="text-center text-xl">${normalizeSentence(user.firstName)} ${normalizeSentence(user.lastName)}</div>
        <div class="text-center text-xl" data-username="${user.username}">
            ${user.username}
        </div>
        <div class="text-center text-xl">${user.email}</div>
        <div class="text-center text-xl">${formatPhoneNumber(user.phoneNumber)}</div>
        ${populateAddress(user.userAddress)}
        <button id="btnUpdateProfile" type="button" ${getLoggedInUser() === user.email ? "" : "disabled"}
                class="w-3/4 p-2 rounded-md shadow-xl bg-callToAction font-medium">
            Update Profile
        </button>
    `
}

const populateAddress = address => {
    if (address === null) {
        return `<div class="text-center text-xl">Address Not Listed</div>`
    } else {
        return `<div class="text-center text-xl">${normalizeSentence(address.address)}</div>
        <div class="text-center text-xl">${normalizeSentence(address.city)}, ${normalizeSentence(address.state)}
            ${address.zipCode}
        </div>`
    }
}

function populateProfileOffers(offers) {
    let html = "";

    offers.forEach(offer => {
        //language=html
        html += `
            <div id="offer" data-id="${offer.listing.id}"
                 class="flex flex-col bg-slate-200 justify-evenly m-1 border-2 border-callToAction rounded-md shadow-xl">
                <div class=" flex flex-col items-center bg-callToAction">
                    <span class="text-center text-xl">
                        ${normalizeSentence(offer.listing.listingAddress.address)}
                    </span>
                    <span class="text-center text-xl">${normalizeSentence(offer.listing.listingAddress.city)}
                        , ${normalizeSentence(offer.listing.listingAddress.state)} ${offer.listing.listingAddress.zipCode}
                    </span>
                </div>
                <div class="flex flex-col p-3">
                    <div class="m-1 flex justify-between">
                        <span>Amount Offered:</span>
                        <span>\$${offer.offerAmount}</span>
                    </div>
                    <div id="closingCosts" class="m-1 flex justify-between">
                        <span>Closing Costs:</span>
                        <span>\$${offer.closingCosts}</span>
                    </div>
                    <div class="m-1 flex justify-between">
                        <span>Close Date:</span>
                        <span>${offer.closingDate}</span>
                    </div>
                    <div class="m-1 flex justify-between">
                        <span>Home Warranty:</span>
                        <span>${normalizeSentence(offer.homeWarranty)}</span>
                    </div>
                    <div class="m-1 flex justify-between">
                        <span>Loan Type:</span>
                        <span>${offer.loanType}</span>
                    </div>
                    <div class="m-1 flex justify-between">
                        <span>Waive Appraisal:</span>
                        <span>${normalizeSentence(offer.appraisalWaiver)}</span>
                    </div>
                    <div class="m-1 flex justify-between">
                        <span>Paying for Survey:</span>
                        <span>${normalizeSentence(offer.survey)}</span>
                    </div>
                </div>
            </div>
        `
    })
    return html;
}

const showListing = _ => {
    $("#offers").click(function (e) {
        let listingId = null;
        if (e.target.closest('#offer')) {
            listingId = e.target.closest('#offer').getAttribute("data-id");
        }

        if (listingId === null) {
            return;
        } else {
            createView({listing: {listing: `/api/listings/${listingId}`}});
        }
    })
}

function submitDocument() {
    let userId;
    $("#uploadPreApprovalBtn").click(function () {
        userId = $(this).data("id");
        $("#uploadPreApprovalInput").click()
    })
    $("#uploadProfileImageBtn").click(function () {
        userId = $(this).data("id");
        $("#uploadProfileImageInput").click()
    })

    $("#uploadPreApprovalInput").on("change", _ => {
        const file = document.getElementById("uploadPreApprovalInput")
        uploadDocuments('uploadPreApproval', userId, file)
        $("#uploadPreApprovalInput").val("")
    })
    $("#uploadProfileImageInput").on("change", _ => {
        const file = document.getElementById("uploadProfileImageInput")
        uploadDocuments('uploadProfileImage', userId, file)
        $("#uploadProfileImageInput").val("")
    })
}

const checkForRealtor = realtorArray => {
    if (realtorArray.length === 0) {

    }
}

export function ProfileEvents() {
    updateUserProfile();
    submitDocument();
    showListing();
}
