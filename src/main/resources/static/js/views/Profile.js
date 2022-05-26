import createView from "../createView.js";

const BASE_URI = `http://${BACKEND_HOST}:${PORT}`;

//Grab user id from login??

export default function ProfilePage(props) {
    //language=html
    console.log(props);
    return `
        <div id="updateProfileForm" class="w-full">
            <div class=" bg-primary border-2 rounded-md border-secondary mx-2 flex flex-wrap justify-">
                <div class="m-1 pb-1 text-center" data-username="${props.loggedInUser.username}">
                    ${props.loggedInUser.username}
                </div>
	            <div class="m-1 pb-1 text-center">${props.loggedInUser.email}</div>
                <div class="m-1 pb-1 text-center">${props.loggedInUser.phoneNumber}</div>
                
                <button id="btnUpdateProfile" type="submit"
                        class="m-auto my-2 rounded-sm shadow-xl text-white bg-callToAction">Update Profile
                </button>

            </div>
        </div>
        <button id="saveProfile-btn"
                class="w-1/2 p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction hidden">Save
        </button>
        
        <div id="profileOffers" class="h-1/4 w-2/3 bg-primary border-2 rounded-md border-secondary mx-2"></div>
        <div align="center">
            <div><h2>Spring Boot File Upload to S3</h2></div>
            <div>
                <form >
                    <input type="file" id="uploadUserDocs">
                    <button id="uploadBtn">Upload Documents</button>
                </form>
            </div>

        <button id="cancel-btn"
                class="w-1/2 p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction hidden">Cancel
        </button>
        <div id="profileOffers" class="h-1/4 w-full bg-primary border-2 rounded-md border-secondary mx-2">
	        ${props.loggedInUser.userOffers.map(offer => `
                    <div class="border-2 bg-primary border-callToAction flex flex-wrap justify-between m-2">
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
                        <button type="submit"
                        class="btn-editOffer m-auto my-2 rounded-sm shadow-xl text-white bg-callToAction">Edit Offer
                    </button>
					</div>
					

`).join('')}
        </div>`
}///END OF PROFILE FUNCTION

export function ProfileEvents() {

    updateUserProfile();
    uploadDocuments();

}///END OF PROFILE EVENTS

const uploadDocuments = _ => {
    $("#uploadBtn").click(e => {
        e.preventDefault();
        let file = document.getElementById("uploadUserDocs");
        let formData = new FormData();

        formData.append('file', file.files[0])

        const uploadRequest = {
            method: 'POST',
            body: formData
        }

        console.log("Hey")
        fetch(`${BASE_URI}/api/s3/upload/${parseInt(localStorage.getItem("accessToken"))}`, uploadRequest)
            .then(results => console.log(results))
    })
}

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
    $("#btnUpdateProfile").click(function (e) {
        e.preventDefault();
        //langauge=HTML
        $("#saveProfile-btn").removeClass("hidden")
        $("#cancel-btn").removeClass("hidden")
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
			    <label for="newStreet"></label>
				<input type="text" class="form-control" id="newStreet" placeholder="${res.userAddress.address}">
			    </div>
			    <label for="suite"></label>
				<input type="text" class="form-control" id="suite" placeholder="${res.userAddress.apartmentNumber}">
			    </div>
			    <label for="newCity"></label>
				<input type="text" class="form-control" id="newCity" placeholder="${res.userAddress.city}">
			    </div>
			    <label for="newState"></label>
				<input type="text" class="form-control" id="newState" placeholder="${res.userAddress.state}">
			    </div>
			    <label for="newZip"></label>
				<input type="text" class="form-control" id="newZip" placeholder="${res.userAddress.zipCode}">
			    </div>
            </div>`

            $("#updateProfileForm").html("").append(updateHTML);
        })

    })
    saveProfileUpdate();
}

function saveProfileUpdate() {
    $("#saveProfile-btn").click(function (e) {
        e.preventDefault();
        console.log("Profile updated")
        const updatedUser = {
            firstName: $("#firstname").val(),
            lastName: $("#lastname").val(),
            email: $("#email").val(),
            phoneNumber: $("#phone-number").val(),

            userAddress:{
                address: $("#newStreet").val(),
                apartmentNumber: $("#suite").val(),
                city: $("#newCity").val(),
                state: $("#newState").val(),
                zipCode: $("#newZip").val(),
            }
        }
        let request = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updatedUser)
        }
        fetch(`http://${BACKEND_HOST}:${PORT}/api/users/create`, request)
            .then(response => {
                console.log(response.status);
                createView("/");

            })
    })
    $("#cancel-btn").click(function (){
        $("#saveProfile-btn").addClass("hidden");
        $("#cancel-btn").addClass("hidden");
        console.log("cancel button clicked");

    })

}







