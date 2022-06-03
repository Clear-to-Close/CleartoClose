import createView from "../createView.js";
import {getLoggedInUser} from "../utility.js";

const BASE_URL = `http://${BACKEND_HOST}:${PORT}/api/offers`;

export default function MakeOffer(props) {
    //language=html
    console.log(props);
    return `
		<div class="min-h-[calc(100vh-90px)]">
			<h1 class="text-center my-3">Offer Details</h1>
			<form class="flex flex-col justify-center px-3 border-2">
				<div class="flex flex-col my-3">
					<div class="flex flex-col items-center text-left justify-center w-3/4">
						<label for="offer-amount">Offer Amount</label>
						<input name="amount" id="offer-amount" type="text" class="offer-form bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-3/4 mx-1 my-3 p-1"
						       value="${props.makeOffer.askingPrice}">
					</div>
					<div class="offer-form flex flex-col items-center text-left justify-center w-3/4">
						<label for="loan-type">Loan Type</label>
						<select name="loan" id="loan-type" class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-3/4 mx-1 my-3 p-1">
							<option disabled selected>Loan Type</option>
							<option value="ARM">Adjustable-Rate Mortgage (ARM)</option>
							<option value="CON">Conventional</option>
							<option value="FRM">Fixed-Rate Mortgage</option>
							<option value="FHA">Federal Housing Administration (FHA)</option>
							<option value="USDA">U.S. Department of Agriculture (USDA)</option>
							<option value="VA">Veterans Affairs (VA)</option>
						</select>
					</div>
					<div class="offer-form flex flex-col items-center text-left justify-center w-3/4">
						<label for="option-length">Option Length</label>
						<input name="option" id="option-length" type="text" class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-3/4 mx-1 my-3 p-1" value="${props.makeOffer.optionLength}">
					</div>
					<div class="offer-form flex flex-col items-center text-left justify-center w-3/4">
						<label for="survey-requested">Survey Requested</label>
						<input name="survey" id="survey-requested" type="text" class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-3/4 mx-1 my-3 p-1" value="${props.makeOffer.survey}">
					</div>
					<div class="offer-form flex flex-col items-center text-left justify-center w-3/4">
						<label for="warranty-requested">Home Warranty Requested</label>
						<input name="warranty" id="warranty-requested" type="text" class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-3/4 mx-1 my-3 p-1" value="${props.makeOffer.homeWarranty}">
					</div>
					<div class="offer-form flex flex-col items-center text-left justify-center w-3/4">
						<label for="appraisal-waiver">Appraisal Waiver</label>
						<input name="appraisal" id="appraisal-waiver" type="text" class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-3/4 mx-1 my-3 p-1" value="${props.makeOffer.appraisalWaiver}">
					</div>
					<div class="offer-form flex flex-col items-center text-left justify-center w-3/4">
						<label for="closing-date">Closing Date</label>
						<input name="closing" id="closing-date" type="text" class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-3/4 mx-1 my-3 p-1" value="${props.makeOffer.closingDate}">
					</div>
					<div class="offer-form flex flex-col items-center text-left justify-center w-3/4">
						<label for="closing-costs">Closing Costs</label>
						<input name="closing" id="closing-costs" type="text" class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-3/4 mx-1 my-3 p-1" value="${props.makeOffer.closingCosts}">
					</div>
				</div>
				<button id="make-offer-btn" class="w-3/4 p-2 mx-2 my-2 rounded-md shadow-xl bg-callToAction font-medium" data-id="${props.id}">Post Offer</button>
			</form>
		</div>
		<div id="confirmation-message" class="text-green-600"></div>
    `;
}

export function MakeAnOffer() {
    submitOffer();
}

function submitOffer() {
    $('.offer-form').on('keyup', function (e) {
        let enterKey = e.key;
        if (enterKey === 'Enter') {
            e.preventDefault();
            $('#make-offer-btn').click(function () {
                console.log('This button was clicked by pressing enter!');
            });
        }
    });

    $('#make-offer-btn').on('click', function (e) {
        e.preventDefault();
        let URI = sessionStorage.getItem("URI").split("/")
        const listingId = parseInt(URI[URI.length - 1])

        const offerData = {
            offerAmount: $('#offer-amount').val(),
            loanType: $('#loan-type').val(),
            optionLength: $('#option-length').val(),
            survey: $('#survey-requested').val(),
            homeWarranty: $('#warranty-requested').val(),
            appraisalWaiver: $('#appraisal-waiver').val(),
            closingDate: $('#closing-date').val(),
            closingCosts: $('#closing-costs').val(),
            offerorEmail: getLoggedInUser(),
            listingId: listingId
        }

        let request = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(offerData)
        }

        fetch(`${BASE_URL}`, request)
            .then(response => {
                console.log(response.status);
                // getMessage("Your offer has been posted!", 'confirmation-message');
                createView(`/offers/findOffers/${listingId}`);
            }).catch(error => {
            console.log(error.status);
        });
    });
}



