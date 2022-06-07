import createView from "../createView.js";
import {getHeaders} from "../auth.js";
import fetchData from "../fetchData.js";
import {numberWithCommas, standardDateFormat} from "../utility.js";

let listingToSellId = null;
let buyerID = null;
let acceptedOfferId = null;



export function confirmOfferAcceptance() {
    $('.btn-accept').on('click', function (e) {
        e.preventDefault();
        acceptedOfferId = $(this).data("id");
        console.log(acceptedOfferId);

        let offerRequest = {
            method: "GET",
            headers: getHeaders()
        }

        fetchData({
            server: `/api/offers/${acceptedOfferId}`
        }, offerRequest)
            .then(function (res) {
                console.log(res);
                populateAcceptedOfferDiv(res);
            })
        $("#btn-confirm").attr("data-id", acceptedOfferId);
    })///END OF CONFIRM FUNCTION
}

export function populateAcceptedOfferDiv(res) {
    console.log(res)
    const id = res.server.id;
    const offerAmount = res.server.offerAmount;
    const loanType = res.server.loanType;
    const appraisalWaiver = res.server.appraisalWaiver;
    const survey = res.server.survey;
    const closingCosts = res.server.closingCosts;
    const closingDate = res.server.closingDate;
    const homeWarranty = res.server.homeWarranty;
    const offerStatus = res.server.offerStatus
    const optionLength = res.server.optionLength
    // const buyersAgent = res.offeror.buyerAgentID;


    listingToSellId = res.server.listing.id;
    buyerID = res.server.offeror.id;

    // //language=html
    const acceptHTML = `
        <div id="acceptedOffers" data-id="${id}"
             class="flex flex-col border-2 border-callToAction bg-white shadow-xl rounded-md m-1">

            <div class="offer-header w-full flex justify-center items-center bg-callToAction">
                <div class="text-primary font-medium text-xl p-3">
                    Offer Status: ${offerStatus}
                </div>
            </div>

            <div class="offer-body bg-white px-3">
                <div class="flex justify-between mx-3 my-1">
                    <div class="text-primary font-medium">
                        Offer Amount:
                    </div>
                    <div class="text-primary font-medium">
                        \$${numberWithCommas(offerAmount)}
                    </div>
                </div>

                <div class="flex justify-between">
                    <div class="text-primary font-medium mx-3 my-1">
                        Loan Type:
                    </div>
                    <div class="text-primary font-medium mx-3 my-1">
                        ${loanType}
                    </div>
                </div>

                <div class="flex justify-between">
                    <div class="text-primary font-medium mx-3 my-1">
                        Option Length:
                    </div>
                    <div class="text-primary font-medium mx-3 my-1">
                        ${optionLength} days
                    </div>
                </div>

                <div class="flex justify-between">
                    <div class="text-primary font-medium mx-3 my-1">
                        Survey Requested:
                    </div>
                    <div class="text-primary font-medium mx-3 my-1">
                        ${survey}
                    </div>
                </div>

                <div class="flex justify-between">
                    <div class="text-primary font-medium mx-3 my-1">
                        Home Warranty Requested:
                    </div>
                    <div class="text-primary font-medium mx-3 my-1">
                        ${homeWarranty}
                    </div>
                </div>

                <div class="flex justify-between">
                    <div class="text-primary font-medium mx-3 my-1">
                        Buyer Waives Appraisal:
                    </div>
                    <div class="text-primary font-medium mx-3 my-1">
                        ${appraisalWaiver}
                    </div>
                </div>

                <div class="flex justify-between">
                    <div class="text-primary font-medium mx-3 my-1">
                        Closing Date Requested:
                    </div>
                    <div class="text-primary font-medium mx-3 my-1">
                        ${standardDateFormat(closingDate)}
                    </div>
                </div>

                <div class="flex justify-between">
                    <div class="text-primary font-medium mx-3 my-1">
                        Seller Closing Costs:
                    </div>
                    <div class="text-primary font-medium mx-3 my-1">
                        \$${numberWithCommas(closingCosts)}
                    </div>
                </div>
                </div>
            </div>
        </div>`


    $("#offer-sub-div").html("").append(`${acceptHTML}`);
    $("#btn-confirm").removeClass('hidden');

}/// END OF POPULATED ACCEPTED OFFER

export function updateOfferStatus(array) {
    $("#btn-confirm").on('click', function () {

        let offerUpdate = {
            method: "PUT",
            headers: getHeaders(),

        }

        for (let i = 0; i < array.length; i++) {
            let indexToDecline = array[i];
            console.log(indexToDecline);
            if (array[i] === acceptedOfferId) {
                fetchData({
                    server: `/api/offers/accepted/${acceptedOfferId}`
                }, offerUpdate)
                    .then(function (res) {
                        console.log(res)
                    })
            } else {
                fetchData({
                    server: `/api/offers/decline/${indexToDecline}`
                }, offerUpdate)
                    .then(function (res) {
                        console.log(res)
                    })
            }
        }
    })
}

export function updateListingObject() {
    $("#btn-confirm").on('click', function (e) {
        e.preventDefault();
        const soldListing = {
            buyerID: buyerID,
            // buyerAgentId: `${buyer.buyerAgentId}`
        }
        const listingUpdate = {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(soldListing)
        }
        fetchData({
            server: `/api/listings/acceptOffer/${listingToSellId}`
        }, listingUpdate)
            .then(_ => {
                createView({listing: {listing: `/api/listings/${listingToSellId}`}})
            })
    })
}////END OF UPDATE LISTING OBJECT


// <div id="acceptOfferDiv" class="flex flex-col border-2 border-callToAction bg-white shadow-xl rounded-md m-1"
// <div class="offer-header w-full flex justify-center items-center bg-callToAction">
//     <div class="text-center mx-1 my-2" id="offerId" data-id="${id}">
//         ${id}
//     </div>
//     <div class="text-center mx-1 my-2" id="offerAmount-${id}">
//         \$${numberWithCommas(offerAmount)}
//     </div>
//     <div id="closingCosts" class="text-center mx-1 my-2">
//         C/C: \$${numberWithCommas(closingCosts)}
//     </div>
//     <div class="text-center mx-1 my-2">
//         Closing: ${closingDate}
//     </div>
//     <div class="text-center mx-1 my-2">
//         H/W: ${homeWarranty}
//     </div>
//     <div class="text-center mx-1 my-2">
//         L/T: ${loanType}
//     </div>
//     <div class="text-center mx-1 my-2">
//         Waive Appraisal: ${appraisalWaiver}
//     </div>
//     <div class="text-center mx-1 my-2">
//         Buyer Pays for Survey: ${survey}
//     </div>
// </div>
// </div>`