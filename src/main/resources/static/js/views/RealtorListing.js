let listingId = null;
export default function RealtorListing(props) {
    console.log(props)
    listingId = props.realtorListing?.id ?? null;
    //language=HTML
    return `
        <div class="content-height bg-primary flex items-center justify-center w-full">
            <div class="bg-secondary md:w-3/4 lg:w-1/2 my-3">
                <form class="w-full flex flex-col justify-center px-3 my-auto mx-auto">
                    <div class="flex flex-col my-3">
                        <h1 class="text-center">Users Information</h1>
                        <div class="my-2 flex justify-between">
                            <label for="sellersEmail">Seller's Email</label>
                            <input value="${props.realtorListing?.seller?.email ?? ""}" name="sellersEmail" id="sellersEmail" type="text"
                                   class="text-sm w-input-width-sm md:w-input-width-lg">
                        </div>
                        <div class="my-2 flex justify-between">
                            <label for="sellersAgentsEmail">Seller's Agent's Email</label>
                            <input value="${props.realtorListing?.sellerAgent?.email ?? ""}" name="sellersAgentsEmail" id="sellersAgentsEmail"
                                   type="text"
                                   class="text-sm w-input-width-sm md:w-input-width-lg">
                        </div>
                        <div class="my-2 flex justify-between">
                            <label for="buyersEmail">Buyer's Email</label>
                            <input value="${props.realtorListing?.buyer?.email ?? ""}" name="buyersEmail" id="buyersEmail" type="text"
                                   class="text-sm w-input-width-sm md:w-input-width-lg">
                        </div>
                        <div class="my-2 flex justify-between">
                            <label for="buyersAgentsEmail">Buyer's Agent's Email</label>
                            <input value="${props.realtorListing?.buyerAgent?.email ?? ""}" name="buyersAgentsEmail" id="buyersAgentsEmail"
                                   type="text"
                                   class="text-sm w-input-width-sm md:w-input-width-lg">
                        </div>
                    </div>

                    <div class="flex flex-col my-3">
                        <h1 class="text-center">Property Information</h1>
                        <div class="my-2 flex justify-between">
                            <label for="propertyDescription">Property Description</label>
                            <textarea maxlength="200" name="propertyDescription" id="propertyDescription"
                                      class="text-sm w-input-width-sm md:w-input-width-lg">${props.realtorListing?.description ?? ""}</textarea>
                        </div>
                        <div class="my-2 flex justify-between">
                            <label for="propertyAskingPrice">Asking Price</label>
                            <input value="${props.realtorListing?.askingPrice ?? ""}" name="propertyAskingPrice" id="propertyAskingPrice" type="text"
                                   class="text-sm w-input-width-sm md:w-input-width-lg">
                        </div>
                        <div class="my-2 flex justify-between">
                            <label for="listingStatus">Listing Status</label>
                            <input value="${props.realtorListing?.listingStatus ?? ""}" name="listingStatus" id="listingStatus" type="text"
                                   class="text-sm w-input-width-sm md:w-input-width-lg">
                        </div>
                    </div>

                    <div class="flex flex-col my-3">
                        <h1 class="text-center">Property Address</h1>
                        <div class="my-2 flex justify-between">
                            <label for="propertyAddress">Address</label>
                            <input value="${props.realtorListing?.listingAddress?.address ?? ""}" name="propertyAddress" id="propertyAddress"
                                   type="text"
                                   class="text-sm w-input-width-sm md:w-input-width-lg">
                        </div>
                        <div class="my-2 flex justify-between">
                            <label for="propertyAptNum">Apartment Number</label>
                            <input value="${props.realtorListing?.listingAddress?.apartmentNumber ?? ""}" name="propertyAptNum" id="propertyAptNum"
                                   type="text" class="text-sm w-input-width-sm md:w-input-width-lg">
                        </div>
                        <div class="my-2 flex justify-between">
                            <label for="propertyCity">City</label>
                            <input value="${props.realtorListing?.listingAddress?.city ?? ""}" name="propertyCity" id="propertyCity" type="text"
                                   class="text-sm w-input-width-sm md:w-input-width-lg">
                        </div>
                        <div class="my-2 flex justify-between">
                            <label for="propertyState">State</label>
                            <input value="${props.realtorListing?.listingAddress?.state ?? ""}" name="propertyState" id="propertyState" type="text"
                                   class="text-sm w-input-width-sm md:w-input-width-lg">
                        </div>
                        <div class="my-2 flex justify-between">
                            <label for="propertyZip">Zip Code</label>
                            <input value="${props.realtorListing?.listingAddress?.zipCode ?? ""}" name="propertyZip" id="propertyZip" type="text"
                                   class="text-sm w-input-width-sm md:w-input-width-lg">
                        </div>
                    </div>
                    <button id="submit" class="p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction">Submit Listing</button>
                </form>
            </div>
        </div>
    `
}

const submitListing = _ => {
    $("#submit").click(function () {
        console.log(listingId)
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
