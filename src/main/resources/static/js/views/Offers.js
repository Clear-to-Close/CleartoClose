import createView from "../createView.js";

const OFFERS_URL = `http://${BACKEND_HOST}:${PORT}/api/offers`;

let listingId = null;
let user;
let idArray;


export default function Offers(props) {

    user = parseInt(localStorage.getItem('accessToken'));
    let URI = sessionStorage.getItem("URI").split("/")
    listingId = parseInt(URI[URI.length - 1])
    whoIsLoggedIn(user);

    //language=HTML
    return `
		<div class="min-h-[calc(100vh-90px)] bg-primary">
			<div class="w-full relative">
				<img class="md:w-3/4 md:h-[350px] mx-auto"
				     src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
				     alt="main listing photo">
				<button id="makeOfferBtn"
				        class="absolute top-[50%] right-[50%] translate-y-1/2 translate-x-1/2 p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction">
					Make An Offer On This Home!
				</button>
			</div>
			<div id="offer">
				${props.offers.length === 0 ? `<h1>Currently No Offers Submitted</h1>` : retrieveOffersFromDb(props.offers)}
			</div>
			<div id="hiddenConfirmation" class="text-center m-1 w-full">
				<button id="btn-confirm"
				        class="hidden btn-accept p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction">Confirm
				</button>
			</div>
		</div>`
}


const retrieveOffersFromDb = (offers) => {
    idArray = [];
    offers.map(offer => idArray.push(offer.id));
    console.log(idArray);
    // language=HTML
    console.log(offers);
    return offers.map(offer =>

        `
			<div id="offersDiv" class="flex flex-wrap justify-evenly rounded bg-secondary m-1 h-[144px]">
				<div class="text-center mx-1 my-2" id="offerId">
					${offer.offerStatus} ${offer.id}
				</div>
				<div class="text-center mx-1 my-2" id="offerAmount-${offer.id}">
						\$${offer.offerAmount}
				</div>
				<div id="closingCosts" class="text-center mx-1 my-2">
					C/C: \$${offer.closingCosts}
				</div>
				<div class="text-center mx-1 my-2">
					Closing: ${offer.closingDate}
				</div>
				<div class="text-center mx-1 my-2">
					H/W: ${offer.homeWarranty}
				</div>
				<div class="text-center mx-1 my-2">
					L/T: ${offer.loanType}
				</div>
				<div class="text-center m-1 w-full">
					<button
							data-id="${offer.id}"
							class="btn-accept p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction ">Accept
						Offer!
					</button>
					<button
							data-id="${offer.id}"
							class="btn-counter p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction">Counter
						Offer!
					</button>
				</div>
			</div>`
    ).join("")
};


let acceptanceID = null;
let buyerID = null;
let offerId = null;


function confirmOfferAcceptance() {
    $('.btn-accept').on('click', function (e) {
        e.preventDefault();
        offerId = $(this).data("id");
        console.log(offerId);
        $.get(`${OFFERS_URL}/${offerId}`).then(function (res) {
            console.log(res);
            populateAcceptedOfferDiv(res);
        })
        $("#btn-confirm").attr("data-id", offerId);
    })///END OF CONFIRM FUNCTION

    function populateAcceptedOfferDiv(res) {
        const id = res.id;
        const offeror = res.offeror.id;
        const offerAmount = res.offerAmount;
        const loanType = res.loanType;
        const appraisalWaiver = res.appraisalWaiver;
        const survey = res.survey;
        const closingCosts = res.closingCosts;
        const closingDate = res.closingDate;
        const homeWarranty = res.homeWarranty;
        const buyersAgent = res.offeror.buyerAgentID;
        const acceptanceDate = new Date().toISOString().slice(0, 10)

        acceptanceID = res.listing.id;
        buyerID = res.offeror.id;

        // //language=html
        const acceptHTML = `
				<div id="acceptOfferDiv" class="flex flex-wrap justify-evenly rounded m-1 bg-secondary">
					<div class="text-center mx-1 my-2" id="offerId" data-id="${id}">
						${id}
					</div>
					<div class="text-center mx-1 my-2" id="offerAmount-${id}">
							\$${offerAmount}
					</div>
					<div id="closingCosts" class="text-center mx-1 my-2">
						C/C: \$${closingCosts}
					</div>
					<div class="text-center mx-1 my-2">
						Closing: ${closingDate}
					</div>
					<div class="text-center mx-1 my-2">
						H/W: ${homeWarranty}
					</div>
					<div class="text-center mx-1 my-2">
						L/T: ${loanType}
					</div>
					<div class="text-center mx-1 my-2">
						Waive Appraisal: ${appraisalWaiver}
					</div>
					<div class="text-center mx-1 my-2">
						Buyer Pays for Survey: ${survey}
					</div>
				</div>`

        $("#offer").html("").append(`${acceptHTML}`);
        $("#btn-confirm").removeClass("hidden");

    }
}/// END OF POPULATED ACCEPTED OFFER


function initCounterOffer() {
    $('.btn-counter').on('click', function () {
        const id = $(this).data("id");
        console.log(id);

        $.get(`${OFFERS_URL}/${id}`).then(function (res) {
            console.log(res);
            populateCounterOfferForm(res);
        })
    })
}///END OF COUNTER OFFER FUNCTION

