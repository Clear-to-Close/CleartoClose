export default function MakeOffer() {
    //language=html
    return `
        <h1 class="text-center my-3">Offer Details</h1>
        <form class="min-h-[calc(100vh-90px)] flex flex-col justify-center px-3">
            <div class="flex flex-col my-3">
          
                <div class="flex flex-col items-center text-left justify-center w-3/4">
                    <label for="offer-amount">Offer Amount</label>
                    <input name="amount" id="offer-amount" type="text" class="m-1">
                </div>
                <div class="flex flex-col items-center text-left justify-center w-3/4">
                    <label for="loan-type">Loan Type</label>
                    <select name="loan" id="loan-type" class="m-1">
                        <option disabled selected>Loan Type</option>
                        <option value="ARM">Adjustable-Rate Mortgage (ARM)</option>
                        <option>Conventional</option>
                        <option>Fixed-Rate Mortgage</option>
                        <option value="FHA">Federal Housing Administration (FHA)</option>
                        <option value="USDA">U.S. Department of Agriculture (USDA)</option>
                        <option value="VA">Veterans Affairs (VA)</option>
                    </select>
                </div>
                <div class="flex flex-col items-center text-left justify-center">
                    <label for="option-length">Option Length</label>
                    <input name="option" id="option-length" type="text" class="m-1 w-3/4">
                </div>
                <div class="flex flex-col items-center text-left justify-center">
                    <label for="survey-requested">Survey Requested</label>
                    <input name="survey" id="survey-requested" type="text" class="m-1 w-3/4">
                </div>
                <div class="flex flex-col items-center text-left justify-center">
                    <label for="warranty-requested">Home Warranty Requested</label>
                    <input name="warranty" id="warranty-requested" type="text" class="m-1 w-3/4">
                </div>
                <div class="flex flex-col items-center text-left justify-center">
                    <label for="appraisal-waiver">Appraisal Waiver</label>
                    <input name="appraisal" id="appraisal-waiver" type="text" class="m-1 w-3/4">
                </div>
                <div class="flex flex-col items-center text-left justify-center">
                    <label for="closing-costs">Closing Costs</label>
                    <input name="closing" id="closing-costs" type="text" class="m-1 w-3/4">
                </div>
            </div>
            <button id="make-offer" class=" my-3">Post Offer</button>
        </form>
    `
}

export function MakeAnOffer() {
    // $("#submitListing").click(function () {
        //
        // const sellerEmail = $("#sellersEmail").val()
        // const sellerAgentEmail = $("#sellersAgentsEmail").val()
        // const buyersEmail = $("#buyersEmail").val()
        // const buyersAgentEmailB = $("#buyersAgentsEmail").val()
        //
        // const newListing = {
        //     description: $("#propertyDescription").val(),
        //     askingPrice: $("#propertyAskingPrice").val(),
        //     address: $("#propertyAddress").val(),
        //     apartmentNumber: $("#propertyAptNum").val(),
        //     city: $("#propertyCity").val(),
        //     state: $("#propertyState").val(),
        //     zipCode: $("#propertyZip").val(),
        // }
        //
        // console.log($("#propertyAskingPrice").val())
        //
        // const createListingRequest = {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": 'application/json'
        //     },
        //     body: JSON.stringify(newListing)
        // }
        //
        // fetch(`http://localhost:8080/api/listings?sellerEmail=${sellerEmail}&sellerAgentEmail=${sellerAgentEmail}&buyerEmail=${buyersEmail}&buyersAgentEmail=${buyersAgentEmailB}`, createListingRequest)
        //     .then(response => console.log("Created Listing", response))
    // })
}
