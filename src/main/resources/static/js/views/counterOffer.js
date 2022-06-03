import createView from "../createView.js";
import {getLoggedInUser} from "../utility.js";

const OFFERS_URL = `http://${BACKEND_HOST}:${PORT}/api/offers`;

export function initCounterOffer() {
    const offerID = $(this).data("id");
    $(`#btn-counter-${offerID}`).on('click', function (e) {
        e.preventDefault();

        $("#btn-confirm-counter").attr("data-id", offerID);

        $.get(`${OFFERS_URL}/${offerID}`).then(function (res) {
            console.log(res);
            populateCounterOfferForm(res);
        })
    })
}///END OF COUNTER OFFER FUNCTION

let originalOfferId;

function populateCounterOfferForm(res) {
    console.log(res);
    const id = res.id;
    const offeror = res.offeror.id;
    const offerAmount = res.offerAmount;
    const loanType = res.loanType;
    const appraisalWaiver = res.appraisalWaiver;
    const survey = res.survey;
    const closingCosts = res.closingCosts;
    const closingDate = res.closingDate;
    const homeWarranty = res.homeWarranty;
    const offerorEmail = res.offeror.email
    const buyersAgent = res.offeror.buyerAgentID;
    const optionLength = res.optionLength;

    //language=html
    const acceptHTML = `
		<div id="acceptOfferDiv" class="flex flex-wrap justify-evenly border-2 rounded border-black m-1">
			<div class="text-center mx-1 my-2" id="offerId" data-id="${id}">
				<label for="offerId">Offer ID</label>
				<input type="text" readonly class="form-control" id="offerId" value="${id}">
			</div>
			<div class="text-center mx-1 my-2">
				<label for="offerLoanType">Loan Type:</label>
				<input type="text" readonly class="form-control" id="offerLoanType" value="${loanType}">
			</div>
			<div class="text-center mx-1 my-2">
				<label for="offerorId">Loan Type:</label>
				<input type="text" readonly class="form-control" id="offerorId" value="${offeror}">
			</div>
			<div class="text-center mx-1 my-2">
				<label for="offerAppWaiver">Waive Appraisal</label>
				<input type="text" class="form-control" id="offerAppWaiver" value="${appraisalWaiver}">
			</div>
			<div class="text-center mx-1 my-2" id="offerAmount-${id}">
				<label for="offerAmount">Offer Amt</label>
				<input type="text" class="form-control" id="offerAmount" value="${offerAmount}">
			</div>
			<div id="closingCosts" class="text-center mx-1 my-2">
				<label for="offerClosingCosts">Closing Costs</label>
				<input type="text" class="form-control" id="offerClosingCosts" value="${closingCosts}">
			</div>
			<div class="text-center mx-1 my-2">
				<label for="offerClosingDate">Closing Date</label>
				<input type="text" class="form-control" id="offerClosingDate" value="${closingDate}">
			</div>
			<div class="text-center mx-1 my-2">
				<label for="offerHomeWarranty">Home Warranty</label>
				<input type="text" class="form-control" id="offerHomeWarranty" value="${homeWarranty}">
			</div>
			<div class="text-center mx-1 my-2">
				<label for="offerSurvey">Survey</label>
				<input type="text" class="form-control" id="offerSurvey" value="${survey}">
			</div>
			<div class="text-center mx-1 my-2">
				<label for="offerOption">Option Period</label>
				<input type="text" class="form-control" id="offerOption" value="${survey}">
			</div>
		</div>`

    $("#offer").html("").append(`${acceptHTML}`);
    $("#btn-confirm-counter").removeClass('hidden');
    $('#btn-confirm-counter').attr('data-email', offerorEmail);

} /// END OF POPULATE CO FORM

export function submitCounterOffer() {
    $("#btn-confirm-counter").on('click', function (e) {
        e.preventDefault();
        let URI = sessionStorage.getItem("URI").split("/")
        const listingId = parseInt(URI[URI.length - 1])
        originalOfferId = $('#btn-confirm-counter').data("id");

        const offerData = {
            offerAmount: $('#offerAmount').val(),
            loanType: $('#offerLoanType').val(),
            optionLength: $('#option-length').val(),
            survey: $('#offerSurvey').val(),
            homeWarranty: $('#offerHomeWarranty').val(),
            appraisalWaiver: $('#offerAppWaiver').val(),
            closingDate: $('#offerClosingDate').val(),
            closingCosts: $('#offerClosingCosts').val(),
            offerorEmail: $('#btn-confirm-counter').data('email'),
            offerStatus: "COUNTER",
            listingId: listingId,
        }
        console.log(offerData);

        let request = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(offerData)
        }

        fetch(`${OFFERS_URL}`, request)
            .then(response => {
                console.log(response);
                createView(`/offers/findOffers/${listingId}`);
            }).catch(error => {
            console.log(error.status);
        });
        updateOfferStatusToCountered();
    });

}

function updateOfferStatusToCountered() {
    const updatedOfferBody = {
        counterId: '222',
        offerStatus: 'CANCELLED'
    }
    const offerUpdate = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedOfferBody)
    }
    fetch(`${OFFERS_URL}/countered/${originalOfferId}`, offerUpdate).then(function (res) {
        console.log(res)
    })
}