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
    offers = props.offers

    grabSellerId();
    fetchListingId();

    //language=HTML
    return `
        <div class="min-h-[calc(100vh-90px)] bg-primary">
            <div class="w-full relative">
                <img class="md:w-3/4 md:h-[350px] mx-auto"
                     src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                     alt="main listing photo">
                <button id="makeOfferBtn"
                        class="hidden absolute top-[50%] right-[50%] translate-y-1/2 translate-x-1/2 p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction">
                    Make An Offer On This Home!
                </button>
            </div>
            <div id="offer">
                ${props.offers.length === 0 ? `<h1>Currently No Offers Submitted</h1>` : retrieveOffersFromDb(props.offers)}
            </div>
            <div id="hiddenConfirmation" class="text-center m-1 w-full">
                <button id="btn-confirm" type="submit"
                        class="hidden p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction">Accept!
                </button>
	            <button id="btn-confirm-counter" type="submit"
	                    class="hidden p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction">Counter!
	            </button>
            </div>
        </div>`
}


const retrieveOffersFromDb = (offers) => {
    offers.map(offer => idArray.push(offer.id));
    // language=HTML
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
                    <button id="btn-accept-${offer.id}"
                            data-id="${offer.id}" type="button"
                            class="hidden p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction ">Accept
                        Offer!
                    </button>
                    <button  id="btn-counter-${offer.id}"
                            data-id="${offer.id}" type="button"
                            class="hidden p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction">Counter
                        Offer!
                    </button>
                </div>
            </div>`
    ).join("")
};

const fetchListingId = () =>{
    let URI = sessionStorage.getItem("URI").split("/")
   return parseInt(URI[URI.length - 1]);
}

//Added function to grab seller email instead of relying on grabbing from offers. Null if no offers are present
function grabSellerId(){
        const request = {
            method: "GET",
            headers: getHeaders()
        }
        fetchData({
            property: `/api/listings/${fetchListingId()}`
        }, request)
            .then(properties => {
                console.log(properties);
                seller = properties.property.seller.email
            })
}

const createMakeOfferView = () => {
    $('#makeOfferBtn').click(_ => {
        console.log(fetchListingId());
        createView(`/makeOffer/listings/${fetchListingId()}`)
    })
}

function buttonAuthorization() {
    let user = getLoggedInUser()
    console.log(user);
    let currentOfferor;
    let offerStatus;
    let offerID;
    console.log(seller === user)
    if(offers.length ===0 && user !== seller){

        $("#makeOfferBtn").removeClass("hidden");

    }else{

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
                // $("#editOfferBtn").show();
            }
            if(user !== seller && offerStatus === 'COUNTER'){
                $(`#btn-accept-${offerID}`).removeClass("hidden");
                $(`#btn-counter-${offerID}`).removeClass("hidden");
            }
        })

        if (seller !== user && currentOfferor !== user) {
            console.log("unhide make offer btn")
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
    initCounterOffer();
    submitCounterOffer()
}

