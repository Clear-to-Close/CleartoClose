const BASE_URI = `http://${BACKEND_HOST}:${PORT}`;
let listingId = null;
export default function RealtorListing(props) {
    listingId = props.realtorListing?.id ?? null;
    //language=HTML
    return `
        <div class="content-height bg-slate-200 opacity-95 flex items-center justify-center w-full">
            <div class="w-3/4 lg:w-1/2 my-3">
                <form class="w-full bg-white border-callToAction border-2 rounded-md flex flex-col justify-center px-3 my-auto mx-auto">
                    <div class="flex flex-col my-3 items-center">
                        <h1 class="text-center font-medium text-xl">Users Information</h1>
                        <label for="sellersEmail"></label>
                        <input value="${props.realtorListing?.seller?.email ?? ""}"
                               name="sellersEmail"
                               id="sellersEmail"
                               type="text"
                               placeholder="Seller's Email"
                               class="bg-white border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1 text-sm">

                        <label for="sellersAgentsEmail"></label>
                        <input value="${props.realtorListing?.sellerAgent?.email ?? ""}"
                               name="sellersAgentsEmail"
                               id="sellersAgentsEmail"
                               type="text"
                               placeholder="Listing Agent's Email"
                               class="bg-white border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1 text-sm">

                        <label for="buyersEmail"></label>
                        <input value="${props.realtorListing?.buyer?.email ?? ""}"
                               name="buyersEmail"
                               id="buyersEmail"
                               type="text"
                               placeholder="Buyer's Email"
                               class="bg-white border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1 text-sm">
                        <label for="buyersAgentsEmail"></label>
                        <input value="${props.realtorListing?.buyerAgent?.email ?? ""}"
                               name="buyersAgentsEmail"
                               id="buyersAgentsEmail"
                               type="text"
                               placeholder="Buyer's Agent's Email"
                               class="bg-white border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1 text-sm">
                    </div>

                    <div class="flex flex-col my-3 items-center">
                        <h1 class="text-center font-medium text-xl">Property Information</h1>
                        <label for="propertyDescription"></label>
                        <textarea maxlength="200"
                                  name="propertyDescription"
                                  id="propertyDescription"
                                  placeholder="Enter Property Description"
                                  class="h-[200px] bg-white border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1 text-sm ">${props.realtorListing?.description ?? ""}</textarea>
                        <label for="propertyAskingPrice"></label>
                        <input value="${props.realtorListing?.askingPrice ?? ""}"
                               name="propertyAskingPrice"
                               id="propertyAskingPrice"
                               type="text"
                               placeholder="Asking Price"
                               class="bg-white border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1 text-sm">
                        <label for="listingStatus"></label>
                        <input value="${props.realtorListing?.listingStatus ?? ""}"
                               name="listingStatus"
                               id="listingStatus"
                               type="text"
                               placeholder="Listing Status"
                               class="bg-white border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1 text-sm">
                    </div>

                    <div class="flex flex-col my-3 items-center">
                        <h1 class="text-center font-medium text-xl"></h1>
                        <label for="propertyAddress"></label>
                        <input value="${props.realtorListing?.listingAddress?.address ?? ""}"
                               name="propertyAddress"
                               id="propertyAddress"
                               type="text"
                               placeholder="Address"
                               class="bg-white border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1 text-sm">
                        <label for="propertyAptNum"></label>
                        <input value="${props.realtorListing?.listingAddress?.apartmentNumber ?? ""}"
                               name="propertyAptNum"
                               id="propertyAptNum"
                               type="text"
                               placeholder="Apartment Number"
                               class="bg-white border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1 text-sm">
                        <label for="propertyCity"></label>
                        <input value="${props.realtorListing?.listingAddress?.city ?? ""}"
                               name="propertyCity"
                               id="propertyCity"
                               type="text"
                               placeholder="City"
                               class="bg-white border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1 text-sm">
                        <label for="propertyState"></label>
                        <input value="${props.realtorListing?.listingAddress?.state ?? ""}"
                               name="propertyState"
                               id="propertyState"
                               type="text"
                               placeholder="State"
                               class="bg-white border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1 text-sm">

                        <label for="propertyZip"></label>
                        <input value="${props.realtorListing?.listingAddress?.zipCode ?? ""}"
                               name="propertyZip"
                               id="propertyZip"
                               type="text"
                               placeholder="Zip Code"
                               class="bg-white border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1 text-sm">
                        <button type="button" id="submit" class="w-1/2 p-2 m-2 rounded-md shadow-xl bg-callToAction font-medium">
                            Submit Listing
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `
}

const submitListing = _ => {

    $("#submit").click(e => {
        if (listingId === null) {
            createListing();
        } else {
            editListing();
        }
    });
}

const getFields = _ => {

    return {
        sellerEmail: $("#sellersEmail").val(),
        sellerAgentEmail: $("#sellersAgentsEmail").val(),
        buyerEmail: $("#buyersEmail").val(),
        buyerAgentEmail: $("#buyersAgentsEmail").val(),
        description: $("#propertyDescription").val(),
        askingPrice: $("#propertyAskingPrice").val(),
        listingStatus: $("#listingStatus").val().toUpperCase(),
        address: $("#propertyAddress").val(),
        apartmentNumber: $("#propertyAptNum").val(),
        city: $("#propertyCity").val(),
        state: $("#propertyState").val(),
        zipCode: $("#propertyZip").val(),
    }
}

const createListing = () => {
    const newListing = getFields();
    const createListingRequest = {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(newListing)
    }

    fetch(`http://${BACKEND_HOST}:${PORT}/api/listings`, createListingRequest)
        .then(response => console.log("Created Listing", response))
}

const editListing = _ => {

    const editListing = getFields();

    const editListingRequest = {
        method: 'PUT',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(editListing)
    }

    fetch(`http://${BACKEND_HOST}:${PORT}/api/listings/${listingId}`, editListingRequest)
        .then(response => console.log("Created Listing", response))

}

export function RealtorListingEvent() {
    submitListing();
}
