import createView from "../createView.js";

export default function AllListings(){
    //language=HTML
    return `
        <div id="listings">
            <a href="" data-id="7">Raymond's House</a>
        </div>
    `
}

export function AllListingsEvent() {
    $("#listings").click(e => {
        console.log(e.target)
        let id = e.target.getAttribute("data-id")
        createView(`/listings?listingId=${id}`)
    })
}
