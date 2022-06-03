import {updateUserProfile} from "./updateProfile.js";
import {uploadDocuments} from "../utility.js";

export default function ProfilePage(props) {
    console.log(props);
    //language=html
    return `
        <div class="content-height bg-slate-200 opacity-95 flex justify-center items-center">
            <div class="md:w-3/4">
                <div id="updateProfileForm" class="w-full">
                    <div class="mx-2">
                        <div class="m-1 pb-1 text-center" data-username="${props.loggedInUser.username}">
                            ${props.loggedInUser.username}
                        </div>
                        <div class="m-1 pb-1 text-center">${props.loggedInUser.email}</div>
                        <div class="m-1 pb-1 text-center">${props.loggedInUser.phoneNumber}</div>

                        <button id="btnUpdateProfile" type="button"
                                class="m-auto my-2 rounded-sm shadow-xl text-white bg-callToAction">Update Profile
                        </button>
                    </div>
                </div>
                <div class="flex justify-between">
                    <button id="saveProfile-btn" type="button"
                            class="w-1/2 p-2 mx-1 my-2 rounded-md shadow-xl text-primary bg-callToAction hidden">Save
                    </button>
                    <button id="cancel-btn" type="button"
                            class="w-1/2 p-2 mx-1 my-2 rounded-md shadow-xl text-primary bg-callToAction hidden">Cancel
                    </button>
                </div>
                <div id="profileOffers" class="h-1/4 w-full bg-primary border-2 rounded-md border-secondary mx-2">
                    ${populateProfileOffers(props.loggedInUser.userOffers)}
                </div>
                <div>
                    <form>
                        <input type="file" id="uploadDocs">
                        <button id="uploadBtn" type="button" class="w-full p-2 mx-2 my-2 rounded-md shadow-xl bg-callToAction font-medium">
                            Upload Documents
                        </button>
                    </form>
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

function populateProfileOffers(offers) {
    //language=html
    let html = "";
    return `
        <div id="myOffersDiv" class="flex flex-wrap justify-evenly rounded m-1 bg-secondary">
            ${offers.map(offer => `
                    <div class="text-center mx-1 my-2" id="offerId" data-id="${offer.id}">
                                ${offer.id}
                    </div>  
                   
					<div class="text-center mx-1 my-2">
							\$${offer.offerAmount}
					</div>
					
					<div id="closingCosts" class="text-center mx-1 my-2">
						C/C: \$${offer.closingCosts}
					</div>
					
					<div class="text-center mx-1 my-2">
						Close Date: ${offer.closingDate}
					</div>
					
					<div class="text-center mx-1 my-2">
						H/W: ${offer.homeWarranty}
					</div>
					
					<div class="text-center mx-1 my-2">
						L/T: ${offer.loanType}
					</div>
					
					<div class="text-center mx-1 my-2">
						Waive Appraisal: ${offer.appraisalWaiver}
					</div>
					
					<div class="text-center mx-1 my-2">
						Buyer Pays for Survey: ${offer.survey}
					</div>

`).join('')}

        </div>`;
}

export function ProfileEvents() {
    updateUserProfile();
    submitDocument();
}
