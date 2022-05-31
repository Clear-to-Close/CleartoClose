import createView from "../createView";

const OFFERS_URL = `http://${BACKEND_HOST}:${PORT}/api/offers`;


export function initCounterOffer() {
    $('.btn-counter').on('click', function () {
        const offerId = $(this).data("id");
        $("#btn-confirm-counterOffer").attr("data-id", offerId);
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
		</div>`

    $("#offer").html("").append(`${acceptHTML}`);
    $("#btn-confirm-counterOffer").removeClass("hidden");

} /// END OF POPULATE CO FORM

export function submitCounterOffer(){
    $("#btn-confirm-counterOffer").on('click', function (e) {
            e.preventDefault();
            let URI = sessionStorage.getItem("URI").split("/")
            console.log(URI)
            const listingId = parseInt(URI[URI.length - 1])
            console.log(listingId)

            const offerData = {
                offerAmount: $('#offer-amount').val(),
                loanType: $('#loan-type').val(),
                optionLength: $('#option-length').val(),
                survey: $('#survey-requested').val(),
                homeWarranty: $('#warranty-requested').val(),
                appraisalWaiver: $('#appraisal-waiver').val(),
                closingDate: $('#closing-date').val(),
                closingCosts: $('#closing-costs').val(),
                offerorId: parseInt(localStorage.getItem("accessToken")),
                listingId: listingId
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
                    console.log(response.status);
                    // getMessage("Your offer has been posted!", 'confirmation-message');
                    createView(`/offers/findOffers/${listingId}`);
                }).catch(error => {
                console.log(error.status);
            });
        });
    updateOfferToCountered();
}

function updateOfferToCountered (){
    let offerId = $("#btn-confirm-counterOffer").data("id");
    const offerUpdate = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
    }
    fetch(`${OFFERS_URL}/countered/${offerId}`, offerUpdate).then(function (res) {
        console.log(res)
    })
}