import createView from "../createView.js";
import {initCounterOffer} from "./counterOffer.js";
import {updateListingObject, updateOfferStatus, confirmOfferAcceptance} from "./acceptOffer.js";
import Login from "./Login.js";

const OFFERS_URL = `http://${BACKEND_HOST}:${PORT}/api/offers`;

let listingId = null;
let idArray;



export default function Offers(props) {
    let URI = sessionStorage.getItem("URI").split("/")
    listingId = parseInt(URI[URI.length - 1])
    console.log(props.offers);

    buttonAuthorization(props.offers, userId, listingId);
    //language=HTML
    return `
		<div class="min-h-[calc(100vh-90px)] bg-primary">
			<div class="w-full relative">
				<img class="md:w-3/4 md:h-[350px] mx-auto"
				     src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
				     alt="main listing photo">
				<button id="makeOfferBtn"
				        class="absolute top-[50%] right-[50%] translate-y-1/2 translate-x-1/2 p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction">
					Make An Offer On This Home!
				</button>
			</div>
			<div id="offer">
				${props.offers.length === 0 ? `<h1>Currently No Offers Submitted</h1>` : retrieveOffersFromDb(props.offers)}
			</div>
			<div id="hiddenConfirmation" class="text-center m-1 w-full">
				<button id="btn-confirm"
				        class="hidden btn-accept p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction">Confirm
				</button>
			</div>
		</div>`
}


const retrieveOffersFromDb = (offers) => {
    idArray = [];
    offers.map(offer => idArray.push(offer.id));
    console.log(idArray);

    // language=HTML
    console.log(offers);
    return offers.map(offer =>

        `
			<div id="offersDiv" class="flex flex-wrap justify-evenly rounded bg-secondary m-1 h-[144px]">
				<div class="text-center mx-1 my-2" id="offerId">
					${offer.offerStatus} ${offer.id}
				</div>
				<div class="text-center mx-1 my-2" id="offerAmount-${offer.id}">
						\$${offer.offerAmount}
				</div>
				<div id="closingCosts" class="text-center mx-1 my-2">
					C/C: \$${offer.closingCosts}
				</div>
				<div class="text-center mx-1 my-2">
					Closing: ${offer.closingDate}
				</div>
				<div class="text-center mx-1 my-2">
					H/W: ${offer.homeWarranty}
				</div>
				<div class="text-center mx-1 my-2">
					L/T: ${offer.loanType}
				</div>
				<div class="text-center m-1 w-full">
					<button
							data-id="${offer.id}"
							class="btn-accept p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction ">Accept
						Offer!
					</button>
					<button
							data-id="${offer.id}"
							class="btn-counter p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction">Counter
						Offer!
					</button>
				</div>
			</div>`
    ).join("")
};


const createMakeOfferView = () => {
    $('#makeOfferBtn').click(_ => {
        let URI = sessionStorage.getItem("URI").split("/")
        console.log(URI)
        listingId = parseInt(URI[URI.length - 1])
        console.log(listingId)
        createView(`/makeOffer/listings/${listingId}`)
    })
}



function whoIsLoggedIn(id) {
    console.log(id)
}

function buttonAuthorization(offers, userId, listingId) {
    let sellerId = parseInt(offers[0].listing.seller.id);
    let currentOfferorId = null;

    offers.forEach(function (offer) {
        let searchOfferors = parseInt(offer.offeror.id)
        if (searchOfferors === userId) {
            currentOfferorId = userId;
        }
    })

        $(document).ready(function () {
            if (sellerId === userId) {
                $('#makeOfferBtn').hide();
            }

            if (currentOfferorId !== null) {
                $('#makeOfferBtn').hide();
                $('.btn-accept').hide();
                $('.btn-counter').hide();
                $('#editOfferBtn').show();
            }
        })
}

export function OfferEvent() {
    confirmOfferAcceptance();
    updateOfferStatus(idArray);
    updateListingObject();
    createMakeOfferView();
    initCounterOffer();
}

