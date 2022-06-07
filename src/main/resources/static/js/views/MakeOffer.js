import createView from "../createView.js";
import {getLoggedInUser} from "../utility.js";
import {getHeaders} from "../auth.js";
import fetchData from "../fetchData.js";

export default function MakeOffer(props) {
    //language=html
    console.log(props);
    return `
        <div class="content-height bg-slate-200 opacity-95 flex flex-col items-center justify-center">
            <div class="w-3/4 md:w-1/2">
                <div class="flex flex-col items-center text-left justify-center my-3">
                    <form class="flex flex-col items-center justify-center bg-white border-2 border-callToAction shadow-xl rounded-md w-full px-2 py-2 m-1">

                        <input name="amount" id="offer-amount" type="text"
                               class="offer-form border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-3/4 my-3 p-1"
                               value="${props.listing.askingPrice}" placeholder="How much are you offering?">

                        <select name="loan" id="loan-type"
                                class="offer-form border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-3/4 my-3 p-1">
                            <option disabled selected>Loan Type</option>
                            <option value="ARM">Adjustable-Rate Mortgage (ARM)</option>
                            <option value="CON">Conventional</option>
                            <option value="FRM">Fixed-Rate Mortgage</option>
                            <option value="FHA">Federal Housing Administration (FHA)</option>
                            <option value="USDA">U.S. Department of Agriculture (USDA)</option>
                            <option value="VA">Veterans Affairs (VA)</option>
                        </select>

                        <input name="option" id="option-length" type="text"
                               class="offer-form whitespace-normal border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-3/4 my-3 p-1"
                               placeholder="How many days are you requesting for an option period?">

                        <div class="w-full md:w-3/4 my-3 p-1">
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

                        <div class="w-full md:w-3/4 my-3 p-1">
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

                        <div class="w-full md:w-3/4 my-3 p-1">
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
                        
                        <input name="closing" id="closing-date" type="date"
                               class="offer-form border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-3/4 my-3 p-1"
                               placeholder="What is your requested closing date?">

                        <input name="closing" id="closing-costs" type="text"
                               class="offer-form border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-3/4 my-3 p-1"
                               placeholder="How much are you requesting the seller pay in closing costs?">
                        <button id="make-offer-btn"
                                class="offer-form w-1/2 p-2 m-2 rounded-md shadow-xl bg-callToAction font-medium"
                                data-id="${props.listing.id}">Post Offer
                        </button>
                    </form>
                </div>
            </div>
        </div>`;
}

export function MakeAnOffer() {
    submitOffer();
}

// // function radioButton(nameProperty, valueProperty) {
//     const surveyResponse = $('#survey-yes').click(function () {
//         console.log($(this));
//         if ($(this).is('checked')) {
//             return 'Yes';
//         } else {
//             return 'No';
//         }
//     })
//     // return 'No'
// // }

function submitOffer() {
    $('.offer-form').on('keyup', function (e) {
        let enterKey = e.key;
        if (enterKey === 'Enter') {
            e.preventDefault();
            $('#make-offer-btn').click(function () {
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
            survey: $(`input[name="survey"]:checked`).val(),
            homeWarranty: $(`input[name="warranty"]`).val(),
            appraisalWaiver: $(`input[name="appraisal"]`).val(),
            closingDate: $('#closing-date').val(),
            closingCosts: $('#closing-costs').val(),
            offerorEmail: getLoggedInUser(),
            listingId: $('#make-offer-btn').data('id'),
            offerStatus: `ACTIVE`

        }
        console.log(offerData);
        let postRequest = {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(offerData)
        }

        fetchData({server: `/api/offers`}, postRequest).then(response => {
            createView({
                offers: {
                    offers: `/api/offers/findOffers/${listingId}`,
                    listing: `/api/listings/${listingId}`
                }
            });
        });
    });
}