function populateCounterOfferForm(res) {
    const id = res.id;
    const offeror = res.offeror.id;
    const offerAmount = res.offerAmount;
    const loanType = res.loanType;
    const appraisalWaiver = res.appraisalWaiver;
    const survey = res.survey;
    const closingCosts = res.closingCosts;
    const closingDate = res.closingDate;
    const homeWarranty = res.homeWarranty;
    const buyersAgent = res.offeror.buyerAgentID;

    //language=html
    const acceptHTML = `
		<div id="acceptOfferDiv" class="flex flex-wrap justify-evenly border-2 rounded border-black m-1">
			<div class="text-center mx-1 my-2" id="offerId" data-id="${id}">
				<label for="offerId">Offer ID</label>
				<input type="text" readonly class="form-control" id="offerId" placeholder="${id}">
			</div>
			<div class="text-center mx-1 my-2">
				<label for="offerLoanType">Loan Type:</label>
				<input type="text" readonly class="form-control" id="offerLoanType" placeholder="${loanType}">
			</div>
			<div class="text-center mx-1 my-2">
				<label for="offerAppWaiver">Waive Appraisal</label>
				<input type="text" readonly class="form-control" id="offerAppWaiver" placeholder="${appraisalWaiver}">
			</div>
			<div class="text-center mx-1 my-2" id="offerAmount-${id}">
				<label for="offerAmount">Offer Amt</label>
				<input type="text" class="form-control" id="offerAmount" placeholder="${offerAmount}">
			</div>
			<div id="closingCosts" class="text-center mx-1 my-2">
				<label for="offerClosingCosts">Closing Costs</label>
				<input type="text" class="form-control" id="offerClosingCosts" placeholder="${closingCosts}">
			</div>
			<div class="text-center mx-1 my-2">
				<label for="offerClosingDate">Closing Date</label>
				<input type="text" class="form-control" id="offerClosingDate" placeholder="${closingDate}">
			</div>
			<div class="text-center mx-1 my-2">
				<label for="offerHomeWarranty">Home Warranty</label>
				<input type="text" class="form-control" id="offerHomeWarranty" placeholder="${homeWarranty}">
			</div>
			<div class="text-center mx-1 my-2">
				<label for="offerSurvey">Survey</label>
				<input type="text" class="form-control" id="offerSurvey" placeholder="${survey}">
			</div>
		</div>`

    $("#offer").html("").append(`${acceptHTML}`);
    $("#btn-confirm").removeClass("hidden");

} /// END OF POPULATE CO FORM

function updateOfferStatus() {
///conditional logic is flawed here.  will not iterate
    $("#btn-confirm").on('click', function () {
        offerId = $("#btn-confirm").data("id");
        const offerUpdate = {
            method: "PUT",
            headers: {
                "Content-Type": 'application/json'
            },
        }
        for (let i = 0; i < idArray.length; i++) {
            let indexToDecline = idArray[i];
            if (idArray[i] === offerId) {
                fetch(`${OFFERS_URL}/${offerId}`, offerUpdate).then(function (res) {
                    console.log(res)
                })
            } else {
                fetch(`${OFFERS_URL}/decline/${indexToDecline}`, offerUpdate).then(function (res) {
                    console.log(res)
                })
            }

        }
    })
}

function updateListingObject() {
    $("#btn-confirm").on('click', function (e) {
        e.preventDefault();
        const soldListing = {
            buyerID: buyerID,
            // buyerAgentId: `${buyer.buyerAgentId}`
        }
        const listingUpdate = {
            method: "PUT",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(soldListing)
        }
        fetch(`http://${BACKEND_HOST}:${PORT}/api/listings/acceptOffer/${acceptanceID}`, listingUpdate)
            .then(response => createView(`/listing/listings/${acceptanceID}`))
    })
}////END OF UPDATE LISTING OBJECT


// // RENDERING BUTTONS BASED ON USER IDENTITY && ACTIVITY
// const renderMakeOfferBtn = (offers) => {
//     console.log(offers)
//     for (let i = 0; i < offers.length; i++) {
//
//         if (offers[i].offeror.id === user) {
//             console.log("This person won't be able to see the make offer button anymore!");
//         }
//         if (offers[i].listing.seller.id === user) {
//             isSeller = true;
//         }
//         if (offers[i].offeror.realtorInfo.id) {
//             isRealtor = true;
//             console.log("This person won't be able to see the make offer button anymore!");
//         }
//     }
// }

const createMakeOfferView = () => {
    $('#makeOfferBtn').click(_ => {
        let URI = sessionStorage.getItem("URI").split("/")
        console.log(URI)
        listingId = parseInt(URI[URI.length - 1])
        console.log(listingId)
        createView(`/makeOffer/listings/${listingId}`)

    })
}


function whoIsLoggedIn(id) {
    console.log(id)
}

export function OfferEvent() {
    // areThereAnyListings();
    // renderMakeOfferBtn(props);
    confirmOfferAcceptance();
    updateOfferStatus();
    updateListingObject();
    createMakeOfferView();
    initCounterOffer();

}
