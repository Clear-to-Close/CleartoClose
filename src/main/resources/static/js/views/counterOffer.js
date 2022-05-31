export function initCounterOffer() {
    $('.btn-counter').on('click', function () {
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
    $("#btn-confirm").removeClass("hidden");

} /// END OF POPULATE CO FORM