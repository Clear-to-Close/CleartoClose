import createView from "../createView.js";
import fetchData from "../fetchData.js";
import {getHeaders} from "../auth.js";
import { getLoggedInUser } from "../utility.js";




export function initCounterOffer() {
    $(`.btn-counter`).on('click', function (e) {

        e.preventDefault();
        const offerToBeCounteredId = $(this).data("id");
        console.log("counter offer button clicked");
        console.log(offerToBeCounteredId);

        $("#btn-confirm-counter").attr("data-id", offerToBeCounteredId);

        let request = {
            method: "GET",
            headers: getHeaders()
        }

        fetchData({
            server: `/api/offers/${offerToBeCounteredId}`
        }, request)
        .then(function (res) {
                console.log(res);
                populateCounterOfferForm(res);
        })
    })
}///END OF COUNTER OFFER FUNCTION

let originalOfferId;
let buyersEmail;
let currentListingId;
let buyersAgent;

function populateCounterOfferForm(res) {
    console.log(res);

    const offeror = res.server.offeror.id;
    const offerAmount = res.server.offerAmount;
    const loanType = res.server.loanType;
    const appraisalWaiver = res.server.appraisalWaiver;
    const survey = res.server.survey;
    const closingCosts = res.server.closingCosts;
    const closingDate = res.server.closingDate;
    const homeWarranty = res.server.homeWarranty;
    const optionLength = res.server.optionLength;
    const offerStatus = res.server.offerStatus;
    console.log(offerAmount);
    originalOfferId = res.server.id;
    buyersEmail = res.server.offeror.email;
    console.log(buyersEmail);
    currentListingId = res.server.listing.id;
    // buyersAgent = res.server.offeror.buyerAgentID;


    //language=html
    const counterHTML = `
		<div id="counterOfferDiv" class="flex justify-self-auto flex-col border-2 mx-auto border-callToAction bg-white shadow-xl rounded-md items-center md:w-3/4">
			<div class="offer-header w-full flex justify-center items-center bg-callToAction">
				<div class="text-primary font-medium text-xl p-3">
					Offer Status: ${offerStatus}
				</div>
			</div>
			<div class="offer-body bg-white px-3">
				<form class="flex flex-col items-center justify-center bg-whiterounded-md w-full px-2 py-2 m-1">
					<label for="counter-amount">Buyers Offer Amount</label>
					<input name="counter-amount" id="counter-amount" type="text"
					       class="offer-form border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-3/4 my-3 p-1"
					       value="${offerAmount}"
					<label for="loan-type">Buyers Loan Type: Cannot be countered</label>
					<input name="loan-type" id="loan-type" type="text"
					       readonly class="offer-form border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-3/4 my-3 p-1"
					       value="${loanType}" 
					<label for="option-length">Option Period Length</label>
					<input name="option" id="option-length" type="text"
					       class="offer-form whitespace-normal border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-3/4 my-3 p-1"
					       value="${optionLength}">
					<label for="survey-requested">Survey:</label>
					<input name="survey" id="survey-requested" type="text"
					       class="offer-form border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-3/4 my-3 p-1"
                           value="${survey}">
					<label for="warranty-requested">Home Warranty:</label>
					<input name="warranty" id="warranty-requested" type="text"
					       class="offer-form border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-3/4 my-3 p-1"
					       value="${homeWarranty}">
					<label for="appraisal-waiver">Appraisal Waiver</label>
					<input name="appraisal" id="appraisal-waiver" type="text"
					       class="offer-form border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-3/4 my-3 p-1"
                           value="${appraisalWaiver}">
					<label for="closing-date">Do you agree with closing date?</label>
					<input name="closing" id="closing-date" type="date"
					       class="offer-form border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-3/4 my-3 p-1"
                           value="${closingDate}">
					<label for="closing-costs">Closing Costs</label>
					<input name="closing" id="closing-costs" type="text"
					       class="offer-form border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-3/4 my-3 p-1"
					       value="${closingCosts}">
				</form>
            </div>
		</div>`

    $("#offer-sub-div").html("").addClass('hidden');
    $('#counterOfferFormPlacementDiv').append(`${counterHTML}`).removeClass('hidden');
    $("#btn-confirm-counter").removeClass('hidden');


} /// END OF POPULATE CO FORM

export function submitCounterOffer() {
    $("#btn-confirm-counter").on('click', function (e) {
        e.preventDefault();

        const counterOfferBody = {
            offerAmount: parseInt($('#counter-amount').val()),
            loanType: $('#loan-type').val(),
            optionLength: $('#option-length').val(),
            survey: $('#survey-requested').val(),
            homeWarranty: $('#warranty-requested').val(),
            appraisalWaiver: $('#appraisal-waiver').val(),
            closingDate: $('#closing-date').val(),
            closingCosts: parseInt($('#closing-costs').val()),
            offerorEmail: `${buyersEmail}`,
            offerStatus: "COUNTER",
            listingId: `${currentListingId}`,
        }
        console.log(counterOfferBody);

        let request = {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(counterOfferBody)
        }

        fetchData({server: `/api/offers`}, request).then(response => {
            console.log(response)

            createView({offers: {
                offers: `/api/offers/findOffers/${currentListingId}`,
                    listing: `/api/listings/${currentListingId}`,
                    user: `/api/users/searchByEmail?email=${getLoggedInUser()}`
            }});
        });
        updateOfferStatusToCountered();
    });

}

function updateOfferStatusToCountered() {
    const updatedOfferBody = {
        counterId: originalOfferId,
        offerStatus: 'CANCELLED'
    }
    const updateRequest = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedOfferBody)
    }
    fetchData({
        server: `/api/offers/countered/${originalOfferId}`
    }, updateRequest)
        .then(function (res) {
        console.log(res)
    })
}
