import createView from "../createView.js";

const OFFERS_URL = `http://${BACKEND_HOST}:${PORT}/api/offers`;

let acceptanceID = null;
let buyerID = null;
let offerId = null;
let listingId = null;
let user;


export function confirmOfferAcceptance() {
    $('.btn-accept').on('click', function (e) {
        e.preventDefault();
        offerId = $(this).data("id");
        console.log(offerId);
        $.get(`${OFFERS_URL}/${offerId}`).then(function (res) {
            console.log(res);
            populateAcceptedOfferDiv(res);
        })
        $("#btn-confirm").attr("data-id", offerId).removeClass('hidden');
    })///END OF CONFIRM FUNCTION
}

export function populateAcceptedOfferDiv(res) {
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
    
}/// END OF POPULATED ACCEPTED OFFER

export function updateOfferStatus(array) {
    $("#btn-confirm").on('click', function () {
        offerId = $("#btn-confirm").data("id");
        const offerUpdate = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
        }
        for (let i = 0; i < array.length; i++) {
            let indexToDecline = array[i];
            if (array[i] === offerId) {
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

export function updateListingObject() {
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
