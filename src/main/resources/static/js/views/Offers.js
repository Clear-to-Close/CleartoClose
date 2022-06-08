import createView from "../createView.js";
import {initCounterOffer, submitCounterOffer} from "./counterOffer.js";
import {confirmOfferAcceptance, updateListingObject, updateOfferStatus} from "./acceptOffer.js";
import {getLoggedInUser, numberWithCommas, standardDateFormat} from "../utility.js";
import {getHeaders} from "../auth.js";
import fetchData from "../fetchData.js";

let idArray = [];
let offers = [];
let listing = [];
let homeOwner;
let hasRealtor = false;


export default function Offers(props) {
    console.log(props)
    offers = props.offers;
    homeOwner = props.listing.seller.email;

    listing = props.listing;
    if(props.user.realtor.length > 0){
        hasRealtor = true;
    }

    console.log(hasRealtor);
    //language=HTML

    return `
		<div class="content-height bg-slate-200 opacity-95">
			<div id="listing-container"
			     class="h-1/2 grid md:grid-cols-2 m-4 border-callToAction border-2 rounded-md">
				<div class="w-full h-full mx-auto">
					${populateCarousel(props.listing.house_images)}
				</div>
				<div class="w-full flex-col p-4 bg-white">
					<div class="w-full h-4/5 flex flex-col lg:p-8">
						<div class="flex justify-between m-1">
							<span class="font-medium lg:text-2xl">Asking Price:</span>
							<span class="lg:text-2xl">$${numberWithCommas(props.listing.askingPrice)}</span>
						</div>
						<div class="flex justify-between m-1">
							<span class="font-medium lg:text-2xl">Status:</span>
							<span class="lg:text-2xl">${props.listing.listingStatus}</span>
						</div>
						<div class="flex justify-between m-1">
							<span class="font-medium lg:text-2xl">Address:</span>
							<span class="lg:text-2xl">
                                ${props.listing.listingAddress.address}<br>
                                ${props.listing.listingAddress.city}, ${props.listing.listingAddress.state}
                                ${props.listing.listingAddress.zipCode}
                            </span>
						</div>
						<div class="flex justify-between m-1">
							<span class="font-medium lg:text-2xl">Selling Agent:</span>
							<span class="lg:text-2xl">${props.listing.sellerAgent.firstName} ${props.listing.sellerAgent.lastName}</span>
						</div>
						<div class="flex justify-between m-1">
							<span class="font-medium lg:text-2xl">Selling Agent Email:</span>
							<span class="lg:text-2xl">${props.listing.sellerAgent.email}</span>
						</div>
						<div class="flex justify-between m-1">
							<span class="font-medium lg:text-2xl">Number of Offers:</span>
							<span class="lg:text-2xl">${props.listing.listingOffers.length}</span>
						</div>
					</div>
					<div class="w-full h-1/5 flex justify-center items-center">
						<button id="makeOfferBtn" data-id="${props.listing.id}"
						        class="hidden p-3 mx-5 my-2 rounded-md shadow-xl font-medium text-lg text-primary bg-callToAction">
							Make Offer
						</button>
					</div>
				</div>
			</div>

			<div id="offer" class="bg-slate-200">
                <div id="counterOfferFormPlacementDiv" class="hidden grid-cols-1 flex justify-items-center justify-center content-height  w-3/4 bg-slate-200 opacity-95 mx-auto"></div>
				${props.offers.length === 0 ? `<div class="text-3xl text-center">Currently No Offers Submitted</div>` : `<div id="offer-sub-div" class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">${retrieveOffersFromDb(props.offers)}</div>`}
				<div id="hiddenConfirmation" class="text-center m-1 w-full">
					<button id="btn-confirm" type="submit" 
					        class="hidden p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction">Accept!
					</button>
					<button id="btn-confirm-counter" type="submit"
					        class="hidden p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction">Counter!
					</button>
				</div>
			</div>
		</div>`
}


const retrieveOffersFromDb = (offers) => {
    offers.map(offer => idArray.push(offer.id));
    // language=HTML
    return offers.map(offer =>
        `
			<div id="offersDiv" data-id="${offer.id}"
			     class="flex flex-col border-2 border-callToAction bg-white shadow-xl rounded-md m-1">

				<div class="offer-header w-full flex justify-center items-center bg-callToAction">
					<div class="text-primary font-medium text-xl p-3">
						Offer Status: ${offer.offerStatus}
					</div>
				</div>

				<div class="offer-body bg-white px-3">
					<div class="flex justify-between mx-3 my-1">
						<div class="text-primary font-medium">
							Offer Amount:
						</div>
						<div class="text-primary font-medium">
								\$${numberWithCommas(offer.offerAmount)}
						</div>
					</div>

					<div class="flex justify-between">
						<div class="text-primary font-medium mx-3 my-1">
							Loan Type:
						</div>
						<div class="text-primary font-medium mx-3 my-1">
							${offer.loanType}
						</div>
					</div>

					<div class="flex justify-between">
						<div class="text-primary font-medium mx-3 my-1">
							Option Length:
						</div>
						<div class="text-primary font-medium mx-3 my-1">
							${offer.optionLength} days
						</div>
					</div>

					<div class="flex justify-between">
						<div class="text-primary font-medium mx-3 my-1">
							Survey Requested:
						</div>
						<div class="text-primary font-medium mx-3 my-1">
							${offer.survey}
						</div>
					</div>

					<div class="flex justify-between">
						<div class="text-primary font-medium mx-3 my-1">
							Home Warranty Requested:
						</div>
						<div class="text-primary font-medium mx-3 my-1">
							${offer.homeWarranty}
						</div>
					</div>

					<div class="flex justify-between">
						<div class="text-primary font-medium mx-3 my-1">
							Buyer Waives Appraisal:
						</div>
						<div class="text-primary font-medium mx-3 my-1">
							${offer.appraisalWaiver}
						</div>
					</div>

					<div class="flex justify-between">
						<div class="text-primary font-medium mx-3 my-1">
							Closing Date Requested:
						</div>
						<div class="text-primary font-medium mx-3 my-1">
							${standardDateFormat(offer.closingDate)}
						</div>
					</div>

					<div class="flex justify-between">
						<div class="text-primary font-medium mx-3 my-1">
							Seller Closing Costs:
						</div>
						<div class="text-primary font-medium mx-3 my-1">
								\$${numberWithCommas(offer.closingCosts)}
						</div>
					</div>

					<div class="text-center m-1 w-full">
						<button type="button" id="btn-accept-${offer.id}"
						        data-id="${offer.id}" data-listing="${listing.id}"
						        class="hidden btn-accept p-2 mx-1 my-2 rounded-md shadow-xl text-primary bg-callToAction">
							Accept
							Offer!
						</button>
						<button type="button" id="btn-counter-${offer.id}"
						        data-id="${offer.id}"
						        class="hidden btn-counter p-2 mx-1 my-2 rounded-md shadow-xl text-primary bg-callToAction">
							Counter
						</button>
						<button type="button" data-id="${offer.id}" id="btn-edit-${offer.id}"  data-listing="${listing.id}"
						        class="offer-btn hidden p-2 mx-1 my-2 rounded-md shadow-xl text-primary bg-callToAction">
							Edit
						</button>
					</div>
				</div>
			</div>`
    ).join("")
};

const populateCarousel = images => {
    //language=HTML
    let html = `
        <div id="houseImageCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="false">
            <div class="carousel-inner">`
    images.forEach((img, i) => {
        if (i === 0) {
            //language=HTML
            html += `
                <div class="carousel-item active">
                    <img src="${img}" class="d-block w-100" alt="Picture of House">
                </div>`
        } else {
            //language=HTML
            html += `
                <div class="carousel-item">
                    <img src="${img}" class="d-block w-100" alt="Picture of House">
                </div>`
        }
    })
    //language=HTML
    html += `</div>
    <button class="carousel-control-prev" type="button" data-bs-target="#houseImageCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next " type="button" data-bs-target="#houseImageCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
    </div>`

    return html;
}

const createMakeOfferView = () => {
    $('#makeOfferBtn').click(function () {
        let listingId = $(this).data('id');
        console.log(listingId);
        createView({makeOffer: {listing: `/api/listings/${listingId}`}})
    })
}

function renderEditOfferView() {
    $(`.offer-btn`).click(function (e) {
        const editBtnId = $(this).data('id');
      const listingID =  $(this).data('listing');

        createView({editOffer: {offer: `/api/offers/${editBtnId}`, listing: `/api/listings/${listingID}`}})
    })
}

function buttonAuthorization() {
    let user = getLoggedInUser()
    console.log(user);
    console.log(homeOwner);
    console.log(offers);
    console.log(listing);
    let currentBidder;
    let listingStatus = listing.listingStatus;
    let offerID;


    if (offers.length === 0 && user !== homeOwner && listingStatus === "ACTIVE" && hasRealtor) {

        $("#makeOfferBtn").removeClass("hidden");

    } else {

        offers.forEach(function (offer) {
            let offerStatus = offer.offerStatus;
            offerID = offer.id;
            let alreadyABidder = offer.offeror.email;

            if (alreadyABidder === user) {
                currentBidder = user;
            }
            if (homeOwner === user && offerStatus === 'ACTIVE') {
                $(`#btn-accept-${offerID}`).removeClass("hidden");
                $(`#btn-counter-${offerID}`).removeClass("hidden");
            }
            if (user === alreadyABidder && offerStatus === 'COUNTER') {
                $(`#btn-accept-${offerID}`).removeClass("hidden");
                $(`#btn-counter-${offerID}`).removeClass("hidden");
            }
            if (user === alreadyABidder && offerStatus === 'ACTIVE') {
                $(`#btn-edit-${offerID}`).removeClass("hidden");
            }

        })

        if (homeOwner !== user && currentBidder !== user) {
            $("#makeOfferBtn").removeClass("hidden");
        }
    }
}

export function OfferEvent() {
    buttonAuthorization();
    confirmOfferAcceptance();
    updateOfferStatus(idArray);
    updateListingObject();
    createMakeOfferView();
    renderEditOfferView();
    initCounterOffer();
    submitCounterOffer();
}

