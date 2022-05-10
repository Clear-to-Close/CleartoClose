import responsive from "tailwindcss/lib/util/responsive";

export default function RealtorListing() {
    //language=HTML
    return `
        <form>
            <div>
                <h1>Users Information</h1>
                <label for="sellersEmail"></label>
                <input name="sellersEmail" id="sellersEmail" type="text">
                
                <label for="sellersAgentsEmail"></label>
                <input name="sellersAgentsEmail" id="sellersAgentsEmail" type="text">
                
                <label for="buyersEmail"></label>
                <input name="buyersEmail" id="buyersEmail" type="text">
                
                <label for="buyersAgentsEmail"></label>
                <input name="buyersAgentsEmail" id="buyersAgentsEmail" type="text">
            </div>
            
            <div>
                <h1>Property Information</h1>
                <label for="propertyDescription">Property Description</label>
                <textarea name="propertyDescription" id="propertyDescription"></textarea>

                <label for="propertyAskingPrice"></label>
                <input name="askingPrice" id="askingPrice" type="text">
            </div>
            
            <div>
                <h1>Property Address</h1>
                <label for="propertyAddress"></label>
                <input name="propertyAddress" id="propertyAddress" type="text">

                <label for="propertyAptNum"></label>
                <input name="propertyAptNum" id="propertyAptNum" type="text">

                <label for="propertyCity"></label>
                <input name="propertyCity" id="propertyCity" type="text">

                <label for="propertyState"></label>
                <input name="propertyState" id="propertyState" type="text">

                <label for="propertyZip"></label>
                <input name="propertyZip" id="propertyZip" type="text">
            </div>
            
            <button id="submitListing">Submit Listing</button>
            
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

        const createListingRequest = {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(newListing)
        }

        fetch(`http://localhost:8080/api/listings?sellerEmail=${sellerEmail}&sellerAgentEmail=${sellerAgentEmail}&buyerEmail=${buyersEmail}&buyersAgentEmail=${buyersAgentEmailB}`)
            .then(response => console.log("Created Listing"))
    })
}
