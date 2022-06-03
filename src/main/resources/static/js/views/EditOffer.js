import createView from "../createView.js";
import {getLoggedInUser} from "../utility.js";
import {getHeaders} from "../auth.js";
import fetchData from "../fetchData.js";

export default function EditOffer(props) {
    //language=html
    console.log(props);
    return `
        <div class="content-height bg-slate-200 opacity-95 flex flex-col items-center">
            <div class="w-3/4 md:w-1/2">
                <div class="flex flex-col items-center text-left justify-center my-3">
                    <form class="flex flex-col items-center justify-center bg-white border-2 border-callToAction shadow-xl rounded-md w-full px-2 m-1">


                        <label class="text-left" for="offer-amount">Offer Amount</label>
                        <input name="amount" id="offer-amount" type="text"
                               class="offer-form border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 my-3 p-1"
                               value="$${props.editOffer.offerAmount}">


                        <label class="text-left" for="loan-type">Loan Type</label>
                        <select name="loan" id="loan-type"
                                class="offer-form border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 my-3 p-1">
                            <option disabled selected>Loan Type</option>
                            <option value="ARM">Adjustable-Rate Mortgage (ARM)</option>
                            <option value="CON">Conventional</option>
                            <option value="FRM">Fixed-Rate Mortgage</option>
                            <option value="FHA">Federal Housing Administration (FHA)</option>
                            <option value="USDA">U.S. Department of Agriculture (USDA)</option>
                            <option value="VA">Veterans Affairs (VA)</option>
                        </select>


                        <label class="text-left" for="option-length">Option Length</label>
                        <input name="option" id="option-length" type="text"
                               class="offer-form border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 my-3 p-1"
                               value="${props.editOffer.optionLength} days">


                        <label class="text-left" for="survey-requested">Survey Requested</label>
                        <input name="survey" id="survey-requested" type="text"
                               class="offer-form border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 my-3 p-1"
                               value="${props.editOffer.survey}">


                        <label class="text-left" for="warranty-requested">Home Warranty Requested</label>
                        <input name="warranty" id="warranty-requested" type="text"
                               class="offer-form border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1"
                               value="${props.editOffer.homeWarranty}">


                        <label class="text-left" for="appraisal-waiver">Appraisal Waiver</label>
                        <input name="appraisal" id="appraisal-waiver" type="text"
                               class="offer-form border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1"
                               value="${props.editOffer.appraisalWaiver}">


                        <label class="text-left" for="closing-date">Closing Date</label>
                        <input name="closing" id="closing-date" type="date"
                               class="offer-form border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1"
                               value="${props.editOffer.closingDate}">


                        <label class="text-left" for="closing-costs">Closing Costs</label>
                        <input name="closing" id="closing-costs" type="text"
                               class="offer-form border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1"
                               value="$${props.editOffer.closingCosts}">
                        <button id="edit-offer-btn"
                                class="offer-form w-1/2 p-2 m-2 rounded-md shadow-xl bg-callToAction font-medium"
                                data-id="${props.id}">Edit Offer
                        </button>
                    </form>
                </div>
            </div>
        </div>
        <div id="confirmation-message" class="text-green-600"></div>
    `;
}

export function EditEvent() {
    editOffer();
}

function editOffer() {
    $('.offer-form').on('keyup', function (e) {
        let enterKey = e.key;
        if (enterKey === 'Enter') {
            e.preventDefault();
            $('#make-offer-btn').click(function () {
            });
        }
    });

    $('#edit-offer-btn').on('click', function (e) {

        let URI = sessionStorage.getItem("URI").split("/");
        const listingId = parseInt(URI[URI.length - 1]);
        const editOfferId = $(this).data('id');

        const editData = {
            offerAmount: parseInt($('#offer-amount').val()),
            loanType: $('#loan-type').val(),
            optionLength: parseInt($('#option-length').val()),
            survey: $('#survey-requested').val(),
            homeWarranty: $('#warranty-requested').val(),
            appraisalWaiver: $('#appraisal-waiver').val(),
            closingDate: $('#closing-date').val(),
            closingCosts: parseInt($('#closing-costs').val()),
            offerorEmail: getLoggedInUser(),
            listingId: listingId
        }

        let request = {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(editData)
        }

        fetchData({server: `/api/offers/editOffer/${editOfferId}`}, request).then(response => {
            createView(`/offers/api/offers/findOffers/${listingId}`);
        })
    });
}
