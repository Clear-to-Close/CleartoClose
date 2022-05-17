export default function RealtorListing() {
    //language=HTML
    return `
        
        <form class="min-h-[calc(100vh-90px)] flex flex-col justify-center px-3 my-auto">
            <div class="flex flex-col my-3">
                <h1 class="text-center">Users Information</h1>
                <div class="my-2 flex justify-between">
                    <label for="sellersEmail">Seller's Email</label>
                    <input name="sellersEmail" id="sellersEmail" type="text" class="w-input-width-sm">
                </div>
                <div class="my-2 flex justify-between">
                    <label for="sellersAgentsEmail">Seller's Agent's Email</label>
                    <input name="sellersAgentsEmail" id="sellersAgentsEmail" type="text" class="w-input-width-sm">
                </div>
                <div class="my-2 flex justify-between">
                    <label for="buyersEmail">Buyer's Email</label>
                    <input name="buyersEmail" id="buyersEmail" type="text" class="w-input-width-sm">
                </div>
                <div class="my-2 flex justify-between">
                    <label for="buyersAgentsEmail">Buyer's Agent's Email</label>
                    <input name="buyersAgentsEmail" id="buyersAgentsEmail" type="text" class="w-input-width-sm">
                </div>
            </div>

            <div class="flex flex-col my-3">
                <h1 class="text-center">Property Information</h1>
                <div class="my-2 flex justify-between">
                    <label for="propertyDescription">Property Description</label>
                    <textarea name="propertyDescription" id="propertyDescription" class="w-input-width-sm"></textarea>
                </div>
                <div class="my-2 flex justify-between">
                    <label for="propertyAskingPrice">Asking Price</label>
                    <input name="propertyAskingPrice" id="propertyAskingPrice" type="text" class="w-input-width-sm">
                </div>
            </div>

            <div class="flex flex-col my-3">
                <h1 class="text-center">Property Address</h1>
                <div class="my-2 flex justify-between">
                    <label for="propertyAddress">Address</label>
                    <input name="propertyAddress" id="propertyAddress" type="text" class="w-input-width-sm">
                </div>
                <div class="my-2 flex justify-between">
                    <label for="propertyAptNum">Apartment Number</label>
                    <input name="propertyAptNum" id="propertyAptNum" type="text" class="w-input-width-sm">
                </div>
                <div class="my-2 flex justify-between">
                    <label for="propertyCity">City</label>
                    <input name="propertyCity" id="propertyCity" type="text" class="w-input-width-sm">
                </div>
                <div class="my-2 flex justify-between">
                    <label for="propertyState">State</label>
                    <input name="propertyState" id="propertyState" type="text" class="w-input-width-sm">
                </div>
                <div class="my-2 flex justify-between">
                    <label for="propertyZip">Zip Code</label>
                    <input name="propertyZip" id="propertyZip" type="text" class="w-input-width-sm">
                </div>
            </div>

            <button id="submitListing" class=" my-3">Submit Listing</button>

        </form>
    `
}

export function RealtorListingEvent() {
    $("#submitListing").click(function () {

        const sellerEmail = $("#sellersEmail").val()
        const sellerAgentEmail = $("#sellersAgentsEmail").val()
        const buyersEmail = $("#buyersEmail").val()
        const buyersAgentEmailB = $("#buyersAgentsEmail").val()

        const newListing = {
            description: $("#propertyDescription").val(),
            askingPrice: $("#propertyAskingPrice").val(),
            address: $("#propertyAddress").val(),
            apartmentNumber: $("#propertyAptNum").val(),
            city: $("#propertyCity").val(),
            state: $("#propertyState").val(),
            zipCode: $("#propertyZip").val(),
        }

        console.log($("#propertyAskingPrice").val())

        const createListingRequest = {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(newListing)
        }

        fetch(`http://localhost:8080/api/listings?sellerEmail=${sellerEmail}&sellerAgentEmail=${sellerAgentEmail}&buyerEmail=${buyersEmail}&buyersAgentEmail=${buyersAgentEmailB}`, createListingRequest)
            .then(response => console.log("Created Listing", response))
    })
}
