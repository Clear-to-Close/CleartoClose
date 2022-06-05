import {updateUserProfile} from "./updateProfile.js";
import {uploadDocuments, normalizeSentence} from "../utility.js";
import createView from "../createView.js";

export default function ProfilePage(props) {
    console.log(props);
    //language=html
    return `
        <div  class="content-height bg-slate-200 opacity-95 flex justify-center">
            <div id="updateProfileForm" class="flex flex-col items-center w-3/4 lg:w-full lg:m-2">
                <div class="w-full flex flex-col md:flex-row xl:w-3/4">
                    <div class="w-full flex flex-col items-center my-2 md:w-1/2">
                        <img class="my-1 rounded-full" src="https://via.placeholder.com/150"
                             alt="Image of ${normalizeSentence(props.profile.firstName)} ${normalizeSentence(props.profile.lastName)}">
                        <input type="file" id="uploadDocs" class="hidden">
                        <button id="uploadBtn" type="button" class="my-1 p-2 w-3/4 rounded-md shadow-xl bg-callToAction font-medium">
                            Upload Documents
                        </button>
                    </div>
                    <div class="w-full my-2 flex flex-col items-center justify-between md:w-1/2">
                        ${populateUserDetails(props.profile)}
                    </div>
                </div>
                <div id="profileOffers" class="flex flex-col my-2 w-full xl:w-3/4">
                    <div class="text-center text-4xl my-2">My Offers</div>
                    <div id="offers" class="w-full grid grid-col-1 gap-2 center md:grid-cols-2 lg:grid-cols-3">
                        ${populateProfileOffers(props.profile.userOffers)}
                    </div>
                </div>
            </div>
        </div>
    `
}

function submitDocument() {
    $("#uploadBtn").click(e => {
        e.preventDefault();
        const id = parseInt(localStorage.getItem("accessToken"))
        const file = document.getElementById("uploadDocs")
        uploadDocuments('uploadPreApproval', id, file)
    })
}

const populateUserDetails = user => {
    //language=HTML
    return `
        <div class="text-center text-xl">${normalizeSentence(user.firstName)} ${normalizeSentence(user.lastName)}</div>
        <div class="text-center text-xl" data-username="${user.username}">
            ${user.username}
        </div>
        <div class="text-center text-xl">${user.email}</div>
        <div class="text-center text-xl">${user.phoneNumber}</div>
        <div class="text-center text-xl">${normalizeSentence(user.userAddress.address)}</div>
        <div class="text-center text-xl">${normalizeSentence(user.userAddress.city)}, ${normalizeSentence(user.userAddress.state)}
            ${user.userAddress.zipCode}
        </div>
        <button id="btnUpdateProfile" type="button"
                class="w-3/4 p-2 rounded-md shadow-xl bg-callToAction font-medium">
            Update Profile
        </button>
    `
}

function populateProfileOffers(offers) {
    let html = "";
    //language=html
    offers.forEach(offer => {
        html += `
            <div data-id="${offer.listing.id}" class="flex flex-col bg-white justify-evenly m-1 border-2 border-callToAction rounded-md shadow-xl">
                <div class="m-1 flex flex-col items-center bg-callToAction">
                    <span class="text-center text-xl">${normalizeSentence(offer.listing.listingAddress.address)}</span>
                    <span class="text-center text-xl">${normalizeSentence(offer.listing.listingAddress.city)}
                        , ${normalizeSentence(offer.listing.listingAddress.state)} ${offer.listing.listingAddress.zipCode}</span>
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
        let listingId;
        if (e.target.parentElement || e.target.parentElement.parentElement) {
            if (e.target.parentElement.getAttribute("data-id") === null ) {
                listingId = e.target.parentElement.parentElement.getAttribute("data-id");
            } else {
                listingId = e.target.parentElement.getAttribute("data-id");
            }

            if (listingId === null) {
                return;
            } else {
                createView({listing: {listing: `/api/listings/${listingId}`}})
            }
        }
    })
}

export function ProfileEvents() {
    updateUserProfile();
    submitDocument();
    showListing();
}
