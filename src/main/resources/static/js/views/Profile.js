import createView from "../createView.js";

const LISTINGS_URL = "http://localhost:8080/api/users";

//Grab user id from login??

export default function ProfilePage(props) {
    //language=html
    console.log(props);
    return `
        <div id="updateProfileForm">
            <div class="h-1/4 w-1/3 bg-primary border-2 rounded-md border-secondary mx-2">
                <div class="m-1 pb-1 text-center" data-username="${props.loggedInUser.username}">
                    ${props.loggedInUser.username}
                </div>
                <div class="m-1 pb-1 text-center">${props.loggedInUser.phoneNumber}</div>
                <div class="m-1 pb-1 text-center">
                    ${props.loggedInUser.userAddress.address} ${props.loggedInUser.userAddress.city}
                    ${props.loggedInUser.userAddress.state} ${props.loggedInUser.userAddress.zipCode}
                </div>
                <div class="m-1 pb-1 text-center">${props.loggedInUser.email}</div>
                <button id="btnUpdateProfile" type="submit"
                        class="mx-1 my-2 rounded-sm shadow-xl text-white bg-callToAction">Update Profile
                </button>

            </div>
        </div>
        <button id="saveProfile-btn"
                class="w-1/2 p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction hidden">Save
        </button>
        <div id="profileOffers" class="h-1/4 w-2/3 bg-primary border-2 rounded-md border-secondary mx-2"></div>`


}///END OF PROFILE FUNCTION


export function ProfileEvents() {
    grabBuyerOffers();
    updateUserProfile();

}///END OF PROFILE EVENTS

function grabBuyerOffers() {
    const userId = localStorage.getItem("accessToken");
    $.get(`http://${BACKEND_HOST}:${PORT}/api/offers/findOffersByUser/${userId}`).then(function (res) {
        console.log(res);
        populateProfileOffers(res);
    })

}


function populateProfileOffers(offers) {
    //language=html
    const myOffersHTML = `
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

        </div>`
    $("#profileOffers").append(myOffersHTML);
}

function updateUserProfile() {
    $("#btnUpdateProfile").click(function () {
        //langauge=HTML
        $("#saveProfile-btn").removeClass("hidden")
        const userId = localStorage.getItem("accessToken");
        $.get(`http://${BACKEND_HOST}:${PORT}/api/users/${userId}`).then(function (res) {
            console.log(res);
            // populateUpdateForm(res);
            const updateHTML =
                `<div>
                <div class="text-center mx-1 my-2" >
				<label for="firstname"></label>
				<input type="text" class="form-control" id="firstname" placeholder="${res.firstName}">
			    </div>
			    <div class="text-center mx-1 my-2" id="offerId">
				<label for="lastname"></label>
				<input type="text" class="form-control" id="lastname" placeholder="${res.lastName}">
			    </div>
			     <div class="text-center mx-1 my-2" id="offerId">
				<label for="email"></label>
				<input type="text" class="form-control" id="email" placeholder="${res.email}">
			    </div>
			     <div class="text-center mx-1 my-2" id="offerId">
				<label for="phone-number"></label>
				<input type="text" class="form-control" id="phone-number" placeholder="${res.phoneNumber}">
			    </div>
            </div>`
            $("#updateProfileForm").append(updateHTML);
        })

    })
    saveProfileUpdate();
}

function saveProfileUpdate() {
    $("#saveProfile-btn").click(function () {
        console.log("Profile updated")
        const updatedUser = {
            firstName: $("#firstname").val(),
            lastName: $("#lastname").val(),
            email: $("#email").val(),
        }
    })
}


