import createView from "../createView.js";

const OFFERS_URL = `http://${BACKEND_HOST}:${PORT}/api/offers`;

let listingID = null;
const user = parseInt(localStorage.getItem('accessToken'));

export default function Offers(props) {
    listingID = props.offers[0].listing.id
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
            <div id="offer">${retrieveOffersFromDb(props.offers)}</div>
            <div id="hiddenConfirmation" class="text-center m-1 w-full hidden">
                <button id="btn-confirm"
                        class="btn-accept p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction">Confirm
                </button>
            </div>
        </div>`
}

const retrieveOffersFromDb = (offers) => {
    // language=HTML
    let id = $(this).data("buyer");
    // console.log(id)
    // if (id === user) {
    //     $('.edit-offer').removeClass('hidden');
    // }
    offers.forEach(offer => {
        if (id === user) {
            $('#edit-offer-container'.html(`<button id="edit-offer" data-id="${offer.id}"
                                                   data-buyer="${offer.offeror.id}"
                                                   data-offer="${offer.offerAmount}"
                                                   data-closing="${offer.closingDate}"
                                                   data-warranty="${offer.homeWarranty}"
                                                   class="edit-offer hidden p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction">Edit Offer
                                            </button>`));
        }
    })
    console.log(offers);
    return offers.map(offer =>
        `
            <div id="offersDiv" class="flex flex-wrap justify-evenly rounded bg-secondary m-1 h-[144px]">
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
                    <button id="btn-accept" data-id="${offer.id}" data-buyer="${offer.offeror.id}"
                            data-offer="${offer.offerAmount}"
                            data-closing="${offer.closingDate}" data-warranty="${offer.homeWarranty}"
                            class="p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction">Accept
                        Offer!
                    </button>
                    <div id="edit-btn-container"></div>
                </div>
            </div>`
    ).join("")
};


let acceptanceID = null;
let buyerID = null;


function confirmOfferAcceptance() {
    $('#btn-accept').click(function () {
        const id = $(this).data("id");

        $.get(`${OFFERS_URL}/${id}`).then(function (res) {
            // console.log(res);
            populateAcceptedOfferDiv(res);
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
        console.log(res.listing.id);

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
        $("#hiddenConfirmation").removeClass("hidden");

    }
}/// END OF POPULATED ACCEPTED OFFER

// START OF EDIT OFFER FUNCTIONALITY
function editOffer() {
    $('.edit-offer').on('click', function () {
        let id = $(this).data("buyer");
        console.log(id);

        if (id === user) {
            console.log('only the user who own the offer can get here!')
            createView(`/makeOffer/listings/${listingID}`)
        }
    })

}

function initCounterOffer() {
    $('#btn-cnt-offer').click(function () {
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
    $("#hiddenConfirmation").removeClass("hidden");

} /// END OF POPULATE CO FORM


function updateListingObject() {
    $("#btn-confirm").click(function (e) {
        e.preventDefault();

        const soldListing = {
            status: 'PENDING',
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
            .then(response => createView(`/listing/${acceptanceID}`))


    })
}////END OF UPDATE LISTING OBJECT


const createMakeOfferView = () => {
    $('#makeOfferBtn').click(_ => {
        createView(`/makeOffer/listings/${listingID}`)
    })
}

export function OfferEvent() {
    confirmOfferAcceptance();
    updateListingObject();
    createMakeOfferView();
    initCounterOffer();
    editOffer();
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

