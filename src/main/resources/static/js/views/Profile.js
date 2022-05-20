import createView from "../createView.js";

const LISTINGS_URL = "http://localhost:8080/api/users";

//Grab user id from login??

export default function ProfilePage(props) {
    //language=html
    console.log(props);
    return `

		<div class="h-1/4 w-1/3 bg-primary border-2 rounded-md border-secondary mx-2">
			<div class="m-1 pb-1 text-center">${props.loggedInUser.username}</div>
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
		<div id="profileOffers" class="h-1/4 w-2/3 bg-primary border-2 rounded-md border-secondary mx-2"></div>`


}///END OF PROFILE FUNCTION


export function ProfileEvents() {
 grabBuyerOffers();
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


