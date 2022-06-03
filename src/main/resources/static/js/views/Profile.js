import {updateUserProfile} from "./updateProfile.js";
import {uploadDocuments,normalizeWords, normalizeSentence } from "../utility.js";

export default function ProfilePage(props) {
    console.log(props);
    //language=html
    return `
        <div class="content-height bg-slate-200 opacity-95 flex justify-center">
            <div class="flex flex-col w-3/4">
                <div class="my-1 flex flex-col items-center">
                    <img class="my-1" src="https://via.placeholder.com/150" alt="Image of ${props.profile.firstName} ${props.profile.lastName}">
                    <input type="file" id="uploadDocs" class="hidden">
                    <button id="uploadBtn" type="button" class="my-1 w-full rounded-md shadow-xl bg-callToAction font-medium">
                        Upload Documents
                    </button>
                </div>
                <div id="updateProfileForm" class="w-full">
                    ${populateUserDetails(props.profile)}
                </div>
                <div class="flex flex-col mt-3">
                    <div class="text-center text-2xl">My Offers</div>
                    ${populateProfileOffers(props.profile.userOffers)}
                </div>
            </div>
        </div>
    `
}


// <div id="profileOffers" className="h-1/4 w-full bg-primary border-2 rounded-md border-secondary mx-2">
//     ${populateProfileOffers(props.loggedInUser.userOffers)}
// </div>

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
        <div class="text-center">${normalizeWords(user.firstName)} ${normalizeWords(user.lastName)}</div>
        <div class="text-center" data-username="${user.username}">
            ${user.username}
        </div>
        <div class="text-center">${user.email}</div>
        <div class="text-center">${user.phoneNumber}</div>
        <div class="text-center">${normalizeSentence(user.userAddress.address)}</div>
        <div class="text-center">${normalizeSentence(user.userAddress.city)}, ${normalizeSentence(user.userAddress.state)} ${user.userAddress.zipCode}</div>
        <button id="btnUpdateProfile" type="button"
                class="w-full rounded-md shadow-xl bg-callToAction font-medium">
            Update Profile
        </button>
    `
}

function populateProfileOffers(offers) {
    let html = "";
    //language=html
    offers.forEach(offer => {
        html += `
            <div id="myOffersDiv" class="flex flex-col bg-white justify-evenly m-1 border-2 border-callToAction rounded-md shadow-xl">
                <div class="mx-1 my-2">
                    <span>Amount Offered:</span>
                    <span>\$${offer.offerAmount}</span>
                </div>
                <div id="closingCosts" class="mx-1 my-2">
                    <span>Closing Costs:</span>
                    <span>\$${offer.closingCosts}</span>
                </div>
                <div class="mx-1 my-2">
                    <span>Close Date:</span>
                    <span>${offer.closingDate}</span>
                </div>
                <div class="mx-1 my-2">
                    <span>Home Warranty:</span>
                    <span>${offer.homeWarranty}</span>
                    
                </div>
                <div class="mx-1 my-2">
                    <span>Loan Type:</span>
                    <span>${offer.loanType}</span>
                </div>
                <div class="mx-1 my-2">
                    <span>Waive Appraisal:</span>
                    <span>${offer.appraisalWaiver}</span>
                </div>
                <div class="mx-1 my-2">
                    <span>Paying for Survey:</span>
                    <span>${offer.survey}</span>
                </div>
            </div>
        `
    })
    return html;
}

export function ProfileEvents() {
    updateUserProfile();
    submitDocument();
}
