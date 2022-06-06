import createView from "../createView.js";
import {initCounterOffer, submitCounterOffer} from "./counterOffer.js";
import {confirmOfferAcceptance, updateListingObject, updateOfferStatus} from "./acceptOffer.js";
import {getLoggedInUser} from "../utility.js";
import {getHeaders} from "../auth.js";
import fetchData from "../fetchData.js";

let idArray = [];
let offers = [];
let seller;


export default function Offers(props) {
    offers = props.offers;
    seller = props.listing.seller.email;
    console.log(props)
    //language=HTML

    return `
        <div class="content-height bg-slate-200 opacity-95">
            <div id="listing-container"
                 class="w-full h-1/2 grid md:grid-cols-2 m-4 border-callToAction border-2 rounded-md">
                <div>
                    <img class="w-full h-full mx-auto"
                         src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                         alt="main listing photo">
                </div>
                <div class="w-full flex-col p-4 bg-white">
                    <div class="w-full h-4/5 flex flex-col">
                        <div class="flex justify-between">
                            <span>Asking Price:</span>
                            <span>${props.listing.askingPrice}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Status:</span>
                            <span>${props.listing.listingStatus}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Address:</span>
                            <span>
                                ${props.listing.listingAddress.address}<br>
                                ${props.listing.listingAddress.city}, ${props.listing.listingAddress.state}
                                ${props.listing.listingAddress.zipCode}
                            </span>
                        </div>
                    </div>
                    <div class="w-full h-1/5 flex justify-center items-center">
                        <button id="makeOfferBtn"
                                class="hidden p-2 mx-5 my-2 rounded-md shadow-xl font-medium text-primary bg-callToAction">
                            Make Offer
                        </button>
                    </div>
                </div>
            </div>


            <div id="offer" class="bg-slate-200">
                ${props.offers.length === 0 ? `<h1>Currently No Offers Submitted</h1>` : `<div class="grid md:grid-cols-3 gap-4 m-4">${retrieveOffersFromDb(props.offers)}</div>`}
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
                                \$${offer.offerAmount}
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
                            ${offer.closingDate}
                        </div>
                    </div>

                    <div class="flex justify-between">
                        <div class="text-primary font-medium mx-3 my-1">
                            Seller Closing Costs:
                        </div>
                        <div class="text-primary font-medium mx-3 my-1">
                                \$${offer.closingCosts}
                        </div>
                    </div>

                    <div class="text-center m-1 w-full">
                        <button type="button" id="button-accept-${offer.id}"
                                data-id="${offer.id}"
                                class="hidden btn-accept p-2 mx-1 my-2 rounded-md shadow-xl text-primary bg-callToAction">
                            Accept
                            Offer!
                        </button>
                        <button type="button" id="button-counter-${offer.id}"
                                data-id="${offer.id}"
                                class="hidden btn-counter p-2 mx-1 my-2 rounded-md shadow-xl text-primary bg-callToAction">
                            Counter
                        </button>
                        <button type="button" data-id="${offer.id}" id="btn-edit-${offer.id}"
                                class="offer-btn hidden p-2 mx-1 my-2 rounded-md shadow-xl text-primary bg-callToAction">
                            Edit
                        </button>
                    </div>
                </div>
            </div>`
    ).join("")
};

const fetchListingId = () => {
    let URI = sessionStorage.getItem("URI").split("/")
    return parseInt(URI[URI.length - 1]);
}

//Added function to grab seller email instead of relying on grabbing from offers. Null if no offers are present
// function grabSellerId() {
//     const request = {
//         method: "GET",
//         headers: getHeaders()
//     }
//     fetchData({
//         property: `/api/listings/${fetchListingId()}`
//     }, request)
//         .then(properties => {
//             console.log(properties);
//
//             seller = properties.property.seller.email;
//             console.log(seller);
//
//         })
// }

// const createMakeOfferView = () => {
//     $('#makeOfferBtn').click(_ => {
//         console.log(fetchListingId());
//         createView(`/makeOffer/listings/${fetchListingId()}`)
//     })
// }

const createMakeOfferView = () => {
    $('#makeOfferBtn').click(_ => {

        let URI = sessionStorage.getItem("URI").split("/")
        let listingId = parseInt(URI[URI.length - 1])

        createView({makeOffer: {listing: `/api/listings/${listingId}`}})

        // console.log(fetchListingId());
        // createView(`/makeOffer/api/listings/${fetchListingId()}`)

    })
}

function renderEditOfferView() {
    $(`.offer-btn`).click(function (e) {
        const editBtnId = $(this).data('id');
        createView(`/editOffer/api/offers/${editBtnId}`)
    })
}

function buttonAuthorization() {
    let user = getLoggedInUser()
    console.log(user);
    console.log(seller)
    let currentOfferor;
    let offerStatus;
    let offerID;

    console.log(seller === user)

    if (offers.length === 0 && user !== seller) {
        $("#makeOfferBtn").removeClass("hidden");

    } else {

        offers.forEach(function (offer) {
            console.log(offer);
            offerID = offer.id;
            offerStatus = offer.offerStatus;
            let searchOfferor = offer.offeror.email;

            if (searchOfferor === user) {
                currentOfferor = user;
            }

            if (seller === user && offerStatus === 'ACTIVE') {
                $(`#btn-accept-${offerID}`).removeClass("hidden");
                $(`#btn-counter-${offerID}`).removeClass("hidden");

            }
            if (user !== seller && offerStatus === 'COUNTER') {
                $(`#btn-accept-${offerID}`).removeClass("hidden");
                $(`#btn-counter-${offerID}`).removeClass("hidden");
            }
        })

        if (seller !== user && currentOfferor !== user) {
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
    submitCounterOffer()
}

