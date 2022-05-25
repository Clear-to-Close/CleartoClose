import createView from "../createView.js";

export default function AllListings(props){
    console.log(props)
    //language=HTML
    return props.allListings.map(listing => `
        
        <div class="w-11/12 flex flex-wrap justify-evenly border-2 border-callToAction bg-secondary m-2" data-id="${listing.id}" id="listings">
            <div class="m-1 pb-1 text-center">${listing.askingPrice}</div>
            <div class="m-1 pb-1 text-center" id="listing#-${listing.id}">MLS# ${listing.id}</div>
            <div class="m-1 pb-1 text-center">${listing.listingStatus}</div>
            <div class="m-1 pb-1 text-center">${listing.listingAddress.address}</div>
            <div class="m-1 pb-1 text-center">${listing.listingAddress.city}, ${listing.listingAddress.state}, ${listing.listingAddress.zipCode}</div>
            <div class="m-1 pb-1 text-center">${listing.sellerAgent.firstName} ${listing.sellerAgent.lastName}</div>
            <div class="m-1 pb-1 text-center">${listing.sellerAgent.email}</div>
            <p class="w-full text-justify">${listing.description}</p>
        </div>
    `).join("")
}

export function AllListingsEvent() {
    $("#listings").click(e => {
        console.log(e.target)
       let id = e.target.getAttribute("data-id");
        console.log(id);
        createView(`/listing/listings/${id}`)
    })
}
