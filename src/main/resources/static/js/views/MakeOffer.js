import createView from "../createView.js";

export default function MakeOffer(props) {
    console.log(props)
    //language=html
    return `
        <div class="min-h-[calc(100vh-90px)]">
            <h1 class="text-center my-3">Offer Details</h1>
            <form class="flex flex-col justify-center px-3 border-2">
                <div class="flex flex-col my-3">
                    <div class="flex flex-col items-center text-left justify-center w-3/4">
                        <label for="offer-amount">Offer Amount</label>
                        <input name="amount" id="offer-amount" type="text" class="offer-form m-1" value="${props.makeOffer.askingPrice}">
                    </div>
                    <div class="offer-form flex flex-col items-center text-left justify-center w-3/4">
                        <label for="loan-type">Loan Type</label>
                        <select name="loan" id="loan-type" class="m-1">
                            <option disabled selected>Loan Type</option>
                            <option value="ARM">Adjustable-Rate Mortgage (ARM)</option>
                            <option value="CON">Conventional</option>
                            <option value="FRM">Fixed-Rate Mortgage</option>
                            <option value="FHA">Federal Housing Administration (FHA)</option>
                            <option value="USDA">U.S. Department of Agriculture (USDA)</option>
                            <option value="VA">Veterans Affairs (VA)</option>
                        </select>
                    </div>
                    <div class="offer-form flex flex-col items-center text-left justify-center">
                        <label for="option-length">Option Length</label>
                        <input name="option" id="option-length" type="text" class="m-1 w-3/4">
                    </div>
                    <div class="offer-form flex flex-col items-center text-left justify-center">
                        <label for="survey-requested">Survey Requested</label>
                        <input name="survey" id="survey-requested" type="text" class="m-1 w-3/4">
                    </div>
                    <div class="offer-form flex flex-col items-center text-left justify-center">
                        <label for="warranty-requested">Home Warranty Requested</label>
                        <input name="warranty" id="warranty-requested" type="text" class="m-1 w-3/4">
                    </div>
                    <div class="offer-form flex flex-col items-center text-left justify-center">
                        <label for="appraisal-waiver">Appraisal Waiver</label>
                        <input name="appraisal" id="appraisal-waiver" type="text" class="m-1 w-3/4">
                    </div>
                    <div class="offer-form flex flex-col items-center text-left justify-center">
                        <label for="closing-costs">Closing Costs</label>
                        <input name="closing" id="closing-costs" type="text" class="m-1 w-3/4">
                    </div>
                </div>
                <button id="make-offer-btn" class="border-2 my-3">Post Offer</button>
            </form>
        </div>
    `
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
        console.log('This button was clicked!');
        const offerData = {
            amount: $('#offer-amount').val(),
            loan: $('#loan-type').val(),
            option: $('#option-length').val(),
            survey: $('#survey-requested').val(),
            warranty: $('#warranty-requested').val(),
            appraisal: $('#appraisal-waiver').val(),
            closingCosts: $('#closing-costs').val()

        }


        let request = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(offerData)
        }

        fetch(`${HOME_URI}/makeOffer`, request)
            .then(response => {
                console.log(response.status);
                response.json().then(address => createView(`/makeOffer`))
            }).catch(error => {
            console.log(error.status);
        });
    });
}
