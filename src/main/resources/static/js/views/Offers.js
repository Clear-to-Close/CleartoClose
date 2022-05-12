import createView from "../createView.js";

const OFFERS_URL = "http://localhost:8080/api/offers";

export default function Offers(props) {
    console.log(props);
    return `<div>${retrieveOffersFromDb(props.offers)};</div>`

}

const retrieveOffersFromDb = (offers) => {
    return offers.map(offer =>
        `<div>class="w-24 h-6 m-1 pb-1 border-2 rounded text-center" id = "offerId-${offer.id}">${offer.id}

</div>`
    ).join("")
};


export function OfferEvent() {

}