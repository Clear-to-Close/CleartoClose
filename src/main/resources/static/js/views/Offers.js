const OFFERS_URL = "http://localhost:8080/api/offers";

export default function Offers(props) {
    console.log(props);
    return `<div><img class="w-full h-1/2"
			     src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
			     alt="main listing photo">
                    ${retrieveOffersFromDb(props.offers)}
            </div>`


}

const retrieveOffersFromDb = (offers) => {

    // language=HTML
    return offers.map(offer =>
        `
			<div id="offersDiv" class="flex flex-col flex-wrap items-center border-2 rounded text-center mt-2">
				<div class="w-12 h-6 m-1 pb-1 border-2 rounded text-center" id="offerId" data-id="${offer.id}"">${offer.id}</div>
				<div class="w-24 h-24 m-1 pb-1 border-2 rounded text-center text-3xl" id="offerAmount">
					${offer.offerAmount}
				</div>
				<div class="w-80 h-6 m-1 pb-1 border-2 rounded text-center" id="offerAcceptance">Receipt Date:
					${offer.acceptanceDate}
				</div>
				<div class="w-60 h-6 m-1 pb-1 border-2 rounded text-center" id="offerId">Closing Costs:
					${offer.closingCosts}
				</div>
				<div class="w-60 h-6 m-1 pb-1 border-2 rounded text-center" id="offerId">Closing Date:
					${offer.closingDate}
				</div>
				<div class="w-60 h-6 m-1 pb-1 border-2 rounded text-center" id="offerId">Home Warranty:
					${offer.homeWarranty}
				</div>
				<div class="w-60 h-6 m-1 pb-1 border-2 rounded text-center" id="offerId">Loan Type: ${offer.loanType}
				</div>
				<div class="absolute-bottom-2 flex flex-row flex-wrap justify-between">
					<button data-id="${offer.id}" class="btn-accept border-2 rounded h-6 w-36 my-2">Accept
						Offer!
					</button>
				</div>

			</div>`
    ).join("")
};




export function OfferEvent() {
    confirmOfferAcceptance();
}




function confirmOfferAcceptance() {
    $('.btn-accept').click(function () {
        const id = $(this).data("id");
        alert(id);
    })
}///END OF FUNCTION


$('#soldBtn').click(function (){
    $('.body').removeClass('blur');
    $('#offerModal').addClass('hide');
    updateListingObject();
})










// function updateListingObject(){
//     const soldListing = {
//        status: 'Sold',
//         buyerId: ${},
//         buyerAgentId: ${},
//     }
//
// }

// const offerContainer = $('#app');
// offerContainer.click(function(e){
//     if(e.target.classList.contains('acceptOffer')){
//         alert($(this).data('id'));
//     }
// })

// var targetID;
// let target = event.target
//   targetID = target.attr('data-id');
// console.log(targetID);


// $('.body').addClass(blur);

/// want offer to populate a modal
/// have a confirmation button
/// put request to update listing status
/// put request to update listing db with buyer id

// language=html
// const acceptHTML =`<div id="offersDiv" class="flex flex-col flex-wrap items-center border-2 rounded text-center mt-2">
//             <div class="w-12 h-6 m-1 pb-1 border-2 rounded text-center" id="offerId">${offer.id}</div>
//             <div class="w-24 h-24 m-1 pb-1 border-2 rounded text-center text-3xl"
//                  id="offerAmount">${offer.offerAmount}</div>
//             <div class="w-80 h-6 m-1 pb-1 border-2 rounded text-center"
//                  id="offerAcceptance">Receipt Date: ${offer.acceptanceDate}</div>
//             <div class="w-60 h-6 m-1 pb-1 border-2 rounded text-center"
//                  id="offerId">Closing Costs: ${offer.closingCosts}</div>
//             <div class="w-60 h-6 m-1 pb-1 border-2 rounded text-center"
//                  id="offerId">Closing Date: ${offer.closingDate}</div>
//             <div class="w-60 h-6 m-1 pb-1 border-2 rounded text-center"
//                  id="offerId">Home Warranty: ${offer.homeWarranty}</div>
//             <div class="w-60 h-6 m-1 pb-1 border-2 rounded text-center" id="offerId">Loan Type: ${offer.loanType}</div>
//             <div class="absolute-bottom-2 flex flex-row flex-wrap justify-between">
//                 <button id="soldBtn" data-id="${offer.id}"
//                         class="border-2 rounded h-6 w-36 my-2">SOLD!</button>
//             </div>
//
//         </div>`
// $('#offerModal').append(acceptHTML);