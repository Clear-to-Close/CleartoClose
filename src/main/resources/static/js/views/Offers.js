const OFFERS_URL = "http://localhost:8080/api/offers";

export default function Offers(props) {
    console.log(props);
    return `<div><img class="w-full h-1/2"
			     src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
			     alt="main listing photo">
                    ${retrieveOffersFromDb(props.offers)}
            </div>`
}

const retrieveOffersFromDb = (offers) => {
    // language=HTML
    return offers.map(offer =>
        `
			<div id="offersDiv" class="flex flex-wrap justify-evenly border-2 rounded border-black m-1">
				<div class="text-center mx-1 my-2" id="offerId" data-id="${offer.id}">
					${offer.id}
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
					<button data-id="${offer.id}" data-buyer="${offer.offeror.id}" data-offer="${offer.offerAmount}"
					        data-closing="${offer.closingDate}" data-warranty="${offer.homeWarranty}"
					        class="btn-accept border-2 border-black h-6 w-36 hover:bg-sky-700">Accept
						Offer!
					</button>
				</div>

			</div>`
    ).join("")
};


export function OfferEvent() {
    confirmOfferAcceptance();
}


function confirmOfferAcceptance() {
    $('.btn-accept').click(function () {
        const id = $(this).data("id");

        $.get(`${OFFERS_URL}/${id}`).then(function (res) {
            populateAcceptedOfferDiv(res);
            // updateListingObject(res);
        })
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

        // //language=html
        const acceptHTML = `
				<div id="acceptOfferDiv" class="flex flex-wrap justify-evenly border-2 rounded border-black m-1">
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
					<div class="text-center m-1 w-full">
						<button data-id="${id}" data-buyer="${offeror}" data-offer="${offerAmount}"
						        data-closing="${closingDate}" data-warranty="${homeWarranty}"
						        class="btn-accept border-2 border-black h-6 w-36 hover:bg-sky-700">Accept
							Offer!
						</button>
					</div>

				</div>`

        $("#offerModal").append(`${acceptHTML}`).removeClass("hide");

    }
}


function updateListingObject(buyer) {

    const soldListing = {
        status: 'AO',
        buyerId: `${buyer.id}`,
        buyerAgentId: `${buyer.buyerAgentId}`
    }

    const listingUpdate = {
        method: "PUT",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(soldListing)
    }
    fetch(`http://localhost:8080/api/listings`, listingUpdate)
        .then(response => console.log("listing updated", response))
}


//    // return       /// want offer to populate a modal
// /// have a confirmation button
// /// put request to update listing status
// /// put request to update listing db with buyer id
//


// $('#soldBtn').click(function () {
//     $('.body').removeClass('blur');
//     $('#offerModal').addClass('hide');
//     updateListingObject();
// })}


// $('.body').addClass(blur);

