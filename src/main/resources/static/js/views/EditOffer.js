import createView from "../createView.js";
import {getLoggedInUser} from "../utility.js";
import {getHeaders} from "../auth.js";
import fetchData from "../fetchData.js";


export default function EditOffer(props) {
    //language=html
    console.log(props);
    return `
        <div class="content-height bg-slate-200 opacity-95 flex flex-col items-center justify-center">
            <div class="w-3/4 md:w-1/2">
                <div class="flex flex-col items-center text-left justify-center my-3">
                    <form class="flex flex-col items-center justify-center bg-white border-2 border-callToAction shadow-xl rounded-md w-full px-2 py-2 m-1">

                        <div class="justify-center w-full md:w-3/4 my-3 p-1">
                            <input name="amount" id="amount" type="text"
                                   class="validate border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full my-3 p-1"
                                   value="${props.offer.offerAmount}" placeholder="How much are you offering?">
                            <p id="invalid-amount-input" class="hidden m-2">Please enter your offer amount.</p>
                        </div>

                        <div class="justify-center w-full md:w-3/4 my-3 p-1">
                            <select name="loan" id="loanType"
                                    class="validate border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full my-3 p-1"
                                    required>
                                <option disabled selected>Loan Type</option>
                                <option value="ARM">Adjustable-Rate Mortgage (ARM)</option>
                                <option value="CON">Conventional</option>
                                <option value="FRM">Fixed-Rate Mortgage</option>
                                <option value="FHA">Federal Housing Administration (FHA)</option>
                                <option value="USDA">U.S. Department of Agriculture (USDA)</option>
                                <option value="VA">Veterans Affairs (VA)</option>
                            </select>
                            <p id="invalid-loanType-input" class="hidden m-2">Please select your loan type.</p>
                        </div>

                        <div class="justify-center w-full md:w-3/4 my-3 p-1">
                            <input name="option" id="option" type="text"
                                   class="validate whitespace-normal border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full my-3 p-1"
                                   placeholder="How many days are you requesting for an option period?"
                                   value="${props.offer.optionLength}">
                            <p id="invalid-option-input" class="hidden m-2">Please select your preferred option period
                                (in days).</p>
                        </div>

                        <div class="justify-center w-full md:w-3/4 my-3 p-1">
                            <span class="font-medium text-primary">Are you requesting the seller to pay for the survey?</span><br>
                            <span class="m-3">
                                <input name="survey" id="survey-yes" type="radio"
                                       class="accent-callToAction pr-3"
                                       value="Yes" checked>
                                <label for="survey-yes text-primary font-medium">Yes</label>
                            </span>
                            <span class="m-3">
                                <input name="survey" id="survey-no" type="radio"
                                       class="accent-callToAction"
                                       value="No">
                                <label for="survey-yes text-primary font-medium">No</label>
                            </span>
                        </div>

                        <div class="justify-center w-full md:w-3/4 my-3 p-1">
                            <span class="font-medium text-primary">Are you requesting the seller to pay for the home warranty?</span><br>
                            <span class="m-3">
                                <input name="warranty" id="warranty-yes" type="radio"
                                       class="accent-callToAction pr-3"
                                       value="Yes" checked>
                                <label for="warranty-yes text-primary font-medium">Yes</label>
                            </span>
                            <span class="m-3">
                                <input name="warranty" id="warranty-no" type="radio"
                                       class="accent-callToAction"
                                       value="No">
                                <label for="warranty-no text-primary font-medium">No</label>
                            </span>
                        </div>

                        <div class="justify-center w-full md:w-3/4 my-3 p-1">
                            <span class="font-medium text-primary">Are you requesting an appraisal waiver?</span><br>
                            <span class="m-3">
                                <input name="appraisal" id="appraisal-yes" type="radio"
                                       class="accent-callToAction pr-3"
                                       value="Yes" checked>
                                <label for="appraisal-yes text-primary font-medium">Yes</label>
                            </span>
                            <span class="m-3">
                                <input name="appraisal" id="appraisal-no" type="radio"
                                       class="accent-callToAction"
                                       value="No">
                                <label for="appraisal-no text-primary font-medium">No</label>
                            </span>
                        </div>

                        <div class="justify-center w-full md:w-3/4 my-3 p-1">
                            <input name="closing-Date" id="closingDate" type="date"
                                   class="validate border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full my-3 p-1"
                                   placeholder="What is your requested closing date?"
                                   value="${props.offer.closingDate}">
                            <p id="invalid-closingDate-input" class="hidden m-2">Please select your preferred closing
                                date.</p>
                        </div>

                        <div class="justify-center w-full md:w-3/4 my-3 p-1">
                            <input name="closing-Costs" id="closingCosts" type="text"
                                   class="validate border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full my-3 p-1"
                                   placeholder="How much are you requesting the seller pay in closing costs?"
                                   value="${props.offer.closingCosts}">
                            <p id="invalid-closingCosts-input" class="hidden m-2">Please enter how much you would like
                                the buyer to pay in closing costs.</p>
                        </div>

                        <button id="edit-offer-btn" type="button"
                                class="offer-form w-1/2 p-2 m-2 rounded-md shadow-xl bg-callToAction font-medium"
                                data-id="${props.offer.id}" data-listing="${props.listing.id}">Edit Offer
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

    $('.validate').on('change', function () {
        let errorDiv = `#invalid-${$(this).prop('id')}-input`;
        console.log(errorDiv);
        if (isNaN(parseInt($(this).val()))) {
            inputValidator($(this).val(), errorDiv, 'string');
        } else {
            inputValidator(parseInt($(this).val()), errorDiv, 'number');
        }
    })


    function inputValidator(inputRequired, errorSelector, dataType) {
        console.log(inputRequired);
        console.log(errorSelector);
        console.log(dataType);
        console.log($('#loanType').val());
        if (inputRequired === '' || inputRequired === null) {
            $(`${errorSelector}`).removeClass('hidden').css('color', '#B80422');
        } else if (typeof inputRequired !== dataType) {
            $(`${errorSelector}`).removeClass('hidden').css('color', '#B80422').html(`You must use a ${dataType} here.`)
        }
    }
}


function editOffer() {
    $('.offer-form').on('keyup', function (e) {
        let enterKey = e.key;
        if (enterKey === 'Enter') {
            e.preventDefault();
            $('#edit-offer-btn').click();
        }
    });

    $('#edit-offer-btn').on('click', function (e) {
        const editOfferId = $(this).data('id');
        const listingId = $('#edit-offer-btn').data('listing');


        const editData = {
            offerAmount: $('#amount').val(),
            loanType: $('#loanType').val(),
            optionLength: $('#option').val(),
            survey: $(`input[name="survey"]:checked`).val(),
            homeWarranty: $(`input[name="warranty"]`).val(),
            appraisalWaiver: $(`input[name="appraisal"]`).val(),
            closingDate: $('#closingDate').val(),
            closingCosts: $('#closingCosts').val(),
            offerorEmail: getLoggedInUser(),
            listingId: $(this).data('id')
        }

        let request = {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(editData)
        }

        if (Object.keys(editData).every(key => key === '')) {
            alert('Please make sure all fields are filled.')
        } else {
            fetchData({server: `/api/offers/editOffer/${editOfferId}`}, request).then(response => {
                createView({
                    offers: {
                        offers: `/api/offers/findOffers/${listingId}`,
                        listing: `/api/listings/${listingId}`,
                        user: `/api/users/searchByEmail?email=${getLoggedInUser()}`
                    },
                });
            })
        }
    });
}
