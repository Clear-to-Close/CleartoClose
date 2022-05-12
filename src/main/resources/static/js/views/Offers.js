const OFFERS_URL = "http://localhost:8080/api/offers";

export default function Offers(props) {
    console.log(props);
    return `<div>${retrieveOffersFromDb(props.offers)}</div>`
}

const retrieveOffersFromDb = (offers) => {
    // language=HTML
    return offers.map(offer =>
        `
			<div
			<div class="w-24 h-6 m-1 pb-1 border-2 rounded text-center" id ="offerId">${offer.id}</div>
			<div class="w-24 h-6 m-1 pb-1 border-2 rounded text-center" id ="offerAcceptance">${offer.acceptanceDate}</div>
			<div class="w-24 h-6 m-1 pb-1 border-2 rounded text-center" id ="offerId">${offer.closingCosts}</div>
			<div class="w-24 h-6 m-1 pb-1 border-2 rounded text-center" id ="offerId">${offer.closingDate}</div>
			<div class="w-24 h-6 m-1 pb-1 border-2 rounded text-center" id ="offerId">${offer.homeWarranty}</div>
			<div class="w-24 h-6 m-1 pb-1 border-2 rounded text-center" id ="offerId">${offer.loanType}</div>
			
			</div>`
    ).join("")
};


export function OfferEvent() {

}